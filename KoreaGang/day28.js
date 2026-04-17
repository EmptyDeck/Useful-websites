// ===== Day 28 — Departure =====
document.addEventListener("DOMContentLoaded", () => {
  injectTopbar("home");
  renderDayHero(28);

  renderTimeline([
    { time: "09:25", what: "Flight from Incheon (ICN)", desc: "Saimi, Jere, Ada fly out from Incheon Airport. End of trip." },
  ]);

  document.getElementById("notes-slot").innerHTML = `
    <h2>Good to know</h2>
    <p style="color:var(--ink-soft)">Be at the airport ~3 hours before — that means leaving Seoul very early. Tax-refund desks are after security; keep receipts ≥ ₩30,000 from a single store.</p>
  `;

  document.getElementById("logistics-slot").innerHTML = `
    <h4>Logistics</h4>
    <ul>
      <li>Departing: Saimi · Jere · Ada</li>
      <li>Flight out: ICN 09:25</li>
      <li>At airport by: ~06:30</li>
    </ul>
  `;

  document.getElementById("links-slot").innerHTML = `
    <h4>Useful links</h4>
    <ul>
      <li><a href="https://www.airport.kr/ap/en/index.do" target="_blank">Incheon Airport</a></li>
    </ul>
  `;
});
