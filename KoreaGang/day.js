// ===== Per-day shared JS =====
// Each day page calls renderDayHero(14) etc. and provides its own schedule data.

function renderDayHero(dayNum) {
  const meta = DAYS.find(x => x.d === dayNum);
  if (!meta) return;

  const heroSlot = document.getElementById("day-hero-slot");
  if (heroSlot) {
    heroSlot.innerHTML = `
      <div class="day-hero">
        <div class="badge">
          <div class="num">${meta.d}</div>
          <div class="month">MAY · ${meta.dow.toUpperCase()}</div>
        </div>
        <div>
          <h1>${meta.title || `Day ${meta.d}`}</h1>
          <p class="sub">May ${meta.d}, 2026 · ${meta.dow}day</p>
          <div class="tags">
            ${meta.tags.map(t => `<span>#${t}</span>`).join("")}
          </div>
        </div>
      </div>
    `;
  }

  const navSlot = document.getElementById("day-nav-slot");
  if (navSlot) {
    const idx = DAYS.findIndex(x => x.d === dayNum);
    const prev = DAYS[idx - 1];
    const next = DAYS[idx + 1];
    navSlot.innerHTML = `
      <nav class="day-nav">
        <a href="${prev ? dayHref(prev.d) : '_index.html'}">← ${prev ? `Day ${prev.d}${prev.title ? ' · ' + prev.title : ''}` : 'Calendar'}</a>
        <a href="_index.html">📅 All days</a>
        <a href="${next ? dayHref(next.d) : '_index.html'}">${next ? `Day ${next.d}${next.title ? ' · ' + next.title : ''}` : 'Calendar'} →</a>
      </nav>
    `;
  }
}

function renderTimeline(items) {
  const root = document.getElementById("timeline");
  if (!root) return;
  root.innerHTML = items.map(it => `
    <li>
      <span class="time">${it.time}</span>
      <div class="what">${it.what}</div>
      <div class="desc">${it.desc || ""}</div>
    </li>
  `).join("");
}
