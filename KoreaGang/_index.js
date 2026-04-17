// ===== KoreaGang — index page JS =====

function renderCalendar() {
  const root = document.getElementById("calendar");
  if (!root) return;

  const row1 = DAYS.filter(x => x.d >= 14 && x.d <= 17);
  const row2 = DAYS.filter(x => x.d >= 18 && x.d <= 24);
  const row3 = DAYS.filter(x => x.d >= 25 && x.d <= 28);

  const cardHTML = (day) => `
    <a class="day-card" href="${dayHref(day.d)}">
      <div>
        <div class="top">
          <span class="num">${day.d}</span>
          <span class="dow">${day.dow}</span>
        </div>
        <div class="title">${day.title || '<span style="color:var(--ink-soft);font-weight:500">to plan</span>'}</div>
      </div>
      <div class="tags">
        ${day.tags.map(t => `<span>#${t}</span>`).join("")}
      </div>
    </a>
  `;

  root.innerHTML = `
    <div class="cal-row r1">${row1.map(cardHTML).join("")}</div>
    <div class="cal-row r2">${row2.map(cardHTML).join("")}</div>
    <div class="cal-row r3">${row3.map(cardHTML).join("")}</div>
  `;
}

function renderTodo() {
  const root = document.getElementById("todo-list");
  if (!root) return;
  if (!TODO.length) {
    root.innerHTML = `<li style="border-style:solid;border-color:var(--line);color:var(--ink-soft);justify-content:center">nothing here yet</li>`;
    return;
  }
  root.innerHTML = TODO.map((t, i) => `
    <li>
      <input type="checkbox" id="todo-${i}">
      <label for="todo-${i}">${t.text}</label>
      <span class="who">${t.owner}</span>
    </li>
  `).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  injectTopbar("home");
  renderCalendar();
  renderTodo();
});
