// ============================================
// KoreaGang — Full-page intro globe animation
// v3: session-once, NRT, city labels
// ============================================
(function () {
  'use strict';

  // Only show once per browser session
  if (sessionStorage.getItem('kg_intro_done')) return;
  sessionStorage.setItem('kg_intro_done', '1');

  const overlay = document.createElement('div');
  overlay.id = 'kg-intro';
  overlay.style.cssText = `
    position: fixed; inset: 0; z-index: 9999;
    background: #0d0a08;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    cursor: pointer; touch-action: manipulation;
    transition: opacity .6s cubic-bezier(.23,1,.32,1);
  `;

  const canvas = document.createElement('canvas');
  canvas.style.cssText = `position: absolute; inset: 0; width: 100%; height: 100%;`;
  overlay.appendChild(canvas);

  const ui = document.createElement('div');
  ui.style.cssText = `
    position: relative; z-index: 2;
    display: flex; flex-direction: column;
    align-items: center; pointer-events: none; width: 100%;
  `;
  overlay.appendChild(ui);

  const eyebrow = document.createElement('div');
  eyebrow.textContent = 'KoreaGang 2026';
  eyebrow.style.cssText = `
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px; letter-spacing: 0.3em; text-transform: uppercase;
    color: rgba(244,236,224,.4); margin-bottom: 14px; opacity: 0;
    transition: opacity .8s ease;
  `;
  ui.appendChild(eyebrow);

  const headline = document.createElement('div');
  headline.style.cssText = `
    font-family: 'Instrument Serif', Georgia, serif;
    font-size: clamp(32px, 8vw, 96px);
    line-height: 1.0; letter-spacing: -0.04em;
    color: #f4ece0; text-align: center; font-style: italic; opacity: 0;
    transition: opacity .8s ease .3s; pointer-events: none;
  `;
  headline.innerHTML = 'KoreaTrip<br><span style="color:#c8312b;font-style:normal;font-size:0.55em;letter-spacing:-0.02em">2026</span>';
  ui.appendChild(headline);

  const btn = document.createElement('button');
  btn.textContent = 'See Plan →';
  btn.style.cssText = `
    margin-top: 44px; padding: 16px 40px;
    border: 1px solid rgba(244,236,224,.6); border-radius: 999px;
    background: transparent; color: #f4ece0;
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px; letter-spacing: 0.22em; text-transform: uppercase;
    opacity: 0; transform: translateY(12px);
    transition: opacity .6s ease, transform .6s ease, background .2s, border-color .2s;
    pointer-events: none; cursor: pointer;
  `;
  ui.appendChild(btn);

  document.body.prepend(overlay);

  // --- Canvas setup ---
  const ctx = canvas.getContext('2d');
  const DPR = Math.min(window.devicePixelRatio || 1, 2);

  function resize() {
    canvas.width = window.innerWidth * DPR;
    canvas.height = window.innerHeight * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }
  resize();
  window.addEventListener('resize', resize);

  // --- Cities ---
  const HEL = [60.17, 24.94];
  const MOW = [55.75, 37.62];
  const MID = [60.0,  70.0];
  const PKX = [39.9,  116.4];
  const ICN = [37.57, 126.98];
  const NRT = [35.77, 140.39];

  // Full route: HEL → Moscow → Siberia → Beijing → Incheon → [hop] → Narita → [hop back] → Incheon
  const WAYPOINTS = [HEL, MOW, MID, PKX, ICN, [36.5, 133.5], NRT, [36.5, 133.5], ICN];

  function buildPathPts(wpts, stepsPerSeg) {
    const pts = [];
    for (let i = 0; i < wpts.length - 1; i++) {
      const a = wpts[i], b = wpts[i + 1];
      for (let s = 0; s <= stepsPerSeg; s++) {
        const f = s / stepsPerSeg;
        pts.push([a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f]);
      }
    }
    return pts;
  }
  const PATH_PTS = buildPathPts(WAYPOINTS, 50);

  // --- Oscillating rotation ---
  // Valid rot range where ALL cities visible: HEL(25) and NRT(140) both within ±88°
  // |25 - rot| < 88  →  rot ∈ (-63, 113)
  // |140 - rot| < 88 →  rot ∈ (52, 228)
  // Intersection: rot ∈ (52, 113). Center = 82.5, half-width = 30.
  const ROT_CENTER = 82;
  const ROT_AMP    = 22;   // keeps safe margin on both sides
  const ROT_SPEED  = 0.00025; // rad/ms — very slow, full cycle ~25 s

  function getRotation(ms) {
    return ROT_CENTER + ROT_AMP * Math.sin(ms * ROT_SPEED);
  }

  // --- Projection ---
  function project(lat, lon, cx, cy, r, rot) {
    const la = lat * Math.PI / 180;
    const lo = (lon - rot) * Math.PI / 180;
    const cosLa = Math.cos(la);
    const x = cosLa * Math.sin(lo);
    const y = -Math.sin(la);
    const z = cosLa * Math.cos(lo);
    return { x: cx + r * x, y: cy + r * y, z };
  }

  function drawGlobe(cx, cy, r, rot, alpha) {
    // Atmosphere
    const grad = ctx.createRadialGradient(cx, cy, r * 0.6, cx, cy, r * 1.2);
    grad.addColorStop(0,   `rgba(29,63,138,0)`);
    grad.addColorStop(0.7, `rgba(29,63,138,${0.05 * alpha})`);
    grad.addColorStop(1,   `rgba(29,63,138,0)`);
    ctx.save(); ctx.fillStyle = grad;
    ctx.beginPath(); ctx.arc(cx, cy, r * 1.2, 0, Math.PI * 2); ctx.fill(); ctx.restore();

    // Outline
    ctx.save();
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(244,236,224,${0.1 * alpha})`; ctx.lineWidth = 1; ctx.stroke();
    ctx.restore();

    // Graticule
    ctx.save();
    ctx.strokeStyle = `rgba(244,236,224,${0.06 * alpha})`; ctx.lineWidth = 0.5;
    for (let lat = -75; lat <= 75; lat += 15) {
      ctx.beginPath(); let first = true;
      for (let lo = -180; lo <= 180; lo += 3) {
        const p = project(lat, lo, cx, cy, r, rot);
        if (p.z < 0) { first = true; continue; }
        if (first) { ctx.moveTo(p.x, p.y); first = false; } else ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
    }
    for (let lo = 0; lo < 360; lo += 15) {
      ctx.beginPath(); let first = true;
      for (let la = -80; la <= 80; la += 3) {
        const p = project(la, lo, cx, cy, r, rot);
        if (p.z < 0) { first = true; continue; }
        if (first) { ctx.moveTo(p.x, p.y); first = false; } else ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawPath(cx, cy, r, rot, progress, alpha) {
    const maxI = Math.floor(PATH_PTS.length * progress);
    // Ghost
    ctx.save(); ctx.setLineDash([2, 7]);
    ctx.strokeStyle = `rgba(200,49,43,${0.18 * alpha})`; ctx.lineWidth = 1;
    ctx.beginPath(); let first = true;
    for (const [la, lo] of PATH_PTS) {
      const p = project(la, lo, cx, cy, r, rot);
      if (p.z < 0.02) { first = true; continue; }
      if (first) { ctx.moveTo(p.x, p.y); first = false; } else ctx.lineTo(p.x, p.y);
    }
    ctx.stroke(); ctx.setLineDash([]); ctx.restore();

    // Solid animated
    ctx.save();
    ctx.strokeStyle = `rgba(200,49,43,${alpha})`; ctx.lineWidth = 2.5; ctx.lineCap = 'round';
    ctx.beginPath(); first = true;
    for (let i = 0; i <= maxI && i < PATH_PTS.length; i++) {
      const [la, lo] = PATH_PTS[i];
      const p = project(la, lo, cx, cy, r, rot);
      if (p.z < 0.02) { first = true; continue; }
      if (first) { ctx.moveTo(p.x, p.y); first = false; } else ctx.lineTo(p.x, p.y);
    }
    ctx.stroke(); ctx.restore();
  }

  function cityDot(lat, lon, label, cx, cy, r, rot, show, elapsedSec, alpha) {
    if (!show) return;
    const p = project(lat, lon, cx, cy, r, rot);
    if (p.z < 0.05) return;
    const pulse = 0.35 + (Math.sin(elapsedSec * 2.5) * 0.5 + 0.5) * 0.35;
    ctx.save();
    ctx.strokeStyle = `rgba(200,49,43,${pulse * alpha})`; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(p.x, p.y, 13, 0, Math.PI * 2); ctx.stroke();
    ctx.restore();
    ctx.save();
    ctx.fillStyle = `rgba(200,49,43,${alpha})`;
    ctx.beginPath(); ctx.arc(p.x, p.y, 5, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
    const fs = Math.min(13, Math.max(10, window.innerWidth * 0.028));
    ctx.save();
    ctx.font = `500 ${fs}px 'JetBrains Mono', monospace`;
    ctx.fillStyle = `rgba(244,236,224,${alpha})`;
    ctx.fillText(label, p.x + 16, p.y + 5);
    ctx.restore();
  }

  function drawPlane(cx, cy, r, rot, progress, alpha) {
    if (progress <= 0 || progress >= 1) return;
    const idx = Math.min(Math.floor(PATH_PTS.length * progress), PATH_PTS.length - 1);
    const [la, lo] = PATH_PTS[idx];
    const p = project(la, lo, cx, cy, r, rot);
    if (p.z < 0.05) return;
    const fs = Math.min(26, Math.max(18, window.innerWidth * 0.055));
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.font = `${fs}px serif`;
    ctx.fillText('✈', p.x - fs * 0.5, p.y + fs * 0.35);
    ctx.restore();
  }

  // --- Progress thresholds for each city (0–1 of PATH_PTS) ---
  // WAYPOINTS idx: HEL=0, MOW=1, MID=2, PKX=3, ICN=4, mid=5, NRT=6, mid=7, ICN=8
  // Segments 8 total, each ~50 pts = 400 pts total
  // Approx fractions: HEL=0, PKX=3/8=0.375, ICN=4/8=0.5, NRT=6/8=0.75, ICN-end=1.0
  const CITIES = [
    { pt: HEL, label: 'HELSINKI', showAt: 0.0  },
    { pt: PKX, label: 'BEIJING',  showAt: 0.35 },
    { pt: ICN, label: 'SEOUL',    showAt: 0.48 },
    { pt: NRT, label: 'TOKYO',    showAt: 0.73 },
  ];

  const DURATION  = 7000; // ms for full flight
  const SHOW_BTN  = 7400;
  let startTime   = null;
  let skipped     = false;
  let dismissed   = false;
  let rafId       = null;

  function dismiss() {
    if (dismissed) return;
    dismissed = true;
    overlay.style.opacity = '0';
    overlay.style.pointerEvents = 'none';
    cancelAnimationFrame(rafId);
    setTimeout(() => overlay.remove(), 650);
  }

  function showBtn() {
    if (btn.style.pointerEvents === 'auto') return;
    btn.style.opacity = '1';
    btn.style.transform = 'translateY(0)';
    btn.style.pointerEvents = 'auto';
    btn.onmouseenter = () => { btn.style.background = 'rgba(244,236,224,.12)'; btn.style.borderColor = '#f4ece0'; };
    btn.onmouseleave = () => { btn.style.background = 'transparent'; btn.style.borderColor = 'rgba(244,236,224,.6)'; };
    btn.onclick = e => { e.stopPropagation(); dismiss(); };
  }

  function skip() {
    if (skipped) return;
    skipped = true;
    eyebrow.style.opacity = '1';
    headline.style.opacity = '1';
    showBtn();
  }

  overlay.addEventListener('click', () => { if (!skipped) { skip(); } else { dismiss(); } });
  overlay.addEventListener('touchstart', () => { if (!skipped) { skip(); } else { dismiss(); } }, { passive: true });

  // Ease in-out
  function ease(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }

  function tick(now) {
    if (!startTime) startTime = now;
    const elapsed = now - startTime;
    const W = window.innerWidth, H = window.innerHeight;
    const isMobile = W < 600;
    const cx = W * 0.5;
    const cy = H * (isMobile ? 0.42 : 0.5);
    const r  = Math.min(W, H) * (isMobile ? 0.42 : 0.38);

    const rot = getRotation(elapsed);
    const globalAlpha = skipped ? 1 : Math.min(1, elapsed / 700);
    const rawT   = skipped ? 1 : Math.min(1, Math.max(0, (elapsed - 500) / DURATION));
    const flightT = ease(rawT);

    ctx.clearRect(0, 0, W, H);
    drawGlobe(cx, cy, r, rot, globalAlpha);
    drawPath(cx, cy, r, rot, flightT, globalAlpha);
    drawPlane(cx, cy, r, rot, flightT, globalAlpha);

    const elSec = elapsed / 1000;
    for (const c of CITIES) {
      cityDot(c.pt[0], c.pt[1], c.label, cx, cy, r, rot, flightT >= c.showAt, elSec, globalAlpha);
    }

    if (elapsed > 400 || skipped) { eyebrow.style.opacity = '1'; headline.style.opacity = '1'; }
    if ((elapsed > SHOW_BTN || skipped)) showBtn();

    if (!dismissed) rafId = requestAnimationFrame(tick);
  }

  rafId = requestAnimationFrame(tick);
})();
