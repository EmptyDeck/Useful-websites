// ============================================
// KoreaGang 2026 — Shared trip data
// ============================================

const TRIP = {
  name: "KoreaGang",
  year: "2026",
  startISO: "2026-05-14T20:35:00+03:00",
  endISO: "2026-05-28",
  daysTotal: 15,
};

const PEOPLE = ['Saimi', 'Jere', 'Ada', 'Alexsis', 'Sejik'];

const DAYS = [
  { d: 14, dow: "Thu", title: "Departure Day",              tags: ["flight"],                        city: "Helsinki" },
  { d: 15, dow: "Fri", title: "Arrival Day in Incheon",     tags: ["arrival", "incheon"],            city: "Incheon" },
  { d: 16, dow: "Sat", title: "Settle-In Day",              tags: ["seoul", "wedding"],              city: "Seoul" },
  { d: 17, dow: "Sun", title: "Old Friends Day",            tags: ["seoul", "festival", "dinner"],   city: "Seoul" },
  { d: 18, dow: "Mon", title: "Depart to Japan 07:10",      tags: ["flight", "japan"],               city: "Japan" },
  { d: 19, dow: "Tue", title: "Japan",                      tags: ["japan"],                         city: "Japan" },
  { d: 20, dow: "Wed", title: "Arrive Incheon 19:55",       tags: ["arrival", "incheon"],            city: "Incheon" },
  { d: 21, dow: "Thu", title: "Be a Monk Day",              tags: ["jeonnam", "templestay"],         city: "Jeonnam" },
  { d: 22, dow: "Fri", title: "Korea Town Day",             tags: ["lunch", "cafe", "spa"],          city: "Seoul / Icheon" },
  { d: 23, dow: "Sat", title: "Energy Day",                 tags: ["escape room", "trivia"], city: "Seoul" },
  { d: 24, dow: "Sun", title: "Event Day",                  tags: ["holiday", "itaewon", "night"],   city: "Seoul" },
  { d: 25, dow: "Mon", title: "History Day",                tags: ["gyeongbokgung", "town", "art"],  city: "Seoul" },
  { d: 26, dow: "Tue", title: "North Korea Day",            tags: ["dmz", "tour", "day trip"],       city: "DMZ" },
  { d: 27, dow: "Wed", title: "Last Pick Day",              tags: ["tbd", "group choice", "final day"], city: "Seoul" },
  { d: 28, dow: "Thu", title: "Departure Day",              tags: ["departure"],                     city: "Incheon" },
];

const TODO = [
  { text: "DMZ Tour", owner: "" },
  { text: "Gyeongbokgung Palace", owner: "" },
  { text: "National Museum of Korea", owner: "" },
  { text: "Itaewon", owner: "" },
  { text: "Namsan Tower", owner: "" },
  { text: "Hangang River Park", owner: "" },
  { text: "Jamsu Bridge Ttubeokttubeok Festival — Sundays only", owner: "" },
  { text: "Cheonggyecheon Stream", owner: "" },
  { text: "Namdaemun Market", owner: "" },
  { text: "Gwangjingyo Bridge Observatory — not Mon", owner: "" },
];

const DAY_DATA = {
  14: {
    timeline: [{ time: "20:35", what: "Flight from Helsinki (HEL)", desc: "Saimi, Jere, Ada depart Helsinki Airport. Overnight flight to Incheon — arrive tomorrow morning." }],
    notes: "No activity in Korea today — they are still in the air. Try to sleep.",
    logistics: [
      ["Travelers", "Saimi · Jere · Ada"],
      ["From", "Helsinki (HEL) 20:35"],
      ["To", "Incheon (ICN) — arr. May 15, 10:10"],
    ],
    links: [],
  },
  15: {
    timeline: [
      { time: "10:10", what: "Land at Incheon Airport (ICN)", desc: "Saimi, Jere, Ada arrive from Helsinki." },
      { time: "Day", what: "Move to a Motel in Incheon", desc: "Head directly from the airport to a motel in Incheon. About ₩80,000 (€46.15) total, or about ₩16,000 (€9.23) per person with 5 people sharing one room." },
    ],
    notes: "First day on Korean soil. Jet lag will hit — keep it easy. Move to Seoul tomorrow afternoon.",
    logistics: [
      ["Arrivals", "Saimi · Jere · Ada"],
      ["Airport", "ICN · 10:10"],
      ["Stay", "Incheon Motel (about ₩80,000 / €46.15 total / 5 pax)"],
      ["Per person", "About ₩16,000 (€9.23) each"],
    ],
    links: [["Incheon Airport", "https://www.airport.kr/ap/en/index.do"]],
  },
  16: {
    timeline: [
      { time: "15:00", what: "Move Incheon → Seoul main house", desc: "Yeongdeungpo-gu. Drop bags, settle in." },
      { time: "17:40", what: "Cousin's wedding ceremony", desc: "My cousin (older sister) is getting married. Venue is in Gangnam — we go as a group." },
    ],
    notes: "Dress slightly nicely — it is a wedding.",
    logistics: [["Base", "Seoul main house (Yeongdeungpo-gu)"], ["Wedding", "17:40 · Gangnam"]],
    links: [],
  },
  17: {
    timeline: [
      { time: "Evening", what: "Dinner with Korean friends", desc: "Meeting up with Yubin and other Korean friends — group dinner." },
    ],
    notes: "Time and venue TBD — Yubin will confirm.",
    logistics: [["Base", "Seoul main house"], ["Joining", "Yubin + Korean friends"]],
    links: [],
  },
  18: {
    timeline: [
      { time: "07:10", what: "Depart Seoul → Tokyo (NRT)", desc: "Flight from Incheon. ~2h flight." },
      { time: "~09:00", what: "Land at Narita Airport (NRT)", desc: "" },
      { time: "~10:30", what: "Check in — Hotel Rakuto", desc: "2-chome-19-4 Iwamotocho, Chiyoda City, Tokyo. 楽途ビル 5–8F. ~1.5h from airport. Near Katsuyoshi — a great tonkatsu restaurant." },
      { time: "12:00", what: "Lunch — Ramen in Ginza", desc: "Two options nearby: Ginza Ramen ①  Ginza Ramen ②" },
      { time: "Afternoon", what: "Tokyo's Imperial Palace", desc: "East Gardens open to public. Beautiful grounds in the heart of the city." },
      { time: "Evening", what: "Shinjuku", desc: "Godzilla Head rooftop · Golden Gai Streets · Omoide Yokocho (memory lane)" },
      { time: "Also", what: "Meiji Shrine + Hachikō", desc: "Meiji Jingu Shrine. Hachikō Memorial Statue at Shibuya Station." },
      { time: "Night", what: "Shibuya", desc: "Shibuya Crossing · Shibuya Sky observation deck." },
      { time: "Dinner", what: "Izakaya — open till midnight", desc: "Close to hotel. See Google Maps link for recommendation." },
    ],
    notes: "Hotel is in Chiyoda — central location, easy subway access everywhere. Tip: get a Suica card at the airport for trains.",
    logistics: [
      ["Flight", "ICN 07:10 → NRT ~09:00"],
      ["Hotel", "楽途ビル 5–8F, Chiyoda City"],
      ["Address", "2-19-4 Iwamotocho, Tokyo 101-0032"],
      ["Near hotel", "Katsuyoshi (tonkatsu)"],
    ],
    links: [
      ["Ginza Ramen ①", "https://maps.app.goo.gl/83jegCSg7kEGxUnBA"],
      ["Ginza Ramen ②", "https://maps.app.goo.gl/RdxWMfsrSHUA5NRF8"],
      ["Dinner Izakaya", "https://maps.app.goo.gl/DiD5hTSRRDmAYCAH8"],
      ["Hotel location", "https://maps.app.goo.gl/"],
    ],
  },
  19: {
    timeline: [
      { time: "Morning", what: "Free morning", desc: "Slow start — explore the area around the hotel." },
      { time: "Lunch", what: "Conveyor belt sushi 🍣", desc: "Sushiro, Kura Sushi or Hama Sushi — all great chains with fresh fish." },
      { time: "Afternoon", what: "Asakusa", desc: "Senso-ji Temple · Nakamise Street (street food and souvenirs) · Tokyo Skytree nearby." },
      { time: "Then", what: "Akihabara Electric Town ⚡", desc: "Arcades · electronics · anime shops · Don Quijote Akihabara · Yodobashi Akiba." },
      { time: "Evening", what: "Tea ceremony / matcha", desc: "Find a tea house in Asakusa or Yanaka area." },
    ],
    notes: "Asakusa and Akihabara are very close to each other — easy to do both in one afternoon. Senso-ji is especially atmospheric in the evening.",
    logistics: [
      ["Stay", "楽途ビル, Chiyoda City"],
      ["Key areas", "Asakusa · Akihabara"],
    ],
    links: [
      ["Senso-ji Temple", "https://maps.app.goo.gl/"],
      ["Don Quijote Akihabara", "https://maps.app.goo.gl/"],
    ],
  },
  20: {
    timeline: [
      { time: "Morning", what: "Ginza + teamLab Borderless", desc: "teamLab Borderless — immersive digital art. Book tickets in advance! Also: Nakagin Capsule Tower · Miyazaki clock building (Hermès)." },
      { time: "11:00–12:00", what: "Hotel check-out", desc: "Pack up and check out. Leave bags at the hotel front desk if needed." },
      { time: "16:00", what: "Head to Narita Airport (NRT)", desc: "~1.5h from central Tokyo. Take the Narita Express (N'EX) from Shinjuku or Tokyo Station." },
      { time: "19:55", what: "Departure NRT → ICN", desc: "Flight back to Incheon. Arrive Seoul ~22:20." },
    ],
    notes: "Tax refund: keep receipts from single stores ≥ ¥5,000. Tax refund counters are at the airport after check-in. Arrive at NRT by 17:30 at the latest.",
    logistics: [
      ["Check-out", "11:00–12:00"],
      ["To airport", "16:00 (N'EX train)"],
      ["Flight out", "NRT 19:55 → ICN ~22:20"],
    ],
    links: [
      ["teamLab Borderless tickets", "https://www.teamlab.art/e/borderless-tokyo/"],
      ["Narita Express (N'EX)", "https://www.jreast.co.jp/e/nex/"],
    ],
  },
  21: {
    timeline: [
      { time: "10:00", what: "Depart Seoul for Baekyangsa (백양사)", desc: "Leave around 10 AM — we need to reach the temple before 15:00." },
      { time: "15:00", what: "Templestay check-in", desc: "Program officially begins at 3 PM. Settle in, change into the temple uniform, get the schedule." },
    ],
    notes: "Templestay is where you become a buddhist monk for a day. Modest clothing required. Phone use is limited inside the temple. Early morning the next day.",
    logistics: [["Depart Seoul", "~10:00"], ["Arrive by", "15:00"], ["Stay", "Baekyangsa Temple"], ["Span", "May 21 → May 22"]],
    links: [["Templestay Korea", "https://eng.templestay.com"]],
  },
  22: {
    timeline: [
      { time: "11:00", what: "Out by eleven", desc: "Start the day and head out." },
      { time: "12:00", what: "Lunch at Gung", desc: "A semi-fine-dining spot focused on royal Korean cuisine. Budget about ₩35,000 (€20.19) per person." },
      { time: "Afternoon", what: "Cafe stop", desc: "Keep the middle of the day loose and easy." },
      { time: "Evening", what: "Icheon Thermeden Spa", desc: "Spa night. Bring a swimsuit." },
    ],
    notes: "A softer chapter after the earlier travel rhythm: one good lunch, one cafe, one long soak.",
    logistics: [["Lunch", "Gung"], ["Budget", "About ₩35,000 (€20.19) per person"], ["Evening", "Icheon Thermeden Spa"], ["Reminder", "Bring a swimsuit"]],
    links: [],
  },
  23: {
    timeline: [
      { time: "Day", what: "Hongdae wandering", desc: "Street energy, shops, snacks, and whatever looks fun in the moment." },
      { time: "Day / Evening", what: "Escape room", desc: "Budget about ₩30,000 (€17.31) per person." },
      { time: "Night", what: "Trivia night", desc: "Keep the pace up and let the night stay lively." },
    ],
    notes: "This one should feel playful, fast, and a little noisy.",
    logistics: [["Area", "Hongdae"], ["Escape room", "About ₩30,000 (€17.31) each"], ["Night", "Trivia night"]],
    links: [],
  },
  24: {
    timeline: [
      { time: "Day", what: "Buddha's Birthday", desc: "Let the daytime plan breathe and feel a little ceremonial." },
      { time: "Night", what: "Itaewon wandering", desc: "An open evening for looking around, walking, and seeing the neighborhood." },
      { time: "Late night", what: "Itaewon club", desc: "If we go in, expect club entry to be about ₩30,000 (€17.31) per person." },
    ],
    notes: "Keep the contrast intact: calm by day, curious by night.",
    logistics: [["Daytime", "Buddha's Birthday"], ["Night", "Itaewon"], ["Club entry", "About ₩30,000 (€17.31) each"]],
    links: [],
  },
  25: {
    timeline: [
      { time: "Morning", what: "Gyeongbokgung Palace", desc: "Start with the grand, formal Seoul. Traditional clothing rental is about ₩30,000 (€17.31) per person." },
      { time: "Afternoon", what: "Bukchon Hanok Village", desc: "Move into the older residential texture of the city." },
      { time: "Later", what: "National Museum of Korea", desc: "End with a slower museum chapter rather than modern art." },
    ],
    notes: "A classic Seoul sequence: royal scale, hanok lanes, then the National Museum of Korea.",
    logistics: [["Stops", "Gyeongbokgung, Bukchon, National Museum of Korea"], ["Hanbok rental", "About ₩30,000 (€17.31) per person"], ["Pace", "Best as a walking-heavy culture day"]],
    links: [],
  },
  26: {
    timeline: [
      { time: "09:40-14:40", what: "Paju DMZ Tour", desc: "Keep the day protected for the tour itself. Budget about ₩9,200 (€5.31) per person." },
    ],
    notes: "Do not overpack this page. The tour is the day.",
    logistics: [["Plan", "Paju DMZ Tour"], ["Time", "09:40-14:40"], ["Budget", "About ₩9,200 (€5.31) per person"]],
    links: [],
  },
  27: {
    timeline: [
      { time: "Day", what: "Still to be chosen", desc: "Ask what everyone most wants to add, then lock the final plan together." },
    ],
    notes: "Leave this one open on purpose. The point is to choose one more thing the group actually wants.",
    logistics: [["Status", "To be decided together"], ["Next step", "Ask the group for one more pick and choose from there"]],
    links: [],
  },
  28: {
    timeline: [{ time: "09:25", what: "Flight from Incheon (ICN)", desc: "Saimi, Jere, Ada fly out from Incheon Airport. End of trip." }],
    notes: "Be at the airport ~3 hours before — that means leaving Seoul very early. Tax-refund desks are after security; keep receipts ≥ ₩30,000 (€17.31) from a single store.",
    logistics: [["Departing", "Saimi · Jere · Ada"], ["Flight out", "ICN 09:25"], ["At airport by", "~06:30"]],
    links: [["Incheon Airport", "https://www.airport.kr/ap/en/index.do"]],
  },
};

function dayHref(d) { return `day.html?d=${d}`; }
function pageId() {
  const d = new URLSearchParams(location.search).get('d');
  if (d) return `day${d}`;
  const f = (location.pathname.split('/').pop() || '').replace('.html','');
  if (!f || f === '_index' || f === 'index') return '_index';
  return f;
}

// ============================================
// API helpers — with offline fallback
// ============================================
const OFFLINE_KEY = 'kg_offline_store';
const OFFLINE = !location.protocol.startsWith('http') || location.hostname === '';
const ADMIN_PIN_SALT = 'KoreaGang.admin.v2';
const ADMIN_PIN_ITERATIONS = 240000;
const ADMIN_PIN_HASH_HEX = '8f193489ac9f97ba9ef81fc0763dc60ee3adee92cbc268e8c993e001b6c4ea39';

function offlineStore() {
  try { return JSON.parse(localStorage.getItem(OFFLINE_KEY) || '{"comments":{},"reactions":{},"hidden":{},"wishlist":[]}'); }
  catch(_) { return {"comments":{},"reactions":{},"hidden":{},"wishlist":[]}; }
}
function saveOffline(s) { localStorage.setItem(OFFLINE_KEY, JSON.stringify(s)); }

function adminPinDigits(pin) {
  return /^\d{6}$/.test(pin) ? [...pin].map(ch => Number(ch)) : null;
}

function adminPinFold(digits) {
  let acc = 0;
  digits.forEach((digit, index) => { acc = acc * 13 + digit + index; });
  return acc;
}

function adminPinLooksRight(pin) {
  const digits = adminPinDigits(String(pin || ''));
  if (!digits) return false;
  const sum = digits.reduce((acc, digit) => acc + digit, 0);
  const product = digits.reduce((acc, digit) => acc * digit, 1);
  return sum === 36 && product === 38416 && adminPinFold(digits) === 2842563;
}

function hexFromBytes(bytes) {
  return Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('');
}

async function deriveAdminPinHex(pin) {
  if (!globalThis.crypto?.subtle) return '';
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey('raw', enc.encode(String(pin || '')), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', hash: 'SHA-256', salt: enc.encode(ADMIN_PIN_SALT), iterations: ADMIN_PIN_ITERATIONS },
    key,
    256,
  );
  return hexFromBytes(new Uint8Array(bits));
}

async function verifyOfflineAdminPin(pin) {
  const normalized = String(pin || '');
  if (!adminPinLooksRight(normalized)) return false;
  if (!globalThis.crypto?.subtle) return true;
  try {
    return (await deriveAdminPinHex(normalized)) === ADMIN_PIN_HASH_HEX;
  } catch (_) {
    return false;
  }
}

function issueOfflineAdminToken() {
  const bytes = new Uint8Array(24);
  if (globalThis.crypto?.getRandomValues) {
    crypto.getRandomValues(bytes);
  } else {
    for (let i = 0; i < bytes.length; i++) bytes[i] = Math.floor(Math.random() * 256);
  }
  const token = hexFromBytes(bytes);
  sessionStorage.setItem('kg_admin_token', token);
  return token;
}

function offlineAdminTokenOk(token) {
  return !!token && token === (sessionStorage.getItem('kg_admin_token') || '');
}

async function apiGet(url) {
  try {
    const r = await fetch(url);
    if (!r.ok) throw new Error(r.status);
    return await r.json();
  } catch (e) {
    // Fallback to localStorage
    const s = offlineStore();
    const u = new URL(url, location.origin);
    const page = u.searchParams.get('page') || '_index';
    if (u.pathname === '/api/comments') return s.comments[page] || [];
    if (u.pathname === '/api/reactions') return s.reactions[page] || {};
    if (u.pathname === '/api/hidden') {
      const v = s.hidden[page];
      return v ? { hidden: true, message: v.message || '' } : { hidden: false, message: '' };
    }
    if (u.pathname === '/api/hidden_days') return s.hidden || {};
    if (u.pathname === '/api/wishlist') return s.wishlist || [];
    throw e;
  }
}

async function apiPost(url, body) {
  try {
    const r = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!r.ok) throw new Error(r.status);
    return await r.json();
  } catch (e) {
    // Offline simulated handlers
    const s = offlineStore();
    const page = body.page || '_index';
    if (url === '/api/wishlist') {
      s.wishlist = s.wishlist || [];
      s.wishlist.push({ id: Date.now(), text: body.text, nickname: body.nickname, timestamp: new Date().toISOString() });
      saveOffline(s); return { ok: true };
    }
    if (url === '/api/comment') {
      const c = { id: Date.now(), nickname: body.nickname, text: body.text, image: body.image || null,
                  timestamp: new Date().toISOString(), reactions: {'❤️':0,'😂':0,'🔥':0,'👍':0}, replies: [] };
      s.comments = s.comments || {}; s.comments[page] = s.comments[page] || []; s.comments[page].push(c);
      saveOffline(s); return c;
    }
    if (url === '/api/react') {
      s.reactions = s.reactions || {}; s.reactions[page] = s.reactions[page] || {};
      s.reactions[page][body.emoji] = (s.reactions[page][body.emoji] || 0) + 1;
      saveOffline(s); return s.reactions[page];
    }
    if (url === '/api/comment/react') {
      (s.comments?.[page] || []).forEach(c => { if (c.id === body.comment_id) {
        c.reactions = c.reactions || {}; c.reactions[body.emoji] = (c.reactions[body.emoji]||0)+1;
      }});
      saveOffline(s); return { ok: true };
    }
    if (url === '/api/reply') {
      (s.comments?.[page] || []).forEach(c => { if (c.id === body.comment_id) {
        c.replies = c.replies || [];
        c.replies.push({ nickname: body.nickname, text: body.text, timestamp: new Date().toISOString() });
      }});
      saveOffline(s); return { ok: true };
    }
    if (url === '/api/admin/auth') {
      const ok = await verifyOfflineAdminPin(body.pin);
      if (!ok) return { ok: false };
      return { ok: true, token: issueOfflineAdminToken() };
    }
    if (url.startsWith('/api/admin/') && !offlineAdminTokenOk(body.token)) {
      return { ok: false, error: 'forbidden' };
    }
    if (url === '/api/admin/set_day_hide') {
      s.hidden = s.hidden || {};
      if (body.hide) s.hidden[page] = { message: body.message || '' };
      else delete s.hidden[page];
      saveOffline(s); return { hidden: body.hide, message: body.message || '' };
    }
    if (url === '/api/admin/delete_comment') {
      if (s.comments?.[page]) s.comments[page] = s.comments[page].filter(c => c.id !== body.comment_id);
      saveOffline(s); return { ok: true };
    }
    if (url === '/api/admin/delete_wishlist') {
      s.wishlist = (s.wishlist || []).filter(w => String(w.id) !== String(body.wishlist_id));
      saveOffline(s); return { ok: true };
    }
    if (url === '/api/admin/edit_wishlist') {
      (s.wishlist || []).forEach(w => { if (String(w.id) === String(body.wishlist_id)) w.text = body.text; });
      saveOffline(s); return { ok: true };
    }
    if (url === '/api/admin/delete_reply') {
      const cmt = s.comments?.[page]?.find(c => String(c.id) === String(body.comment_id));
      if (cmt?.replies) cmt.replies.splice(body.reply_index, 1);
      saveOffline(s); return { ok: true };
    }
    throw e;
  }
}

// ============================================
// Toast + escape
// ============================================
function showToast(msg, type = 'info') {
  let c = document.getElementById('kg-toast-wrap');
  if (!c) { c = document.createElement('div'); c.id = 'kg-toast-wrap'; document.body.appendChild(c); }
  const t = document.createElement('div');
  t.className = 'kg-toast ' + (type || '');
  t.textContent = msg;
  c.appendChild(t);
  requestAnimationFrame(() => t.classList.add('show'));
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 300); }, 2800);
}

function showPopup(msg, { confirmLabel = 'OK', cancelLabel = null, onConfirm = null } = {}) {
  return new Promise(resolve => {
    const bg = document.createElement('div');
    bg.className = 'kg-popup-bg';
    bg.innerHTML = `
      <div class="kg-popup">
        <div class="kg-popup-msg">${msg}</div>
        <div class="kg-popup-btns">
          ${cancelLabel ? `<button class="kg-popup-btn ghost" id="kg-popup-cancel">${cancelLabel}</button>` : ''}
          <button class="kg-popup-btn" id="kg-popup-ok">${confirmLabel}</button>
        </div>
      </div>`;
    document.body.appendChild(bg);
    requestAnimationFrame(() => bg.classList.add('show'));
    const close = (val) => {
      bg.classList.remove('show');
      setTimeout(() => bg.remove(), 280);
      resolve(val);
      if (val && onConfirm) onConfirm();
    };
    bg.querySelector('#kg-popup-ok').onclick = () => close(true);
    bg.querySelector('#kg-popup-cancel')?.addEventListener('click', () => close(false));
    bg.addEventListener('click', e => { if (e.target === bg) close(false); });
  });
}
function esc(s) { const d = document.createElement('div'); d.textContent = s == null ? '' : String(s); return d.innerHTML; }

// ============================================
// Custom cursor
// ============================================
function initCursor() {
  if (matchMedia('(pointer: coarse)').matches) return;
  const dot = document.createElement('div');
  dot.className = 'kg-cursor';
  const ring = document.createElement('div');
  ring.className = 'kg-cursor-ring';
  document.body.appendChild(dot); document.body.appendChild(ring);
  let dx = 0, dy = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => { dx = e.clientX; dy = e.clientY; });
  document.addEventListener('mousedown', () => ring.classList.add('press'));
  document.addEventListener('mouseup', () => ring.classList.remove('press'));
  function tick() {
    rx += (dx - rx) * 0.18; ry += (dy - ry) * 0.18;
    dot.style.transform = `translate(${dx}px, ${dy}px) translate(-50%,-50%)`;
    ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
    requestAnimationFrame(tick);
  }
  tick();
  const hoverSel = 'a, button, input, textarea, [data-cursor="hover"]';
  document.addEventListener('mouseover', e => { if (e.target.closest(hoverSel)) ring.classList.add('hover'); });
  document.addEventListener('mouseout', e => { if (e.target.closest(hoverSel)) ring.classList.remove('hover'); });
}

// ============================================
// Nav
// ============================================
function injectNav(activeLabel) {
  const nav = document.createElement('nav');
  nav.className = 'kg-nav';
  nav.innerHTML = `
    <a class="kg-nav-brand" href="_index.html">
      <span id="kg-brand-dot" title="5× for admin" style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;flex-shrink:0;padding:6px;margin:-6px;cursor:pointer">
        <svg width="22" height="22" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <!-- Red background (fills entire left half by default) -->
          <circle cx="50" cy="50" r="50" fill="#C60C30"/>
          <!-- Blue lower half — S-curve taegeuk -->
          <!-- Large blue half-circle (bottom) -->
          <path d="M100,50 A50,50 0 0,1 0,50 A25,25 0 0,0 50,50 A25,25 0 0,1 100,50 Z" fill="#003478"/>
          <!-- Red small circle top (in blue zone) -->
          <circle cx="50" cy="25" r="12.5" fill="#C60C30"/>
          <!-- Blue small circle bottom (in red zone) -->
          <circle cx="50" cy="75" r="12.5" fill="#003478"/>
        </svg>
      </span>
      <span>${TRIP.name} <em style="font-style:italic;opacity:.6;">${TRIP.year}</em></span>
    </a>
    <div class="kg-nav-links">
      <a href="_index.html" class="${activeLabel==='home'?'active':''}">Calendar</a>
      <a href="_index.html#wishlist" class="${activeLabel==='wish'?'active':''}">Wishlist</a>
      <a href="_index.html#conversation">Conversation</a>
    </div>
  `;
  document.body.prepend(nav);
  window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 30), { passive: true });
}

// ============================================
// Ready
// ============================================
function ready(fn) {
  if (document.readyState !== 'loading') setTimeout(fn, 0);
  else document.addEventListener('DOMContentLoaded', fn);
}
