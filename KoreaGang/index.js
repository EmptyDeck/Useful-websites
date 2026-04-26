// ============================================
// KoreaGang — Home page (index)
// ============================================

const HERO_TARGET = new Date(TRIP.startISO);

function initHero() {
  const hero = document.getElementById('hero');
  if (!hero) return;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    const heroH = hero.offsetHeight;
    // Parallax title
    const title = hero.querySelector('.hero-title');
    if (title) title.style.transform = `translateY(${y * -0.08}px)`;
    // Globe always visible on parchment background — no fade
    const globe = document.querySelector('.hero-globe');
    if (globe) globe.style.opacity = '0.95';
  }, { passive: true });
}

function initGlobe() {
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

  // Points: [lat, lon] — Helsinki, via Moscow, Novosibirsk, Ulaanbaatar, Beijing, Seoul
  const HELSINKI = [60.17, 24.94];
  const SEOUL = [37.57, 126.98];
  const PKX = [39.9, 116.4];
  const NRT = [35.77, 140.39];
  const path = [HELSINKI, [55.75, 37.62], [55.0, 82.9], [47.9, 106.9], PKX, SEOUL, [36.5, 133.5], NRT];
  let t0 = performance.now();
  // Scroll-driven rotation: starts at FIXED_ROT, rotates as user scrolls
  const ROT_BASE = 83;
  let scrollRot = 0; // additional rotation from scroll
  window.addEventListener('scroll', () => {
    // Every 100px scroll = 1 degree rotation
    scrollRot = window.scrollY * 0.01;
  }, { passive: true });
  let mouseX = 0, mouseY = 0;
  document.addEventListener('mousemove', e => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 0.3;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 0.3;
  });

  function toXY(lat, lon, cx, cy, r, rot) {
    const la = lat * Math.PI / 180;
    const lo = (lon - rot) * Math.PI / 180;
    const x = Math.cos(la) * Math.sin(lo);
    const y = -Math.sin(la) + mouseY * 0.3;
    const z = Math.cos(la) * Math.cos(lo);
    return { x: cx + r * x, y: cy + r * y, z };
  }

  function drawGraticule(cx, cy, r, rot) {
    ctx.save();
    ctx.strokeStyle = 'rgba(26,20,16,0.13)';
    ctx.lineWidth = 0.6;
    // Latitude lines
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
    // Longitude lines
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
    const now = performance.now();
    const elapsed = (now - t0);
    const rotation = ROT_BASE + scrollRot; // base + scroll-driven
    const pathProgress = Math.min(1, ((elapsed / 1000) % 10) / 7);

    const W = c.getBoundingClientRect().width;
    const H = c.getBoundingClientRect().height;
    const isMobile = W < 720;
    const cx = W / 2 + mouseX * 20;
    const cy = H * (isMobile ? 0.55 : 0.52);
    const r = Math.min(W, H) * 0.42;

    ctx.clearRect(0, 0, W, H);

    // Outer faint ring
    ctx.beginPath();
    ctx.arc(cx, cy, r + 10, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(26,20,16,0.08)';
    ctx.lineWidth = 0.6;
    ctx.stroke();

    // Circle outline
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(26,20,16,0.3)';
    ctx.lineWidth = 1;
    ctx.stroke();

    drawGraticule(cx, cy, r, rotation);

    // Animated flight arc
    const flightPts = [];
    for (let i = 0; i < path.length - 1; i++) {
      const a = path[i], b = path[i+1];
      for (let s = 0; s <= 1; s += 0.03) {
        const lat = a[0] + (b[0] - a[0]) * s;
        const lon = a[1] + (b[1] - a[1]) * s;
        flightPts.push([lat, lon]);
      }
    }
    const maxIdx = Math.floor(flightPts.length * pathProgress);

    // Draw dashed full path first (ghost)
    ctx.save();
    ctx.setLineDash([2, 4]);
    ctx.strokeStyle = 'rgba(200,49,43,0.25)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    let first = true;
    for (const [lat, lon] of flightPts) {
      const p = toXY(lat, lon, cx, cy, r, rotation);
      if (p.z < 0.01) { first = true; continue; }
      if (first) { ctx.moveTo(p.x, p.y); first = false; }
      else ctx.lineTo(p.x, p.y);
    }
    ctx.stroke();
    ctx.restore();

    // Solid animated arc
    ctx.strokeStyle = 'var(--dc-red)';
    ctx.strokeStyle = '#c8312b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    first = true;
    for (let i = 0; i <= maxIdx && i < flightPts.length; i++) {
      const [lat, lon] = flightPts[i];
      const p = toXY(lat, lon, cx, cy, r, rotation);
      if (p.z < 0.01) { first = true; continue; }
      if (first) { ctx.moveTo(p.x, p.y); first = false; }
      else ctx.lineTo(p.x, p.y);
    }
    ctx.stroke();

    // Cities
    function dot(pt, label, color) {
      const p = toXY(pt[0], pt[1], cx, cy, r, rotation);
      if (p.z < 0) return;
      ctx.save();
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 4, 0, Math.PI*2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(p.x, p.y, 9, 0, Math.PI*2);
      ctx.strokeStyle = color;
      ctx.globalAlpha = 0.3 + Math.sin(elapsed / 1000 * 3) * 0.15;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();
      // label
      ctx.save();
      ctx.fillStyle = '#1a1410';
      ctx.font = '500 10px "JetBrains Mono", monospace';
      ctx.fillText(label, p.x + 12, p.y + 4);
      ctx.restore();
    }
    dot(HELSINKI, 'HELSINKI', '#1d3f8a');
    dot(PKX, 'BEIJING', '#6b5a48');
    dot(SEOUL, 'SEOUL', '#c8312b');
    dot(NRT, 'TOKYO', '#1e6b5c');

    // Plane at head of arc
    if (maxIdx < flightPts.length - 1) {
      const [lat, lon] = flightPts[Math.max(0, maxIdx)];
      const p = toXY(lat, lon, cx, cy, r, rotation);
      if (p.z >= 0) {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.fillStyle = '#c8312b';
        ctx.font = '20px serif';
        ctx.fillText('✈', -8, 6);
        ctx.restore();
      }
    }

    requestAnimationFrame(draw);
  }
  draw();
}

function initCountdown() {
  const wrap = document.getElementById('cd-wrap');
  if (!wrap) return;
  function tick() {
    const diff = HERO_TARGET - Date.now();
    if (diff <= 0) {
      wrap.innerHTML = '<div style="font-family:var(--serif); font-style:italic; font-size:72px;">Bon voyage ✈</div>';
      return;
    }
    const pad = n => String(n).padStart(2, '0');
    const d = Math.floor(diff / 86400000);
    const h = Math.floor(diff % 86400000 / 3600000);
    const m = Math.floor(diff % 3600000 / 60000);
    const s = Math.floor(diff % 60000 / 1000);
    document.getElementById('cd-d').textContent = pad(d);
    document.getElementById('cd-h').textContent = pad(h);
    document.getElementById('cd-m').textContent = pad(m);
    document.getElementById('cd-s').textContent = pad(s);
  }
  tick();
  setInterval(tick, 1000);
}

function initiateCardNav(e, card) {
  e.preventDefault();
  const href = card.getAttribute('href');
  const rect = card.getBoundingClientRect();

  // Phase 1: card flips to 90deg (disappears edge-on)
  const fly = document.createElement('div');
  fly.className = 'card-nav-fly';
  fly.style.cssText = `
    position: fixed;
    left: ${rect.left}px; top: ${rect.top}px;
    width: ${rect.width}px; height: ${rect.height}px;
    background: var(--paper-2);
    z-index: 9990; pointer-events: none;
    transform-origin: center center;
    transform: perspective(800px) rotateY(0deg);
    transition: none;
    border-radius: 2px;
  `;
  document.body.appendChild(fly);

  // Step 1: flip to edge (90deg) while expanding slightly
  requestAnimationFrame(() => {
    fly.style.transition = 'transform .22s cubic-bezier(.4,0,1,1), left .22s, top .22s, width .22s, height .22s, border-radius .22s';
    fly.style.transform = 'perspective(800px) rotateY(90deg)';
    fly.style.left = `${rect.left + rect.width/2 - window.innerWidth/2}px`;
    fly.style.top = `${rect.top + rect.height/2 - window.innerHeight/2}px`;
    fly.style.width = '100vw';
    fly.style.height = '100vh';
    fly.style.borderRadius = '0';
  });

  // Step 2: flip from edge to flat (parchment full-screen)
  setTimeout(() => {
    fly.style.transition = 'transform .22s cubic-bezier(0,0,.6,1)';
    fly.style.left = '0'; fly.style.top = '0';
    fly.style.transform = 'perspective(800px) rotateY(0deg)';
    fly.style.background = 'var(--paper)';
  }, 220);

  // Navigate
  setTimeout(() => { location.href = href; }, 460);
}

function initTilt() {
  document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(1000px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

async function renderCalendar() {
  const root = document.getElementById('calendar');
  if (!root) return;
  let hiddenDays = {};
  try { hiddenDays = await apiGet('/api/hidden_days'); } catch (_) {}
  const isAdmin = sessionStorage.getItem('kg_admin') === '1' && !!sessionStorage.getItem('kg_admin_token');

  // Fetch comment counts for all days in parallel
  const counts = {};
  await Promise.allSettled(DAYS.map(async day => {
    try {
      const cmts = await apiGet(`/api/comments?page=day${day.d}`);
      counts[day.d] = Array.isArray(cmts) ? cmts.length : 0;
    } catch(_) { counts[day.d] = 0; }
  }));

  root.innerHTML = DAYS.map(day => {
    const key = `day${day.d}`;
    const hide = hiddenDays[key] && !isAdmin;
    const msg = hiddenDays[key]?.message || 'Something secret is planned…';
    const isJapan = [18, 19, 20].includes(day.d);
    const isKorea = !isJapan && day.d !== 14;
    const isHelsinki = day.d === 14;
    if (hide) {
      return `
        <a class="it-card mystery" data-tilt href="${dayHref(day.d)}">
          <span class="it-arrow">→</span>
          <div class="it-row1">
            <span class="it-num">${day.d}</span>
            <span class="it-dow">${day.dow} · May</span>
          </div>
          <div class="mystery-badge">Sealed</div>
          <div class="it-title"><em style="font-style:italic">${esc(msg)}</em></div>
          <div class="it-tags"><span class="it-tag">◆ classified</span></div>
        </a>`;
    }
    return `
      <a class="it-card${isJapan ? ' it-card--japan' : isKorea ? ' it-card--korea' : ''}" data-tilt href="${dayHref(day.d)}" onclick="initiateCardNav(event,this)">
        <span class="it-arrow">→</span>
        ${isJapan ? '<div class="it-japan-kanji">日本</div>' : isKorea ? '<div class="it-japan-kanji">한국</div>' : isHelsinki ? '<div class="it-japan-kanji" style="color:rgba(29,63,138,.28);font-size:clamp(28px,5vw,48px);font-style:normal">Helsinki</div>' : ''}
        <div class="it-row1">
          <span class="it-num">${day.d}</span>
          <span class="it-dow">${day.dow} · May</span>
        </div>
        <div class="it-city">${esc(day.city)}</div>
        <div class="it-title">${day.title ? esc(day.title) : '<span class="empty">to be plotted</span>'}</div>
        <div class="it-tags">
          ${day.tags.map(t => `<span class="it-tag">${esc(t)}</span>`).join('')}
        </div>
        ${counts[day.d] > 0 ? `<div class="it-cmt-badge">${counts[day.d]} comment${counts[day.d]>1?'s':''}</div>` : ''}
      </a>`;
  }).join('');
  initTilt();
}

async function renderWishlist() {
  const list = document.getElementById('wl-list');
  if (!list) return;
  let user = [];
  try { user = await apiGet('/api/wishlist'); } catch(_) {}
  const all = TODO.map(t => ({ text: t.text, nickname: t.owner || '', staff: true, id: null }))
    .concat(user.map(u => ({ text: u.text, nickname: u.nickname, staff: false, id: u.id })));
  const isAdm = sessionStorage.getItem('kg_admin') === '1' && !!sessionStorage.getItem('kg_admin_token');
  list.innerHTML = all.map((it, i) => `
    <li class="wl-item ${it.staff ? '' : 'user'}" id="wli-${it.id || 'staff-' + i}">
      <span class="wl-idx">${String(i+1).padStart(2,'0')}</span>
      <span class="wl-text">${esc(it.text)}</span>
      <span class="wl-who">${it.nickname ? '— ' + esc(it.nickname) : ''}</span>
      ${isAdm && !it.staff && it.id ? `
        <span class="wl-admin-btns">
          <button class="wl-edit-btn" onclick="adminEditWish(${it.id},'${esc(it.text).replace(/'/g,"\\'")}')" title="Edit">✏️</button>
          <button class="wl-del" onclick="adminDelWish(${it.id})">✕</button>
        </span>` : ''}
    </li>`).join('');
  const badge = document.getElementById('wl-count');
  if (badge) badge.textContent = String(all.length).padStart(2, '0');

  // Render wishlist person picker
  const row = document.getElementById('wl-person-row');
  if (row) {
    row.innerHTML = `<span class="kg-person-lbl" style="width:100%">I am</span>
      ${PEOPLE.map(n => `<button class="kg-person-btn${CURRENT_NICK===n?' active':''}" onclick="wlSetPerson('${n}')">${n}</button>`).join('')}
      <input class="kg-person-own" id="wl-name" type="text" value="${esc(CURRENT_NICK)}" maxlength="30" placeholder="or type your name" oninput="wlNameInput(event)">`;
  }
}

function wlSetPerson(name) {
  if (CURRENT_NICK === name) {
    CURRENT_NICK = ''; localStorage.removeItem('kg_nick');
  } else {
    CURRENT_NICK = name; localStorage.setItem('kg_nick', name);
  }
  document.querySelectorAll('#wl-person-row .kg-person-btn').forEach(b =>
    b.classList.toggle('active', b.textContent === CURRENT_NICK && CURRENT_NICK !== ''));
  const inp = document.getElementById('wl-name');
  if (inp) inp.value = CURRENT_NICK;
}
function wlNameInput(e) {
  CURRENT_NICK = e.target.value.slice(0, 30);
  localStorage.setItem('kg_nick', CURRENT_NICK);
  document.querySelectorAll('#wl-person-row .kg-person-btn').forEach(b =>
    b.classList.toggle('active', b.textContent === CURRENT_NICK));
}

async function adminDelWish(id) {
  await apiPost('/api/admin/delete_wishlist', { token: sessionStorage.getItem('kg_admin_token'), wishlist_id: Number(id) });
  await renderWishlist();
}

function adminEditWish(id, currentText) {
  const li = document.getElementById(`wli-${id}`);
  if (!li) return;
  const textEl = li.querySelector('.wl-text');
  if (!textEl) return;
  // Replace text span with input
  const orig = textEl.textContent;
  textEl.innerHTML = `<input class="wl-edit-input" value="${esc(orig)}" style="
    border:none; border-bottom:1px solid var(--ink);
    background:transparent; font-family:var(--serif);
    font-size:inherit; color:var(--ink); outline:none;
    width:100%; padding:2px 0;
  ">`;
  const inp = textEl.querySelector('input');
  inp.focus(); inp.select();
  // Replace admin btns with save/cancel
  const btns = li.querySelector('.wl-admin-btns');
  btns.innerHTML = `
    <button class="wl-edit-btn" onclick="adminSaveWish(${id})" title="Save">✓</button>
    <button class="wl-del" onclick="renderWishlist()">✕</button>`;
  inp.addEventListener('keydown', e => {
    if (e.key === 'Enter') adminSaveWish(id);
    if (e.key === 'Escape') renderWishlist();
  });
}

async function adminSaveWish(id) {
  const li = document.getElementById(`wli-${id}`);
  const inp = li?.querySelector('.wl-edit-input');
  const text = inp?.value.trim();
  if (!text) return;
  await apiPost('/api/admin/edit_wishlist', { token: sessionStorage.getItem('kg_admin_token'), wishlist_id: Number(id), text });
  await renderWishlist();
}

async function addWish() {
  const inp = document.getElementById('wl-input');
  const text = (inp?.value || '').trim();
  if (!text) { inp?.focus(); return; }
  const nickname = CURRENT_NICK;
  if (!nickname) {
    const row = document.getElementById('wl-person-row');
    if (row) {
      row.classList.remove('shake');
      void row.offsetWidth;
      row.classList.add('shake');
      setTimeout(() => row.classList.remove('shake'), 600);
    }
    return;
  }
  const btn = document.getElementById('wl-btn');
  if (btn) btn.disabled = true;
  try {
    const res = await apiPost('/api/wishlist', { text, nickname });
    if (res && res.ok !== false) {
      inp.value = '';
      await renderWishlist();
      showToast('Added to the wishlist ✦', 'success');
    } else {
      showToast('Could not add — try again.', 'error');
    }
  } catch(e) {
    showToast('Could not add — try again.', 'error');
  } finally {
    if (btn) btn.disabled = false;
  }
}

// Clean up fly overlay if browser restores page from bfcache
window.addEventListener('pageshow', e => {
  if (e.persisted) {
    document.querySelectorAll('.card-nav-fly').forEach(el => el.remove());
    document.body.style.overflow = '';
  }
});

ready(() => {
  initCursor();
  injectNav('home');
  initHero();
  initGlobe();
  initCountdown();
  renderCalendar();
  renderWishlist();

  const btn = document.getElementById('wl-btn');
  if (btn) btn.addEventListener('click', addWish);
  const inp = document.getElementById('wl-input');
  if (inp) inp.addEventListener('keydown', e => { if (e.key === 'Enter') addWish(); });

  // Interactive page features
  if (typeof initInteractive === 'function') initInteractive('_index');
});
