// ============================================
// KoreaGang — Day page renderer
// ============================================
const DAY_NUM = (() => {
  // Support both ?d=18 and legacy /day18.html URL patterns
  const qs = new URLSearchParams(location.search).get('d');
  if (qs) return parseInt(qs);
  const m = location.pathname.match(/day(\d+)/);
  return m ? parseInt(m[1]) : null;
})();

function renderDayHero(hiddenDays) {
  const meta = DAYS.find(x => x.d === DAY_NUM);
  if (!meta) return;
  const isJapan = [18, 19, 20].includes(DAY_NUM);
  const isKorea = !isJapan && DAY_NUM !== 14;
  const isHelsinki = DAY_NUM === 14;
  if (isJapan) {
    document.body.classList.add('day-japan');
    const stripe = document.createElement('div');
    stripe.className = 'kg-japan-stripe';
    document.body.appendChild(stripe);
  }
  const slot = document.getElementById('day-hero-slot');
  const watermark = isJapan
    ? '<div class="day-japan-kanji">日本</div>'
    : isKorea
    ? '<div class="day-japan-kanji" style="color:rgba(29,63,138,.13)">한국</div>'
    : isHelsinki
    ? '<div class="day-japan-kanji" style="color:rgba(29,63,138,.14);font-style:normal">Helsinki</div>'
    : '';
  slot.innerHTML = `
    <section class="day-hero">
      <a class="day-back" href="_index.html">← Calendar</a>
      <div class="wrap" style="position:relative">
        ${watermark}
        <div class="day-hero-eyebrow">Chapter ${String(DAY_NUM).padStart(2,'0')} · ${meta.city}</div>
        <div class="day-hero-row">
          <div>
            <div class="day-num">${meta.d}</div>
            <div class="day-num-sub">${meta.dow.toUpperCase()} · MAY ${meta.d}, 2026</div>
          </div>
          <div>
            <h1 class="day-title">${meta.title ? esc(meta.title) : '<em style="font-style:italic; color:var(--ink-soft)">To be plotted…</em>'}</h1>
            <div class="day-tags">${meta.tags.map(t=>`<span class="day-tag">${esc(t)}</span>`).join('')}</div>
          </div>
        </div>
      </div>
    </section>`;
}

function renderDayBody() {
  const d = DAY_DATA[DAY_NUM] || { timeline: [], notes: '', logistics: [], links: [] };
  const slot = document.getElementById('day-body-slot');
  slot.innerHTML = `
    <section class="wrap">
      <div class="day-body">
        <div>
          <div class="section-eyebrow" style="margin-bottom:20px">§ Schedule</div>
          ${d.timeline.length ? `
            <ul class="timeline">
              ${d.timeline.map(it => `
                <li class="tl-item">
                  <div class="tl-time">${esc(it.time)}</div>
                  <div>
                    <div class="tl-what">${esc(it.what)}</div>
                    ${it.desc ? `<div class="tl-desc">${esc(it.desc)}</div>` : ''}
                  </div>
                </li>`).join('')}
            </ul>
          ` : `<div class="tl-empty">Schedule to be written…</div>`}
          ${d.notes ? `
            <div class="day-notes">
              <div class="day-notes-lbl">Good to know</div>
              <div class="day-notes-txt">${esc(d.notes)}</div>
            </div>` : ''}
        </div>
        <aside>
          ${d.logistics.length ? `
            <div class="side-card">
              <h4>Logistics</h4>
              ${d.logistics.map(([k,v]) => `<div class="side-row"><div class="k">${esc(k)}</div><div class="v">${esc(v)}</div></div>`).join('')}
            </div>` : ''}
          ${d.links.length ? `
            <div class="side-card side-links">
              <h4>Useful links</h4>
              ${d.links.map(([lbl, href]) => `<a href="${esc(href)}" target="_blank">${esc(lbl)}</a>`).join('')}
            </div>` : ''}
        </aside>
      </div>
    </section>`;
}

function renderDayNav(hiddenDays) {
  const idx = DAYS.findIndex(x => x.d === DAY_NUM);
  const prev = DAYS[idx-1];
  const next = DAYS[idx+1];
  const isAdm = isAdmin();
  const mask = day => {
    if (!day) return null;
    if (hiddenDays[`day${day.d}`] && !isAdm) return '◆ Sealed';
    return day.title || `Day ${day.d}`;
  };
  const slot = document.getElementById('day-nav-slot');
  slot.innerHTML = `
    <nav class="day-nav wrap">
      <a href="${prev ? dayHref(prev.d) : '_index.html'}">
        ← ${prev ? `Day ${prev.d}` : 'Calendar'}
        ${prev ? `<span class="big">${esc(mask(prev))}</span>` : ''}
      </a>
      <a class="center" href="_index.html">§ All chapters</a>
      <a class="right" href="${next ? dayHref(next.d) : '_index.html'}">
        ${next ? `Day ${next.d}` : 'Calendar'} →
        ${next ? `<span class="big">${esc(mask(next))}</span>` : ''}
      </a>
    </nav>`;
}

function renderSealed(msg) {
  const main = document.getElementById('day-main');
  main.innerHTML = `
    <section class="kg-sealed">
      <div class="kg-sealed-seal">◆</div>
      <div style="position:relative;z-index:2">
        <div class="kg-sealed-eyebrow">Chapter ${String(DAY_NUM).padStart(2,'0')} · Sealed</div>
        <h1 class="kg-sealed-msg">${esc(msg || 'Something secret is planned…')}</h1>
        <div class="kg-sealed-sub">It's a secret yet<br>Let Sejik Cook</div>
        <a href="_index.html" class="kg-sealed-back">← Back to calendar</a>
      </div>
    </section>`;
}

ready(async () => {
  initCursor();
  injectNav('home');
  if (!DAY_NUM) return;

  let hiddenDays = {};
  try { hiddenDays = await apiGet('/api/hidden_days'); } catch(_) {}
  const pageKey = `day${DAY_NUM}`;
  const hideInfo = hiddenDays[pageKey];
  const isAdm = isAdmin();

  if (hideInfo && !isAdm) {
    renderSealed(hideInfo.message);
    // Still show admin banner if needed? No — guests don't see admin.
    return;
  }

  document.title = `Day ${DAY_NUM} · ${DAYS.find(x=>x.d===DAY_NUM)?.title || ''} — KoreaGang 2026`;
  renderDayHero(hiddenDays);
  renderDayBody();
  renderDayNav(hiddenDays);
  await initInteractive(pageKey);
});
