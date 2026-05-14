// ============================================
// KoreaGang — Day page globe (zoomed-in city view)
// ============================================
function initDayGlobe() {
  const c = document.getElementById('globe');
  if (!c) return;
  const ctx = c.getContext('2d');
  const DPR = window.devicePixelRatio || 1;

  function resize() {
    const rect = c.getBoundingClientRect();
    c.width = rect.width * DPR; c.height = rect.height * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }
  resize();
  window.addEventListener('resize', resize);

  const dayMeta = (typeof DAYS !== 'undefined') ? DAYS.find(x => x.d === DAY_NUM) : null;
  let coord = null;
  if (dayMeta && typeof CITY_COORDS !== 'undefined') {
    coord = CITY_COORDS[dayMeta.city] || CITY_COORDS['Seoul'];
  }
  if (!coord) coord = [37.57, 126.98];

  let focusLat = coord[0], focusLon = coord[1];
  let zoomCurrent = 1;
  let zoomTarget = 3;

  try {
    const saved = sessionStorage.getItem('kg_globe_focus_day');
    if (saved) {
      const o = JSON.parse(saved);
      focusLat = o.lat; focusLon = o.lon;
      zoomCurrent = o.zoom || 1;
      zoomTarget = o.zoom || 3;
    }
  } catch(_) {}

  let landRings = [];
  if (window.KG_GEO) {
    window.KG_GEO.getLandRings().then(r => { landRings = r; });
  }

  function toXY(lat, lon, cx, cy, r, rot) {
    const la = lat * Math.PI / 180;
    const lo = (lon - rot) * Math.PI / 180;
    const x = Math.cos(la) * Math.sin(lo);
    const y = -Math.sin(la);
    const z = Math.cos(la) * Math.cos(lo);
    return { x: cx + r * x, y: cy + r * y, z };
  }

  function drawLand(cx, cy, r, rot) {
    if (!landRings.length) return;
    ctx.save();
    ctx.strokeStyle = 'rgba(26,20,16,0.45)';
    ctx.lineWidth = 0.9;
    ctx.lineJoin = 'round';
    for (let ri = 0; ri < landRings.length; ri++) {
      const ring = landRings[ri];
      ctx.beginPath();
      let first = true;
      for (let pi = 0; pi < ring.length; pi++) {
        const la = ring[pi][0], lo = ring[pi][1];
        const p = toXY(la, lo, cx, cy, r, rot);
        if (p.z <= 0.01) { first = true; continue; }
        if (first) { ctx.moveTo(p.x, p.y); first = false; }
        else ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawGraticule(cx, cy, r, rot) {
    ctx.save();
    ctx.strokeStyle = 'rgba(26,20,16,0.13)';
    ctx.lineWidth = 0.5;
    for (let lat = -60; lat <= 60; lat += 20) {
      ctx.beginPath();
      let first = true;
      for (let lon = -180; lon <= 180; lon += 4) {
        const p = toXY(lat, lon, cx, cy, r, rot);
        if (p.z < 0) { first = true; continue; }
        if (first) { ctx.moveTo(p.x, p.y); first = false; }
        else ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
    }
    for (let lon = 0; lon < 360; lon += 20) {
      ctx.beginPath();
      let first = true;
      for (let lat = -80; lat <= 80; lat += 4) {
        const p = toXY(lat, lon, cx, cy, r, rot);
        if (p.z < 0) { first = true; continue; }
        if (first) { ctx.moveTo(p.x, p.y); first = false; }
        else ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
    }
    ctx.restore();
  }

  function draw() {
    zoomCurrent += (zoomTarget - zoomCurrent) * 0.08;

    const W = c.getBoundingClientRect().width;
    const H = c.getBoundingClientRect().height;
    const baseR = Math.min(W, H) * 0.42;
    const r = baseR * zoomCurrent;
    const cx = W / 2;
    const cy = H * 0.52 + Math.sin(focusLat * Math.PI / 180) * r;
    const rotation = focusLon;

    ctx.clearRect(0, 0, W, H);

    ctx.beginPath();
    ctx.arc(cx, cy, r + 10, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(26,20,16,0.06)';
    ctx.lineWidth = 0.5;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(26,20,16,0.2)';
    ctx.lineWidth = 0.8;
    ctx.stroke();

    drawLand(cx, cy, r, rotation);
    drawGraticule(cx, cy, r, rotation);

    const p = toXY(focusLat, focusLon, cx, cy, r, rotation);
    if (p.z > 0) {
      ctx.save();
      ctx.fillStyle = '#c8312b';
      ctx.beginPath();
      ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(p.x, p.y, 12, 0, Math.PI * 2);
      ctx.strokeStyle = '#c8312b';
      ctx.globalAlpha = 0.4;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();

      ctx.save();
      ctx.fillStyle = '#1a1410';
      ctx.font = '500 11px "JetBrains Mono", monospace';
      ctx.fillText((dayMeta?.city || '').toUpperCase(), p.x + 16, p.y + 4);
      ctx.restore();
    }

    requestAnimationFrame(draw);
  }
  draw();

  document.addEventListener('click', e => {
    const a = e.target.closest('a');
    if (!a) return;
    const href = a.getAttribute('href') || '';
    if (href.includes('_index.html')) {
      try {
        sessionStorage.setItem('kg_globe_focus', JSON.stringify({
          lat: focusLat, lon: focusLon, zoom: zoomCurrent
        }));
      } catch(_) {}
    }
  }, true);
}

ready(() => {
  setTimeout(initDayGlobe, 0);
});
