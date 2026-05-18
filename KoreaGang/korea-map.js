// ============================================
// KoreaGang — Korea Map Modal
// Pops up a detailed Korea map with a location
// pin when a Korean day card is clicked.
// ============================================
(function () {
  'use strict';

  // Korea bounds (slightly north of DMZ to show context)
  const LAT_MIN = 32.9;
  const LAT_MAX = 39.0;
  const LON_MIN = 124.2;
  const LON_MAX = 130.1;

  // Location metadata per city key
  const LOCATIONS = {
    'Seoul':          { label: 'Seoul',          sub: '서울특별시',  lat: 37.57, lon: 126.98 },
    'Incheon':        { label: 'Incheon',         sub: '인천광역시',  lat: 37.46, lon: 126.70 },
    'Jeonnam':        { label: 'Baekyangsa Temple', sub: '전라남도 장성군', lat: 35.22, lon: 126.88 },
    'Seoul / Icheon': { label: 'Icheon',          sub: '경기도 이천시', lat: 37.27, lon: 127.44 },
    'DMZ':            { label: 'Paju DMZ',        sub: '경기도 파주시', lat: 37.90, lon: 126.72 },
  };

  function toXY(lat, lon, W, H) {
    const x = (lon - LON_MIN) / (LON_MAX - LON_MIN) * W;
    const y = (LAT_MAX - lat) / (LAT_MAX - LAT_MIN) * H;
    return { x, y };
  }

  // --------------------------------------------------
  // Draw the map onto a canvas
  // --------------------------------------------------
  async function drawMap(canvas, pinLat, pinLon) {
    const DPR = window.devicePixelRatio || 1;
    const W   = canvas.offsetWidth  || 480;
    const H   = Math.round(W * (LAT_MAX - LAT_MIN) / (LON_MAX - LON_MIN));
    canvas.width  = W * DPR;
    canvas.height = H * DPR;
    canvas.style.height = H + 'px';
    const ctx = canvas.getContext('2d');
    ctx.scale(DPR, DPR);

    // Sea background
    ctx.fillStyle = '#d4cfc6';
    ctx.fillRect(0, 0, W, H);

    // Land fill colour
    const LAND_FILL   = '#eae5da';
    const LAND_STROKE = 'rgba(26,20,16,0.5)';

    // Draw land polygons from the shared geo data (world land‑110m)
    if (window.KG_GEO) {
      const rings = await window.KG_GEO.getLandRings();
      const PAD = 3;
      ctx.save();
      ctx.fillStyle   = LAND_FILL;
      ctx.strokeStyle = LAND_STROKE;
      ctx.lineWidth   = 0.9;
      ctx.lineJoin    = 'round';

      for (let ri = 0; ri < rings.length; ri++) {
        const ring = rings[ri];
        // Quick bbox check — skip rings nowhere near Korea
        let inRegion = false;
        for (let pi = 0; pi < ring.length; pi += 3) {
          const la = ring[pi][0], lo = ring[pi][1];
          if (la >= LAT_MIN - PAD && la <= LAT_MAX + PAD &&
              lo >= LON_MIN - PAD && lo <= LON_MAX + PAD) {
            inRegion = true; break;
          }
        }
        if (!inRegion) continue;

        ctx.beginPath();
        let first = true;
        for (let pi = 0; pi < ring.length; pi++) {
          const la = ring[pi][0], lo = ring[pi][1];
          const { x, y } = toXY(la, lo, W, H);
          if (first) { ctx.moveTo(x, y); first = false; }
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }
      ctx.restore();
    }

    // 38th parallel / DMZ band
    const dmzLatTop = 38.37, dmzLatBot = 38.25;
    const dmzPtTop = toXY(dmzLatTop, LON_MIN, W, H);
    const dmzPtBot = toXY(dmzLatBot, LON_MIN, W, H);
    ctx.save();
    ctx.fillStyle = 'rgba(200,49,43,0.08)';
    ctx.fillRect(0, dmzPtTop.y, W, dmzPtBot.y - dmzPtTop.y);
    ctx.setLineDash([5, 7]);
    ctx.strokeStyle = 'rgba(200,49,43,0.55)';
    ctx.lineWidth = 1.2;
    const dmzMid = toXY(38.31, LON_MIN, W, H);
    ctx.beginPath();
    ctx.moveTo(0, dmzMid.y);
    ctx.lineTo(W, dmzMid.y);
    ctx.stroke();
    ctx.restore();

    // Small labels
    function label(text, la, lo, opts) {
      const { x, y } = toXY(la, lo, W, H);
      const { size = 8, color = 'rgba(26,20,16,0.38)', bold = false, dx = 0, dy = 0 } = opts || {};
      ctx.save();
      ctx.fillStyle = color;
      ctx.font = (bold ? '600 ' : '400 ') + size + 'px "JetBrains Mono", monospace';
      ctx.fillText(text, x + dx, y + dy);
      ctx.restore();
    }

    label('NORTH KOREA', 38.65, 126.5, { size: 8, color: 'rgba(26,20,16,0.22)' });
    label('SOUTH KOREA', 36.2, 127.2, { size: 9, color: 'rgba(26,20,16,0.22)' });
    label('38th parallel', 38.33, 128.2, { size: 8, color: 'rgba(200,49,43,0.55)' });
    label('Yellow Sea', 36.5, 124.8, { size: 8, color: 'rgba(26,20,16,0.28)' });
    label('Sea of Japan', 36.8, 129.1, { size: 8, color: 'rgba(26,20,16,0.28)' });

    // Reference city dots (small, muted)
    const REF_CITIES = [
      { name: 'Seoul',   lat: 37.57, lon: 126.98 },
      { name: 'Busan',   lat: 35.10, lon: 129.04 },
      { name: 'Daegu',   lat: 35.87, lon: 128.60 },
      { name: 'Gwangju', lat: 35.16, lon: 126.85 },
      { name: 'Daejeon', lat: 36.35, lon: 127.38 },
      { name: 'Incheon', lat: 37.46, lon: 126.70 },
      { name: 'Jeju',    lat: 33.49, lon: 126.53 },
    ];
    REF_CITIES.forEach(c => {
      const p = toXY(c.lat, c.lon, W, H);
      // Skip if it's the same as the pin (we draw the pin bigger below)
      const isPinCity = Math.abs(c.lat - pinLat) < 0.3 && Math.abs(c.lon - pinLon) < 0.3;
      ctx.save();
      ctx.beginPath();
      ctx.arc(p.x, p.y, isPinCity ? 0 : 2.5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(26,20,16,0.35)';
      ctx.fill();
      ctx.restore();
      if (!isPinCity) {
        label(c.name, c.lat, c.lon, { size: 7.5, color: 'rgba(26,20,16,0.38)', dx: 5, dy: 3 });
      }
    });

    // ==== Animated pin using a floating div overlay ====
    // (We return pin coords so the caller can place the overlay div)
    const pin = toXY(pinLat, pinLon, W, H);

    // Shadow halo
    ctx.save();
    const grad = ctx.createRadialGradient(pin.x, pin.y, 4, pin.x, pin.y, 24);
    grad.addColorStop(0, 'rgba(200,49,43,0.25)');
    grad.addColorStop(1, 'rgba(200,49,43,0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(pin.x, pin.y, 24, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Pin body
    ctx.save();
    ctx.beginPath();
    ctx.arc(pin.x, pin.y, 8, 0, Math.PI * 2);
    ctx.fillStyle = '#c8312b';
    ctx.shadowColor = 'rgba(200,49,43,0.4)';
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.beginPath();
    ctx.arc(pin.x, pin.y, 8, 0, Math.PI * 2);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();

    // Inner dot
    ctx.save();
    ctx.beginPath();
    ctx.arc(pin.x, pin.y, 3, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.restore();

    return { pinX: pin.x / W, pinY: pin.y / H }; // fractional position
  }

  // --------------------------------------------------
  // Build and show the modal
  // --------------------------------------------------
  window.KG_SHOW_KOREA_MAP = function (city, cardEl) {
    const info = LOCATIONS[city] || LOCATIONS['Seoul'];

    // Overlay
    const overlay = document.createElement('div');
    overlay.id = 'km-overlay';
    Object.assign(overlay.style, {
      position: 'fixed', inset: '0', zIndex: '10000',
      background: 'rgba(20,15,12,0.78)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      opacity: '0', transition: 'opacity 0.35s ease',
      backdropFilter: 'blur(6px)',
    });

    // Panel
    const panel = document.createElement('div');
    Object.assign(panel.style, {
      background: 'var(--paper, #f5f0e8)',
      borderRadius: '3px',
      padding: '28px 28px 22px',
      maxWidth: '520px', width: '92vw',
      boxShadow: '0 40px 100px rgba(0,0,0,0.5)',
      transform: 'translateY(24px) scale(0.97)',
      transition: 'transform 0.35s cubic-bezier(.2,.8,.3,1)',
      fontFamily: 'var(--mono,"JetBrains Mono",monospace)',
    });

    panel.innerHTML = `
      <div style="font-size:10px;letter-spacing:.12em;text-transform:uppercase;opacity:.45;margin-bottom:6px">
        § Location · South Korea
      </div>
      <div style="display:flex;align-items:baseline;gap:10px;margin-bottom:18px">
        <span id="km-name" style="font-family:var(--serif,'EB Garamond',Georgia,serif);font-size:30px;font-style:italic;line-height:1"></span>
        <span id="km-sub" style="font-size:12px;opacity:.45"></span>
      </div>
      <div style="position:relative">
        <canvas id="km-canvas" style="width:100%;display:block;border-radius:2px;border:1px solid rgba(26,20,16,.1)"></canvas>
        <div id="km-pulse" style="
          position:absolute;pointer-events:none;
          width:32px;height:32px;margin-left:-16px;margin-top:-16px;
          border-radius:50%;border:2px solid #c8312b;
          opacity:0;transform:scale(0.4);
          animation:km-pulse 1.8s ease-out infinite;
        "></div>
      </div>
      <div style="margin-top:16px;display:flex;align-items:center;justify-content:space-between">
        <button id="km-close" style="
          font-family:inherit;font-size:10px;letter-spacing:.1em;text-transform:uppercase;
          border:none;background:none;cursor:pointer;opacity:.4;padding:6px 0;
          transition:opacity .2s;
        " onmouseover="this.style.opacity='.7'" onmouseout="this.style.opacity='.4'">✕ &nbsp;Close</button>
        <button id="km-go" style="
          font-family:inherit;font-size:11px;letter-spacing:.12em;text-transform:uppercase;
          background:var(--ink,#1a1410);color:var(--paper,#f5f0e8);
          border:none;padding:10px 22px;cursor:pointer;border-radius:2px;
          transition:opacity .2s;
        " onmouseover="this.style.opacity='.75'" onmouseout="this.style.opacity='1'">Open Day Page →</button>
      </div>
      <style>
        @keyframes km-pulse {
          0%   { opacity:.7; transform:scale(0.5); }
          70%  { opacity:0;  transform:scale(1.8); }
          100% { opacity:0;  transform:scale(1.8); }
        }
      </style>
    `;

    overlay.appendChild(panel);
    document.body.appendChild(overlay);

    // Animate in
    requestAnimationFrame(() => requestAnimationFrame(() => {
      overlay.style.opacity = '1';
      panel.style.transform = 'translateY(0) scale(1)';
    }));

    // Fill header
    panel.querySelector('#km-name').textContent = info.label;
    panel.querySelector('#km-sub').textContent  = info.sub;

    // Draw map
    const canvas = panel.querySelector('#km-canvas');
    const pulse  = panel.querySelector('#km-pulse');
    drawMap(canvas, info.lat, info.lon).then(({ pinX, pinY }) => {
      // Position the pulse ring over the pin
      const H = canvas.offsetHeight || 300;
      pulse.style.left = (pinX * 100) + '%';
      pulse.style.top  = (canvas.offsetTop + pinY * H) + 'px';
    });

    // Close logic
    let gone = false;
    function closeModal() {
      if (gone) return; gone = true;
      overlay.style.opacity = '0';
      panel.style.transform = 'translateY(12px) scale(0.97)';
      setTimeout(() => overlay.remove(), 350);
    }

    // Go logic — close then navigate
    function doGo() {
      if (gone) return; gone = true;
      overlay.style.opacity = '0';
      panel.style.transform = 'translateY(12px) scale(0.97)';
      setTimeout(() => {
        overlay.remove();
        // Trigger the card-fly navigation
        if (cardEl && typeof initiateCardNav === 'function') {
          initiateCardNav({ preventDefault() {} }, cardEl);
        }
      }, 320);
    }

    panel.querySelector('#km-close').addEventListener('click', closeModal);
    panel.querySelector('#km-go').addEventListener('click', doGo);
    overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
    document.addEventListener('keydown', function esc(e) {
      if (e.key === 'Escape') { closeModal(); document.removeEventListener('keydown', esc); }
    });
  };
})();
