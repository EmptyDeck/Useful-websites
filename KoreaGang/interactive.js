// ============================================
// KoreaGang — Interactive layer (reactions, comments, admin)
// ============================================

const REACT_EMOJIS = ['❤️', '🔥', '😂', '✈️', '🍜', '🏯', '🫡', '😭', '✅', '😱', '🤮', '🤨'];

let CURRENT_NICK = localStorage.getItem('kg_nick') || '';
// Never auto-select a name — user must pick explicitly
if (CURRENT_NICK === 'Anonymous') { CURRENT_NICK = ''; localStorage.removeItem('kg_nick'); }
let CURRENT_FP = localStorage.getItem('kg_fp') || '';
if (!CURRENT_FP) {
  CURRENT_FP = Math.random().toString(36).slice(2) + Date.now().toString(36);
  localStorage.setItem('kg_fp', CURRENT_FP);
}

function getNick() { return CURRENT_NICK || ''; }
function isAdmin() { return sessionStorage.getItem('kg_admin') === '1' && !!sessionStorage.getItem('kg_admin_token'); }
function getAdminToken() { return sessionStorage.getItem('kg_admin_token') || ''; }

function setPerson(name) {
  // Toggle: clicking active name deselects
  if (CURRENT_NICK === name) {
    CURRENT_NICK = '';
    localStorage.removeItem('kg_nick');
  } else {
    CURRENT_NICK = name;
    localStorage.setItem('kg_nick', name);
  }
  document.querySelectorAll('.kg-person-btn').forEach(b =>
    b.classList.toggle('active', b.dataset.name === CURRENT_NICK && CURRENT_NICK !== '')
  );
  const own = document.getElementById('kg-person-own');
  if (own) { own.value = CURRENT_NICK; }
}

function onPersonInput(e) {
  CURRENT_NICK = e.target.value.slice(0, 30);
  localStorage.setItem('kg_nick', CURRENT_NICK);
  document.querySelectorAll('.kg-person-btn').forEach(b =>
    b.classList.toggle('active', b.dataset.name === CURRENT_NICK)
  );
}

function personRow() {
  // No default selected — user must pick
  return `
    <div class="kg-person">
      <span class="kg-person-lbl">Who are you?</span>
      ${PEOPLE.map(n => `<button class="kg-person-btn${CURRENT_NICK===n?' active':''}" data-name="${n}" onclick="setPerson('${n}')">${n}</button>`).join('')}
      <input class="kg-person-own" id="kg-person-own" type="text" value="${esc(CURRENT_NICK)}" maxlength="30" placeholder="or type your name" oninput="onPersonInput(event)">
    </div>`;
}

function reactBar(page) {
  return `<div class="kg-react" id="kg-react">
    <span class="kg-react-lbl">React</span>
    ${REACT_EMOJIS.map(e => `<button class="kg-rbtn" data-emoji="${e}" onclick="pageReact('${page}','${e}',this)">${e} <span>0</span></button>`).join('')}
  </div>`;
}

async function renderReactions(page) {
  let data = {};
  try { data = await apiGet(`/api/reactions?page=${encodeURIComponent(page)}`); } catch(_) {}
  const voted = JSON.parse(localStorage.getItem('kg_v_'+page) || '{}');
  document.querySelectorAll('#kg-react .kg-rbtn').forEach(btn => {
    const e = btn.dataset.emoji;
    btn.querySelector('span').textContent = data[e] || 0;
    btn.classList.toggle('voted', !!voted[e]);
  });
}

async function pageReact(page, emoji, btn) {
  const voted = JSON.parse(localStorage.getItem('kg_v_'+page) || '{}');
  voted[emoji] = true;
  localStorage.setItem('kg_v_'+page, JSON.stringify(voted));
  btn.classList.add('voted');
  const span = btn.querySelector('span');
  span.textContent = +span.textContent + 1;
  try { await apiPost('/api/react', { page, emoji }); } catch(_) {}
}

function commentForm(page) {
  return `
    ${personRow()}
    ${reactBar(page)}
    <div class="kg-form">
      <textarea id="kg-txt" rows="2" placeholder="Say something, share a tip…"></textarea>
      <div class="kg-form-row">
        <label class="kg-img-btn">📷 Photo<input type="file" id="kg-img" accept="image/*" style="display:none" onchange="previewImg(this)"></label>
        <div id="kg-preview"></div>
        <button class="kg-post-btn" id="kg-post" onclick="postComment('${page}')">Post</button>
      </div>
    </div>
    <div id="kg-list"></div>
  `;
}

function previewImg(inp) {
  const pv = document.getElementById('kg-preview');
  if (!inp.files[0]) { pv.innerHTML=''; return; }
  const r = new FileReader();
  r.onload = e => { pv.innerHTML = `<img src="${e.target.result}"><button onclick="clearImg()">✕</button>`; };
  r.readAsDataURL(inp.files[0]);
}
function clearImg() {
  document.getElementById('kg-preview').innerHTML = '';
  const i = document.getElementById('kg-img'); if (i) i.value = '';
}

function shakePicker() {
  // Shake all kg-person rows visible on the page
  document.querySelectorAll('.kg-person').forEach(el => {
    el.classList.remove('shake');
    void el.offsetWidth; // reflow to restart animation
    el.classList.add('shake');
    setTimeout(() => el.classList.remove('shake'), 600);
  });
}

async function postComment(page) {
  const txt = document.getElementById('kg-txt');
  const text = txt.value.trim();
  let image = null;
  const inp = document.getElementById('kg-img');
  if (inp?.files[0]) {
    image = await new Promise(res => { const r=new FileReader(); r.onload=e=>res(e.target.result); r.readAsDataURL(inp.files[0]); });
  }
  if (!text && !image) { txt.focus(); return; }
  const nick = getNick();
  if (!nick) { shakePicker(); return; }
  const btn = document.getElementById('kg-post');
  if (btn) { btn.disabled = true; btn.textContent = 'Posting…'; }
  try {
    await apiPost('/api/comment', { page, nickname: nick, text, image, fingerprint: CURRENT_FP });
    txt.value=''; clearImg();
    await loadComments(page);
  } catch(_) { showToast('Could not post.', 'error'); }
  finally { if (btn) { btn.disabled=false; btn.textContent='Post'; } }
}

function renderComment(c, page) {
  const when = new Date(c.timestamp).toLocaleString('en-GB', { month:'short', day:'numeric', hour:'2-digit', minute:'2-digit' });
  const reacts = Object.entries(c.reactions || {}).map(([e,n]) =>
    `<button class="kg-crt" onclick="cmtReact('${page}',${c.id},'${e}',this)">${e} <span>${n}</span></button>`
  ).join('');
  const replies = (c.replies || []).map((r, ridx) => `
    <div class="kg-reply">
      <strong>${esc(r.nickname)}</strong>
      <time>${new Date(r.timestamp).toLocaleString('en-GB', { month:'short', day:'numeric', hour:'2-digit', minute:'2-digit' })}</time>
      ${isAdmin() ? `<button class="kg-del" style="font-size:11px" onclick="adminDelReply('${page}',${c.id},${ridx})">✕</button>` : ''}
      <p>${esc(r.text)}</p>
    </div>`).join('');
  const adminDel = isAdmin() ? `<button class="kg-del" onclick="adminDel('${page}',${c.id})" title="Delete">Delete</button>` : '';
  return `
    <div class="kg-cmt" id="cmt-${c.id}">
      <div class="kg-cmt-head">
        <b class="kg-who">${esc(c.nickname)}</b>
        <span class="kg-when">${when}</span>
        ${adminDel}
      </div>
      <div class="kg-cmt-txt">${esc(c.text)}</div>
      ${c.image ? `<img class="kg-cmt-img" src="${c.image}" onclick="lightbox(this.src)">` : ''}
      <div class="kg-cmt-foot">
        <div style="display:flex;gap:6px;flex-wrap:wrap">${reacts}</div>
        <button class="kg-reply-btn" onclick="toggleReply(${c.id})">Reply</button>
      </div>
      <div class="kg-rpl-form" id="rplf-${c.id}">
        <div class="kg-person" style="border:none;padding:6px 0;margin-bottom:6px;flex-wrap:wrap">
          <span class="kg-person-lbl">I am</span>
          ${PEOPLE.map(n => `<button class="kg-person-btn${CURRENT_NICK===n?' active':''}" data-name="${n}" style="font-size:14px;padding:6px 12px" onclick="setPerson('${n}')">${n}</button>`).join('')}
        </div>
        <input id="rpli-${c.id}" placeholder="Write a reply…" onkeydown="if(event.key==='Enter')sendReply('${page}',${c.id})">
        <button class="kg-rpl-send" onclick="sendReply('${page}',${c.id})">Send</button>
      </div>
      ${replies ? `<div class="kg-replies">${replies}</div>` : ''}
    </div>`;
}

async function loadComments(page) {
  const list = document.getElementById('kg-list');
  if (!list) return;
  list.innerHTML = '<div class="kg-loading">Loading…</div>';
  try {
    const data = await apiGet(`/api/comments?page=${encodeURIComponent(page)}`);
    list.innerHTML = data.length
      ? [...data].reverse().map(c => renderComment(c, page)).join('')
      : '<p class="kg-empty">No comments yet. Be the first ✦</p>';
  } catch(_) { list.innerHTML = '<p class="kg-empty">Could not load.</p>'; }
}

function toggleReply(id) {
  const f = document.getElementById(`rplf-${id}`);
  if (!f) return;
  f.classList.toggle('open');
  if (f.classList.contains('open')) f.querySelector('input')?.focus();
}

async function sendReply(page, id) {
  const inp = document.getElementById(`rpli-${id}`);
  const text = inp?.value.trim();
  if (!text) return;
  const nick = getNick();
  if (!nick) {
    // Shake the reply form's person picker
    const rplf = document.getElementById(`rplf-${id}`);
    const picker = rplf?.querySelector('.kg-person');
    if (picker) {
      picker.classList.remove('shake');
      void picker.offsetWidth;
      picker.classList.add('shake');
      setTimeout(() => picker.classList.remove('shake'), 600);
    }
    return;
  }
  await apiPost('/api/reply', { page, comment_id: id, nickname: nick, text });
  inp.value = '';
  await loadComments(page);
}

async function cmtReact(page, id, emoji, btn) {
  await apiPost('/api/comment/react', { page, comment_id: id, emoji });
  const s = btn.querySelector('span');
  s.textContent = +s.textContent + 1;
}

async function adminDel(page, id) {
  await apiPost('/api/admin/delete_comment', { token: getAdminToken(), page, comment_id: id });
  await loadComments(page);
}

async function adminDelReply(page, commentId, replyIndex) {
  await apiPost('/api/admin/delete_reply', { token: getAdminToken(), page, comment_id: commentId, reply_index: replyIndex });
  await loadComments(page);
}

function lightbox(src) {
  const lb = document.createElement('div');
  lb.className = 'kg-lb';
  lb.innerHTML = `<img src="${src}"><div class="kg-lb-close">✕ close</div>`;
  lb.onclick = () => lb.remove();
  document.body.appendChild(lb);
}

// ===== Admin ================================================
let dotClicks = 0, dotTimer = null;
function handleDot() {
  dotClicks++;
  clearTimeout(dotTimer);
  if (dotClicks >= 5) { dotClicks = 0; openAdmin(); return; }
  dotTimer = setTimeout(() => { dotClicks = 0; }, 2000);
}
function openAdmin() {
  if (isAdmin()) { adminLogout(); return; }
  const m = document.createElement('div');
  m.className = 'kg-modal-bg';
  m.innerHTML = `
    <div class="kg-modal">
      <h2>Admin <em>access</em></h2>
      <p>Enter 6-digit PIN</p>
      <div class="kg-pin-row">
        ${[0,1,2,3,4,5].map(i => `<input class="kg-pin-input" type="password" maxlength="1" inputmode="numeric" id="pin${i}" oninput="pinInput(${i})" onkeydown="pinKey(event,${i})">`).join('')}
      </div>
      <div class="kg-pin-err" id="pin-err"></div>
      <div class="kg-modal-btns">
        <button class="btn ghost" onclick="this.closest('.kg-modal-bg').remove()">Cancel</button>
        <button class="btn" onclick="submitPin()">Unlock</button>
      </div>
    </div>`;
  m.addEventListener('click', e => { if (e.target === m) m.remove(); });
  document.body.appendChild(m);
  setTimeout(() => document.getElementById('pin0')?.focus(), 50);
}
function pinInput(i) {
  const el = document.getElementById(`pin${i}`);
  el.value = el.value.replace(/\D/, '');
  if (el.value && i < 5) document.getElementById(`pin${i+1}`)?.focus();
}
function pinKey(e, i) {
  if (e.key === 'Backspace' && !e.target.value && i > 0) document.getElementById(`pin${i-1}`)?.focus();
  if (e.key === 'Enter') submitPin();
}
async function submitPin() {
  const pin = [0,1,2,3,4,5].map(i => document.getElementById(`pin${i}`)?.value || '').join('');
  if (pin.length < 6) return;
  try {
    const r = await apiPost('/api/admin/auth', { pin });
    if (r.ok && r.token) {
      sessionStorage.setItem('kg_admin', '1');
      sessionStorage.setItem('kg_admin_token', r.token);
      sessionStorage.removeItem('kg_admin_pin');
      document.querySelector('.kg-modal-bg')?.remove();
      location.reload();
    } else {
      document.getElementById('pin-err').textContent = 'Wrong PIN.';
      [0,1,2,3,4,5].forEach(i => { const el=document.getElementById(`pin${i}`); if(el) el.value=''; });
      document.getElementById('pin0')?.focus();
    }
  } catch(_) { showToast('Server unreachable.', 'error'); }
}
function adminLogout() {
  sessionStorage.removeItem('kg_admin');
  sessionStorage.removeItem('kg_admin_token');
  sessionStorage.removeItem('kg_admin_pin');
  location.reload();
}

function injectAdminBanner(info) {
  const page = pageId();
  const isIdx = page === '_index';
  const el = document.createElement('div');
  el.className = 'kg-admin-banner';
  if (isIdx) {
    el.innerHTML = `<span class="kg-admin-tag">Admin mode</span>
      <span style="opacity:.6">Index page</span>
      <button class="kg-admin-act" style="margin-left:auto" onclick="adminLogout()">Exit</button>`;
  } else {
    const hidden = !!(info && info.hidden);
    const msg = (info && info.message) || '';
    el.innerHTML = `
      <span class="kg-admin-tag">Admin</span>
      <label class="kg-toggle">
        <input type="checkbox" id="kg-day-toggle" ${hidden?'checked':''} onchange="adminToggleDay(this.checked)">
        <span class="kg-toggle-track"></span>
        <span>${hidden ? 'Sealed' : 'Visible'}</span>
      </label>
      <span style="opacity:.6">Hint:</span>
      <input id="kg-msg" value="${esc(msg)}" placeholder="Secret — hint for guests" maxlength="80" onkeydown="if(event.key==='Enter')adminSaveMsg()">
      <button class="kg-admin-act" onclick="adminSaveMsg()">Save hint</button>
      <button class="kg-admin-act" style="margin-left:auto" onclick="adminLogout()">Exit</button>`;
  }
  document.body.prepend(el);
}

async function adminToggleDay(checked) {
  const page = pageId();
  const msg = document.getElementById('kg-msg')?.value.trim() || '';
  await apiPost('/api/admin/set_day_hide', { token: getAdminToken(), page, hide: checked, message: msg });
  showToast(checked ? 'Day sealed from guests 🔒' : 'Day visible to guests 👁', 'success');
}
async function adminSaveMsg() {
  const page = pageId();
  const t = document.getElementById('kg-day-toggle');
  const msg = document.getElementById('kg-msg')?.value.trim() || '';
  await apiPost('/api/admin/set_day_hide', { token: getAdminToken(), page, hide: !!t?.checked, message: msg });
  showToast('Hint saved ✦', 'success');
}

// ===== Init ================================================
async function initInteractive(pageKey) {
  const root = document.getElementById('kg-interactive');
  if (!root) return;
  root.className = 'kg-interactive';
  root.innerHTML = commentForm(pageKey);
  await renderReactions(pageKey);
  await loadComments(pageKey);

  // Admin dot trigger on brand dot
  const dot = document.getElementById('kg-brand-dot');
  if (dot) dot.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); handleDot(); });

  // Admin banner
  if (isAdmin()) {
    let info = null;
    if (pageKey !== '_index') {
      try { info = await apiGet(`/api/hidden?page=${encodeURIComponent(pageKey)}`); } catch(_) {}
    }
    injectAdminBanner(info);
  }
}
