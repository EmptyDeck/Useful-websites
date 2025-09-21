// game.js - last update : prevent repeat, hardest vocab injection, improved progress + choices
let settings = JSON.parse(localStorage.getItem('settings') || '{}');
let startIndex = settings.start || 1;
let endIndex = settings.end || vocabList.length;
let mode = settings.lang || 'eng';
let numQuestions = settings.count || 20;
let timeLimit = settings.timeLimit || 3;
let maxQuestionsLimit = settings.maxQuestions || 40;

// Game state
let gameStartTime = Date.now();
let availableWords = vocabList.slice(startIndex - 1, endIndex);
let queue = [];
let score = 0;
let currentQuestion = null;
let timerId = null;
let timeLeft = timeLimit;
let roundToken = 0;
let lastWordId = null; // 🆕 track last shown word

// Advanced retry tracking
let wordProgress = new Map(); // word -> { wrongCount, correctStreak, requiredStreak, mastered }
let mastered = new Set();
let totalQuestionsAnswered = 0;
let wordsMastered = 0;

// UI state
let isLocked = false;
let isRevealed = false;

// TTS
let selectedVoice = null;
let voicesLoaded = false;

// DOM elements
const gameCard = document.getElementById('gameCard');
const optionsContainer = document.getElementById('answerGrid');
const scoreDisplay = document.getElementById('scoreDisplay');
const nextBtnContainer = document.getElementById('nextBtnContainer');
const nextBtn = document.getElementById('nextBtn');
const timerDisplay = document.getElementById('timerDisplay');
const progressBar = document.getElementById('progressBar');
const progressLabel = document.getElementById('progressLabel');

// ================== TTS FUNCTIONS ==================
function loadVoices() {
  const voices = speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return;

  voicesLoaded = true;
  const savedVoice = localStorage.getItem("selectedVoice");
  selectedVoice = savedVoice
    ? voices.find(v => v.name === savedVoice)
    : voices.find(v => v.lang.startsWith('en')) || voices[0];
}

loadVoices();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = loadVoices;
}

function speak(text) {
  if (!settings.ttsEnabled) return;
  if (!text || typeof text !== 'string') return;
  if (speechSynthesis.speaking) speechSynthesis.cancel();

  const trySpeak = () => {
    if (!voicesLoaded || !selectedVoice) {
      setTimeout(trySpeak, 100);
      return;
    }
    try {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = selectedVoice;
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.volume = 1;
      speechSynthesis.speak(utterance);
    } catch (error) {
      console.error("TTS error:", error);
    }
  };

  if (!voicesLoaded) {
    setTimeout(trySpeak, 200);
  } else {
    trySpeak();
  }
}

// ================== WORD PROGRESS MANAGEMENT ==================
function getWordId(word) {
  return `${word.word}_${word.definition}`;
}

function initializeWordProgress(word) {
  const wordId = getWordId(word);
  if (!wordProgress.has(wordId)) {
    wordProgress.set(wordId, {
      wrongCount: 0,
      correctStreak: 0,
      requiredStreak: 2,
      mastered: false,
      word: word
    });
  }
  return wordProgress.get(wordId);
}

function updateWordProgress(word, isCorrect) {
  const progress = initializeWordProgress(word);

  if (isCorrect) {
    progress.correctStreak++;
    if (progress.correctStreak >= progress.requiredStreak && !progress.mastered) {
      progress.mastered = true;
      mastered.add(getWordId(word));
      wordsMastered++;
      return true;
    }
  } else {
    progress.correctStreak = 0;
    progress.wrongCount++;
    progress.requiredStreak = 2 + progress.wrongCount;
  }
  return false;
}

function manageQueue(word) {
  const progress = wordProgress.get(getWordId(word));
  if (progress.mastered) return;

  const wordId = getWordId(word);
  queue = queue.filter(w => getWordId(w) !== wordId);

  const toAdd = progress.requiredStreak - progress.correctStreak;
  if (toAdd <= 0) return;

  for (let i = 0; i < toAdd; i++) {
    const randomIndex = Math.floor(Math.random() * (queue.length + 1));
    queue.splice(randomIndex, 0, word);
  }
}

// ================== GAME LOGIC ==================
function initializeGame() {
  wordProgress.clear();
  mastered.clear();
  wordsMastered = 0;
  totalQuestionsAnswered = 0;

  shuffleInPlace(availableWords);

  for (let i = 0; i < Math.min(numQuestions, availableWords.length); i++) {
    queue.push(availableWords[i]);
    initializeWordProgress(availableWords[i]);
  }

  updateProgressBar();
}

function pickNextQuestion() {
  if (queue.length === 0) return null;

  let next = queue.shift();
  let nextId = getWordId(next);

  // 🚫 prevent repeat if more than 2 words left
  if (nextId === lastWordId && queue.length > 0) {
    queue.push(next);
    shuffleInPlace(queue);
    next = queue.shift();
    nextId = getWordId(next);
  }

  // 🆕 if only 2 vocabs left, 30% chance inject hardest vocab
  if (queue.length === 1) { // means 2 left including this one
    if (Math.random() < 0.3) {
      const hardest = pickHardestVocab();
      if (hardest) {
        next = hardest;
        nextId = getWordId(hardest);
      }
    }
  }

  lastWordId = nextId;
  return next;
}

function pickHardestVocab() {
  const total = availableWords.length;
  const k = Math.max(1, Math.floor(total / 4));

  // exclude last 2 remaining
  const exclude = new Set(queue.slice(0, 2).map(w => getWordId(w)));
  const candidates = Array.from(wordProgress.values())
    .filter(p => !exclude.has(getWordId(p.word)))
    .sort((a, b) => b.requiredStreak - a.requiredStreak)
    .slice(0, k);

  if (candidates.length === 0) return null;
  return candidates[Math.floor(Math.random() * candidates.length)].word;
}

function updateProgressBar() {
  const totalWords = Math.min(availableWords.length, numQuestions);
  const pct = Math.min(100, Math.round((wordsMastered / totalWords) * 100));

  if (progressBar) progressBar.style.width = `${pct}%`;
  if (progressLabel) {
    let currentStreakText = '';
    if (currentQuestion) {
      const progress = wordProgress.get(getWordId(currentQuestion));
      if (progress) {
        currentStreakText = ` | Current ${progress.correctStreak}/${progress.requiredStreak}`;
      }
    }
    progressLabel.textContent = `Q: ${totalQuestionsAnswered}/${maxQuestionsLimit} | W: ${wordsMastered}/${totalWords}${currentStreakText}`;
  }
}

function updateScoreDisplay() {
  if (!scoreDisplay) return;
  scoreDisplay.textContent = `점수: ${score} | 완료: ${wordsMastered}`;
}

function startTimer(localToken) {
  stopTimer();
  timeLeft = timeLimit;
  if (timerDisplay) timerDisplay.textContent = `${timeLeft}s`;

  timerId = setInterval(() => {
    if (localToken !== roundToken) {
      stopTimer();
      return;
    }
    timeLeft -= 1;
    if (timerDisplay) timerDisplay.textContent = `${timeLeft}s`;

    if (timeLeft <= 0) {
      stopTimer();
      if (isLocked) return;
      const correctAnswer = (mode === 'eng') ? currentQuestion?.definition : currentQuestion?.word;
      handleWrong(null, correctAnswer);
    }
  }, 1000);
}

function stopTimer() {
  if (timerId != null) {
    clearInterval(timerId);
    timerId = null;
  }
}

function isGameOver() {
  return totalQuestionsAnswered >= maxQuestionsLimit ||
         wordsMastered >= Math.min(availableWords.length, numQuestions) ||
         queue.length === 0;
}

function showGameQuestion() {
  if (isGameOver()) {
    endGame();
    return;
  }

  isLocked = false;
  isRevealed = false;
  roundToken++;

  currentQuestion = pickNextQuestion();
  if (!currentQuestion) {
    endGame();
    return;
  }

  const questionElement = gameCard?.querySelector('.question');
  if (questionElement) {
    const questionText = mode === 'eng' ? currentQuestion.word : currentQuestion.definition;
    questionElement.textContent = questionText;
    setTimeout(() => speak(questionText), 300);
  }

  const allAnswers = availableWords.map(v => mode === 'eng' ? v.definition : v.word);
  const correctAnswer = (mode === 'eng') ? currentQuestion.definition : currentQuestion.word;
  const choices = buildUniqueChoices(correctAnswer, allAnswers, 5);

  if (optionsContainer) {
    optionsContainer.innerHTML = '';
    choices.forEach(choice => {
      const btn = document.createElement('button');
      btn.className = 'btn secondary';
      btn.textContent = choice;
      btn.addEventListener('click', () => {
        if (isLocked || isRevealed) return;
        handleAnswer(choice, correctAnswer, btn);
      });
      optionsContainer.appendChild(btn);
    });
  }

  updateScoreDisplay();
  if (nextBtn) nextBtn.disabled = true;
  startTimer(roundToken);
}

// ================== FIXED PART ==================
function handleAnswer(selected, correct, btn) {
  if (isLocked || isRevealed) return;

  isLocked = true;
  stopTimer();

  const isCorrect = selected === correct;

  if (isCorrect) {
    const wasJustMastered = updateWordProgress(currentQuestion, true);
    btn.classList.add('correct');
    score++;
    totalQuestionsAnswered++;

    if (wasJustMastered) {
      btn.textContent += " ✓";
    }

    if (optionsContainer) {
      [...optionsContainer.children].forEach(b => { if (b !== btn) b.disabled = true; });
    }

    if (!wasJustMastered) {
      manageQueue(currentQuestion);
    }

    updateProgressBar();
    updateScoreDisplay();

    setTimeout(() => { showGameQuestion(); }, 800);

  } else {
    handleWrong(btn, correct);
  }
}

function handleWrong(btn, correct) {
  if (isLocked && isRevealed) return;

  stopTimer();
  isLocked = true;
  isRevealed = true;

  if (!correct && currentQuestion) {
    correct = (mode === 'eng') ? currentQuestion.definition : currentQuestion.word;
  }

  if (btn) btn.classList.add('wrong');

  if (optionsContainer) {
    [...optionsContainer.children].forEach(optionBtn => {
      optionBtn.disabled = true;
      if (optionBtn.textContent === correct) {
        optionBtn.classList.add('correct');
      }
    });
  }

  if (currentQuestion) {
    totalQuestionsAnswered++;
    updateWordProgress(currentQuestion, false);
    manageQueue(currentQuestion);
  }

  if (nextBtn) nextBtn.disabled = false;
  updateProgressBar();
  updateScoreDisplay();
}

function endGame() {
  const elapsedTime = Math.floor((Date.now() - gameStartTime) / 1000);
  localStorage.setItem('results', JSON.stringify({
    score,
    total: totalQuestionsAnswered,
    wordsMastered,
    totalWords: Math.min(availableWords.length, numQuestions),
    elapsedTime: elapsedTime
  }));

  if (typeof goToPage === 'function') {
    goToPage('results.html');
  } else {
    alert(`Game Over!\nScore: ${score}/${totalQuestionsAnswered}\nWords Mastered: ${wordsMastered}/${Math.min(availableWords.length, numQuestions)}`);
  }
}

// ================== UTILITY FUNCTIONS ==================
function shuffleInPlace(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function buildUniqueChoices(correct, pool, size) {
  const result = new Set([correct]);
  let attempts = 0;

  while (result.size < size && attempts < 200) {
    const candidate = pool[Math.floor(Math.random() * pool.length)];
    if (!candidate) { attempts++; continue; }

    if (mode === 'eng') {
      if ([...result].some(c => c.toLowerCase().trim() === candidate.toLowerCase().trim())) {
        attempts++; continue;
      }
    } else {
      if ([...result].some(c => hasTooManySharedChars(c, candidate))) {
        attempts++; continue;
      }
    }
    result.add(candidate);
    attempts++;
  }

  return shuffleInPlace([...result]);
}

function hasTooManySharedChars(a, b) {
  let maxStreak = 0, streak = 0;
  for (let i = 0; i < Math.min(a.length, b.length); i++) {
    if (a[i] === b[i]) {
      streak++;
      maxStreak = Math.max(maxStreak, streak);
    } else {
      streak = 0;
    }
  }
  return maxStreak > 2;
}

// ================== EVENT LISTENERS ==================
window.addEventListener("DOMContentLoaded", () => {
  initializeGame();
  setTimeout(() => showGameQuestion(), 500);
});

if (nextBtn) {
  nextBtn.addEventListener('click', () => {
    if (nextBtn.disabled) return;
    showGameQuestion();
  });
}
