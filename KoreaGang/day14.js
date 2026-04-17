// ===== Day 14 — Helsinki departure =====
document.addEventListener("DOMContentLoaded", () => {
  injectTopbar("home");
  renderDayHero(14);

  renderTimeline([
    { time: "20:35", what: "Flight from Helsinki (HEL)", desc: "Saimi, Jere, Ada depart Helsinki Airport. Overnight flight to Incheon — arrive tomorrow morning." },
  ]);

  document.getElementById("notes-slot").innerHTML = `
    <h2>Good to know</h2>
    <p style="color:var(--ink-soft)">No activity in Korea today — they are still in the air.</p>
  `;

  document.getElementById("logistics-slot").innerHTML = `
    <h4>Logistics</h4>
    <ul>
      <li>Travelers: Saimi · Jere · Ada</li>
      <li>From: Helsinki (HEL) 20:35</li>
      <li>To: Incheon (ICN) — arr. May 15 10:10</li>
    </ul>
  `;

  document.getElementById("links-slot").innerHTML = `
    <h4>Useful links</h4>
    <ul>
      <li style="color:var(--ink-soft)">—</li>
    </ul>
  `;
});
