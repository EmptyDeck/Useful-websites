// ===== Day 15 — Arrival · Incheon =====
document.addEventListener("DOMContentLoaded", () => {
  injectTopbar("home");
  renderDayHero(15);

  renderTimeline([
    { time: "10:10", what: "Land at Incheon Airport (ICN)", desc: "Saimi, Jere, Ada arrive from Helsinki." },
    { time: "Day",   what: "Move to a Motel in Incheon",     desc: "Head directly from the airport to a motel in Incheon. The room is around ₩80,000 with 5 people sharing one room." },
  ]);

  document.getElementById("notes-slot").innerHTML = `
    <h2>Good to know</h2>
    <p style="color:var(--ink-soft)">First day on Korean soil. Jet lag will hit — keep it easy. Move to Seoul tomorrow afternoon.</p>
  `;

  document.getElementById("logistics-slot").innerHTML = `
    <h4>Logistics</h4>
    <ul>
      <li>Arrivals: Saimi · Jere · Ada</li>
      <li>Airport: ICN — 10:10</li>
      <li>Stay: Incheon Motel (₩80,000 / 5 people sharing)</li>
    </ul>
  `;

  document.getElementById("links-slot").innerHTML = `
    <h4>Useful links</h4>
    <ul>
      <li><a href="https://www.airport.kr/ap/en/index.do" target="_blank">Incheon Airport</a></li>
    </ul>
  `;
});
