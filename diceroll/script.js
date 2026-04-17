const dice = document.getElementById("dice");
const result = document.getElementById("result");
const rollBtn = document.getElementById("rollBtn");
const resetBtn = document.getElementById("resetBtn");
const historyList = document.getElementById("historyList");
const soundToggle = document.getElementById("soundToggle");

let history = [];
let isRolling = false;

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

const faceNames = {
  1: "Snake eyes",
  2: "Double",
  3: "Trio",
  4: "Quartet",
  5: "Quint",
  6: "Full house",
};

function setFace(face) {
  dice.setAttribute("data-face", String(face));
  result.textContent = `You rolled ${face}. ${faceNames[face]}`;
}

function renderHistory() {
  historyList.innerHTML = "";
  history.slice(0, 6).forEach((entry) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${entry.value}</strong><span>${entry.time}</span>`;
    historyList.appendChild(li);
  });
}

function playClick() {
  if (!soundToggle.checked) return;
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }

  const now = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = "triangle";
  osc.frequency.setValueAtTime(200, now);
  osc.frequency.exponentialRampToValueAtTime(520, now + 0.08);

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.08, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);

  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start(now);
  osc.stop(now + 0.2);
}

function rollDice() {
  if (isRolling) return;
  isRolling = true;
  dice.classList.add("rolling");

  const nextFace = Math.floor(Math.random() * 6) + 1;

  setTimeout(() => {
    dice.classList.remove("rolling");
    setFace(nextFace);
    history.unshift({
      value: nextFace,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    });
    renderHistory();
    isRolling = false;
  }, 550);

  playClick();
}

function resetAll() {
  history = [];
  result.textContent = "Roll to begin";
  dice.setAttribute("data-face", "1");
  renderHistory();
}

rollBtn.addEventListener("click", rollDice);
resetBtn.addEventListener("click", resetAll);

window.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    event.preventDefault();
    rollDice();
  }
});

resetAll();
