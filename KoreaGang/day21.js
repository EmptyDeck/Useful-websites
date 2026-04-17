// ===== Day 21 — Baekyangsa Templestay (day 1) =====
document.addEventListener("DOMContentLoaded", () => {
  injectTopbar("home");
  renderDayHero(21);

  renderTimeline([
    { time: "10:00", what: "Depart Seoul for Baekyangsa (백양사)", desc: "Leave around 10 AM — we need to reach the temple before 15:00." },
    { time: "15:00", what: "Templestay check-in",                   desc: "Templestay program officially begins at 3 PM. Settle in, change into the temple uniform, get the schedule." },
  ]);

  document.getElementById("notes-slot").innerHTML = `
    <h2>Good to know</h2>
    <p>Templestay is where you become a buddhist monk for a day.</p>
    <p style="color:var(--ink-soft)">Modest clothing required. Phone use is limited inside the temple. Early morning the next day.</p>
  `;

  document.getElementById("logistics-slot").innerHTML = `
    <h4>Logistics</h4>
    <ul>
      <li>Depart Seoul: ~10:00</li>
      <li>Arrive by: 15:00</li>
      <li>Stay: Baekyangsa Temple</li>
      <li>Span: May 21 → May 22</li>
    </ul>
  `;

  document.getElementById("links-slot").innerHTML = `
    <h4>Useful links</h4>
    <ul>
      <li><a href="https://eng.templestay.com" target="_blank">Templestay Korea</a></li>
    </ul>
  `;
});
