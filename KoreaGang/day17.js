// ===== Day 17 — Dinner with Korean friends =====
document.addEventListener("DOMContentLoaded", () => {
  injectTopbar("home");
  renderDayHero(17);

  renderTimeline([
    { time: "Evening", what: "Dinner with Korean friends", desc: "Meeting up with Yubin and other Korean friends — group dinner." },
  ]);

  document.getElementById("notes-slot").innerHTML = `
    <h2>Good to know</h2>
    <p style="color:var(--ink-soft)">Time and venue TBD — Yubin will likely confirm.</p>
  `;

  document.getElementById("logistics-slot").innerHTML = `
    <h4>Logistics</h4>
    <ul>
      <li>Base: Seoul main house</li>
      <li>Joining: Yubin + Korean friends</li>
    </ul>
  `;

  document.getElementById("links-slot").innerHTML = `
    <h4>Useful links</h4>
    <ul>
      <li style="color:var(--ink-soft)">—</li>
    </ul>
  `;
});
