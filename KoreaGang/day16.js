// ===== Day 16 — Move to Seoul · Wedding =====
document.addEventListener("DOMContentLoaded", () => {
  injectTopbar("home");
  renderDayHero(16);

  renderTimeline([
    { time: "15:00", what: "Move from Incheon → Seoul main house", desc: "Yeongdeungpo-gu. Drop bags, settle in." },
    { time: "17:40", what: "Cousin's wedding ceremony (Gangnam)",  desc: "My cousin (older sister) is getting married. Venue is in Gangnam — we go as a group." },
  ]);

  document.getElementById("notes-slot").innerHTML = `
    <h2>Good to know</h2>
    <p style="color:var(--ink-soft)">Dress slightly nicely — it is a wedding.</p>
  `;

  document.getElementById("logistics-slot").innerHTML = `
    <h4>Logistics</h4>
    <ul>
      <li>Base: Seoul main house (Yeongdeungpo-gu)</li>
      <li>Wedding: 17:40 · Gangnam</li>
    </ul>
  `;

  document.getElementById("links-slot").innerHTML = `
    <h4>Useful links</h4>
    <ul>
      <li style="color:var(--ink-soft)">—</li>
    </ul>
  `;
});
