// ===== Day 22 — Baekyangsa Templestay (day 2) =====
document.addEventListener("DOMContentLoaded", () => {
  injectTopbar("home");
  renderDayHero(22);

  renderTimeline([
    { time: "11:00", what: "Templestay ends",       desc: "Program wraps up at 11 AM. Return clothes, check out." },
    { time: "After", what: "Return trip to Seoul",  desc: "Head back — same round-trip transport already counted on Day 21." },
  ]);

  document.getElementById("notes-slot").innerHTML = `
    <h2>Good to know</h2>
    <p><strong>Cost summary</strong> (per person):</p>
    <p>Round-trip transport: <strong>₩60,000 (~€41)</strong></p>
    <p>Templestay (food + sleep, 1 night): <strong>₩30,000 (~€21)</strong></p>
    <p>Total: <strong>₩90,000 (~€62)</strong></p>
  `;

  document.getElementById("logistics-slot").innerHTML = `
    <h4>Logistics</h4>
    <ul>
      <li>Templestay end: 11:00</li>
      <li>Stay: Baekyangsa Temple → out</li>
    </ul>
  `;

  document.getElementById("links-slot").innerHTML = `
    <h4>Useful links</h4>
    <ul>
      <li><a href="https://eng.templestay.com" target="_blank">Templestay Korea</a></li>
    </ul>
  `;
});
