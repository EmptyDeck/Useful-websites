// ===== Day 20 — page data =====
// Fill in the schedule items, notes, logistics and links below
// once the real plan for May 20 is decided.

document.addEventListener("DOMContentLoaded", () => {
  injectTopbar("home");
  renderDayHero(20);

  // Each item: { time: "HH:MM", what: "...", desc: "..." }
  renderTimeline([
    // { time: "", what: "", desc: "" },
  ]);

  document.getElementById("notes-slot").innerHTML = `
    <h2>Good to know</h2>
    <p style="color:var(--ink-soft)">No notes yet.</p>
  `;

  document.getElementById("logistics-slot").innerHTML = `
    <h4>Logistics</h4>
    <ul>
      <li style="color:var(--ink-soft)">—</li>
    </ul>
  `;

  document.getElementById("links-slot").innerHTML = `
    <h4>Useful links</h4>
    <ul>
      <li style="color:var(--ink-soft)">—</li>
    </ul>
  `;
});
