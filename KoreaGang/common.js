// ===== KoreaGang — common JS =====
// Shared trip metadata. Edit DAYS / TODO when real plans come in.

const TRIP = {
  name: "KoreaGang 2026",
  startISO: "2026-05-14",
  endISO:   "2026-05-28",
};

// Day metadata. Title + tags show up on the calendar card and the day hero.
// Leave title empty until a real plan is decided.
const DAYS = [
  { d: 14, dow: "Thu", title: "Helsinki → flight",       tags: ["flight"] },
  { d: 15, dow: "Fri", title: "Arrival · Incheon",       tags: ["arrival", "incheon"] },
  { d: 16, dow: "Sat", title: "Move to Seoul · Wedding", tags: ["seoul", "wedding"] },
  { d: 17, dow: "Sun", title: "Dinner w/ Korean friends",tags: ["seoul", "dinner"] },
  { d: 18, dow: "Mon", title: "", tags: [] },
  { d: 19, dow: "Tue", title: "", tags: [] },
  { d: 20, dow: "Wed", title: "", tags: [] },
  { d: 21, dow: "Thu", title: "Be a Monk",              tags: ["templestay", "option"] },
  { d: 22, dow: "Fri", title: "Be a Monk",              tags: ["templestay", "option"] },
  { d: 23, dow: "Sat", title: "Enjoy Seoul", tags: ["seoul"] },
  { d: 24, dow: "Sun", title: "Enjoy Seoul", tags: ["seoul"] },
  { d: 25, dow: "Mon", title: "Enjoy Seoul", tags: ["seoul"] },
  { d: 26, dow: "Tue", title: "", tags: [] },
  { d: 27, dow: "Wed", title: "", tags: [] },
  { d: 28, dow: "Thu", title: "Departure",               tags: ["departure"] },
];

// Things still to plan (no date yet) — shown in the right side panel.
const TODO = [
  // { text: "example task", owner: "me" },
];

function dayHref(d) {
  return `day${String(d).padStart(2, "0")}.html`;
}

function buildTopbar(activeLabel) {
  return `
    <header class="topbar">
      <div class="brand">
        <span class="dot"></span>
        <span>${TRIP.name}</span>
      </div>
      <nav>
        <a href="_index.html" class="${activeLabel === "home" ? "active" : ""}">Calendar</a>
        <a href="_index.html#todo" class="${activeLabel === "todo" ? "active" : ""}">To-plan</a>
      </nav>
    </header>
  `;
}

function injectTopbar(activeLabel) {
  const slot = document.getElementById("topbar-slot");
  if (slot) slot.innerHTML = buildTopbar(activeLabel);
}
