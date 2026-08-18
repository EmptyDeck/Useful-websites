// DutchPay — Groups Dashboard

const { useState, useEffect, useRef, useCallback } = React;

const I18N = window.DUTCH_I18N || { en: {}, ko: {} };

const TONES = ["#c4502a","#7a8c5c","#4d6b85","#8b6b4d","#6b4d8b","#4d8b6b","#8b4d6b","#5c7a8c","#8c5c7a","#6b8c5c"];

function genId(p) { return p + Date.now().toString(36) + Math.random().toString(36).slice(2,5); }

// ---- Auth ----
const ADMIN_TOKEN_KEY = "dutch-pay.adminToken";
function adminToken() { return localStorage.getItem(ADMIN_TOKEN_KEY) || ""; }
function authFetch(url, opts = {}) {
  return fetch(url, { ...opts, headers: { ...(opts.headers || {}), "X-Auth": adminToken() } });
}
function randomTone(used) {
  const a = TONES.filter(t => !used || !used.includes(t));
  return (a.length ? a : TONES)[Math.floor(Math.random() * (a.length || TONES.length))];
}

// ---- Language context ----
const LangContext = React.createContext("en");
const useLang = () => React.useContext(LangContext);
const useT = () => { const l = useLang(); return I18N[l] || I18N.en; };

// ---- Shared atoms ----
function PersonDot({ name, tone, size = 28 }) {
  return (
    <span style={{
      display:"inline-flex", alignItems:"center", justifyContent:"center",
      width:size, height:size, borderRadius:"50%", background:tone||"#8a8073",
      color:"#fff", fontWeight:600, fontSize:size*0.44, flexShrink:0,
      fontFamily:"Geist, sans-serif", lineHeight:1,
    }}>{(name||"?")[0]}</span>
  );
}

function PaperGrain() {
  return (
    <svg className="grain" aria-hidden="true">
      <filter id="g">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="3"/>
        <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.05 0"/>
      </filter>
      <rect width="100%" height="100%" filter="url(#g)"/>
    </svg>
  );
}

function Sheet({ children, onClose, title }) {
  useEffect(() => {
    const k = e => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", k); document.body.style.overflow = ""; };
  }, [onClose]);
  return (
    <div className="sheet-wrap" onClick={onClose}>
      <div className="sheet" onClick={e => e.stopPropagation()}>
        <div className="sheet-head">
          <div className="sheet-grab"/>
          <div className="sheet-head-row">
            <span className="sheet-title">{title}</span>
            <button className="sheet-x" onClick={onClose}>×</button>
          </div>
        </div>
        <div className="sheet-body">{children}</div>
      </div>
    </div>
  );
}

// ---- PIN Keypad ----
function PinPad({ value, onChange, onSubmit, err, busy }) {
  function press(d) { if (busy) return; onChange((value + d).slice(0, 12)); }
  function back() { if (busy) return; onChange(value.slice(0, -1)); }
  return (
    <div className="pinpad">
      <div className={"pin-dots" + (err ? " pin-err" : "")}>
        {value.length === 0
          ? <span className="pin-empty">· · ·</span>
          : Array.from(value).map((_, i) => <span key={i} className="pin-dot"/>)}
      </div>
      <div className="pin-grid">
        {["1","2","3","4","5","6","7","8","9"].map(k => (
          <button key={k} type="button" className="pin-key" onClick={() => press(k)}>{k}</button>
        ))}
        <button type="button" className="pin-key pin-key-fn" onClick={back}>⌫</button>
        <button type="button" className="pin-key" onClick={() => press("0")}>0</button>
        <button type="button" className="pin-key pin-key-ok" onClick={onSubmit} disabled={busy || !value}>✓</button>
      </div>
    </div>
  );
}

// ---- Lock Gate ----
function LockGate({ title, hint, onSubmit }) {
  const t = useT();
  const [pw, setPw] = useState("");
  const [err, setErr] = useState(false);
  const [busy, setBusy] = useState(false);
  async function submit() {
    if (!pw || busy) return;
    setBusy(true);
    const ok = await onSubmit(pw);
    setBusy(false);
    if (!ok) { setErr(true); setPw(""); }
  }
  useEffect(() => {
    const h = e => {
      if (busy) return;
      if (/^[0-9]$/.test(e.key)) { setPw(p => (p + e.key).slice(0, 12)); setErr(false); }
      else if (e.key === "Backspace") { setPw(p => p.slice(0, -1)); setErr(false); }
      else if (e.key === "Enter") submit();
    };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  });
  return (
    <div className="lock-screen">
      <div className="lock-card">
        <div className="lock-icon">🔒</div>
        <div className="lock-title">{title}</div>
        <div className="lock-hint">{hint}</div>
        <PinPad value={pw} onChange={v => { setPw(v); setErr(false); }} onSubmit={submit} err={err} busy={busy}/>
        <div className="pin-msg">
          {busy ? t.passwordModalChecking : err ? <span className="pw-modal-error">{t.passwordModalWrong}</span> : " "}
        </div>
      </div>
    </div>
  );
}

// ---- Main App ----
function GroupsApp() {
  const [groups, setGroups]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView]       = useState("home");
  const [editGroup, setEditGroup] = useState(null);
  const [toast, setToast]     = useState(null);
  const [lang, setLang]       = useState("en");
  const [hasPassword, setHasPassword] = useState(false);
  const [locked, setLocked]   = useState(false);

  function showToast(msg) { setToast(msg); setTimeout(() => setToast(null), 2600); }

  function loadAll() {
    Promise.all([
      authFetch("/api/groups").catch(() => null),
      fetch("/api/settings").then(r => r.json()).catch(() => ({})),
    ]).then(async ([gr, s]) => {
      setLang(s.language || "en");
      setHasPassword(!!s.hasPassword);
      if (gr && gr.status === 401) { setLocked(true); setLoading(false); return; }
      const gs = gr && gr.ok ? await gr.json() : [];
      setGroups(Array.isArray(gs) ? gs : []);
      setLocked(false);
      setLoading(false);
    });
  }

  async function unlock(pw) {
    try {
      const res = await fetch("/api/auth/admin", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ password:pw }) });
      const d = await res.json();
      if (d.ok && d.token) {
        localStorage.setItem(ADMIN_TOKEN_KEY, d.token);
        setLoading(true);
        loadAll();
        return true;
      }
    } catch {}
    return false;
  }

  useEffect(loadAll, []);

  const t = I18N[lang] || I18N.en;

  async function createGroup(data) {
    try {
      const res = await authFetch("/api/groups", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(data) });
      if (res.status === 401) { setLocked(true); return; }
      const saved = await res.json();
      setGroups(prev => [...prev, saved]);
      setView("home");
      showToast(`"${saved.name}" created!`);
    } catch { alert("Failed to create group. Check server connection."); }
  }

  async function updateGroup(data) {
    const res = await authFetch("/api/groups/update", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(data) });
    if (res.status === 401) { setLocked(true); return; }
    const { password, ...rest } = data;
    setGroups(prev => prev.map(g => g.id === data.id
      ? { ...g, ...rest, hasPassword: password !== undefined ? !!password : g.hasPassword }
      : g));
    setView("home");
  }

  async function deleteGroup(gid, name) {
    const res = await authFetch("/api/groups/delete", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ id:gid }) });
    if (!res.ok) return false;
    setGroups(prev => prev.filter(g => g.id !== gid));
    showToast(`"${name}" deleted.`);
    return true;
  }

  function openGroup(g) {
    window.location.href = `/group.html?gid=${encodeURIComponent(g.id)}&name=${encodeURIComponent(g.name)}`;
  }

  if (locked) return (
    <LangContext.Provider value={lang}>
    <div className="app" data-bg="cream">
      <PaperGrain/>
      <LockGate title={t.adminGateTitle} hint={t.adminGateHint} onSubmit={unlock}/>
    </div>
    </LangContext.Provider>
  );

  return (
    <LangContext.Provider value={lang}>
    <div className="app" data-bg="cream">
      <PaperGrain/>

      <header className="topbar topbar-groups">
        <div className="trip">
          <div className="trip-eyebrow">{t.eyebrow}</div>
          <h1 className="trip-title">
            <span className="title-serif">{t.appTitle}</span><br/>
            <span className="title-sans">{t.groupManagement}<span className="title-amp">·</span></span>
          </h1>
        </div>
        <button className="icon-btn" onClick={() => setView("settings")} title={t.settings}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="12" cy="12" r="3"/>
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
          </svg>
        </button>
      </header>

      <section className="groups-section">
        {loading ? (
          <div className="groups-loading">
            <div className="loading-dots"><span/><span/><span/></div>
            <div>{t.loadingText}</div>
          </div>
        ) : groups.length === 0 ? (
          <div className="groups-empty">
            <div className="empty-exp-title">{t.noGroups}</div>
            <div className="empty-exp-sub">{t.noGroupsHint}</div>
          </div>
        ) : (
          <div className="groups-list">
            {groups.map(g => (
              <GroupCard key={g.id} group={g} onOpen={openGroup}
                onEdit={() => { setEditGroup(g); setView("edit"); }}
                onDelete={deleteGroup} />
            ))}
          </div>
        )}
      </section>

      <button className="fab" onClick={() => setView("create")}>
        <span className="fab-plus">+</span>
        <span className="fab-label">{t.newGroup}</span>
      </button>

      {view === "create" && <GroupForm onClose={() => setView("home")} onSave={createGroup} />}
      {view === "edit" && editGroup && (
        <GroupForm group={editGroup} onClose={() => { setView("home"); setEditGroup(null); }} onSave={updateGroup} />
      )}
      {view === "settings" && (
        <SettingsSheet onClose={() => { setView("home"); loadAll(); }} />
      )}

      {toast && <div className="toast">{toast}</div>}
    </div>
    </LangContext.Provider>
  );
}

// ---- Group Card ----
function GroupCard({ group, onOpen, onEdit, onDelete }) {
  const t = useT();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const members = group.members || [];
  const expCount = group.expenseCount || 0;
  const groupLang = group.language;
  const displayLang = useLang();
  const effectiveLang = groupLang || displayLang;
  const gt = I18N[effectiveLang] || I18N.en;

  async function handleDelete() {
    const ok = await onDelete(group.id, group.name);
    if (ok) setConfirmDelete(false);
  }

  return (
    <div className="group-card">
      <div className="group-card-main" onClick={() => onOpen(group)}>
        <div className="group-card-header">
          <div className="group-card-name">{group.name}{group.hasPassword && <span className="group-lock" title={t.groupPasswordLabel}>🔒</span>}</div>
          <div className="group-card-meta">
            {gt.membersUnit(members.length)} · {gt.expensesUnit(expCount)}
            {groupLang && groupLang !== displayLang && (
              <span className="group-lang-badge">{I18N[groupLang]?.langName}</span>
            )}
          </div>
        </div>
        <div className="group-members-row">
          {members.slice(0,7).map(m => <PersonDot key={m.id} name={m.name} tone={m.tone} size={30}/>)}
          {members.length > 7 && <span className="group-members-more">+{members.length-7}</span>}
          {members.length === 0 && <span className="group-members-empty">—</span>}
        </div>
      </div>

      <div className="group-card-actions">
        <button className="group-action-btn" onClick={e => { e.stopPropagation(); onEdit(); }} title={t.editGroup}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
        </button>
        <button className="group-action-btn group-action-del"
          onClick={e => { e.stopPropagation(); setConfirmDelete(true); }}
          title={t.deleteGroup}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
          </svg>
        </button>
      </div>

      {confirmDelete && (
        <div className="group-confirm-delete" onClick={e => e.stopPropagation()}>
          <div className="confirm-msg">
            <strong>"{group.name}"</strong><br/>
            <span className="confirm-warn">{t.deleteGroupWarn}</span>
          </div>
          <div className="confirm-btn-row">
            <button className="btn btn-ghost btn-sm" onClick={() => setConfirmDelete(false)}>Cancel</button>
            <button className="btn btn-danger btn-sm" onClick={handleDelete}>{t.deleteGroup}</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ---- Group Form ----
function GroupForm({ group, onClose, onSave }) {
  const t = useT();
  const globalLang = useLang();
  const isEdit = !!group;
  const [name, setName]           = useState(group?.name || "");
  const [members, setMembers]     = useState(group?.members || []);
  const [newMemberName, setNew]   = useState("");
  const [hub, setHub]             = useState(group?.settlementHub || "");
  const [groupLang, setGroupLang] = useState(group?.language ?? null);
  const [gpw, setGpw]             = useState("");
  const [removePw, setRemovePw]   = useState(false);
  const hasPw = !!group?.hasPassword;
  const ref = useRef();

  function addMember() {
    const n = newMemberName.trim(); if (!n) return;
    const id = genId("m");
    const m = { id, name:n, tone:randomTone(members.map(m=>m.tone)) };
    setMembers(prev => { const next=[...prev,m]; if(!hub) setHub(id); return next; });
    setNew(""); setTimeout(() => ref.current?.focus(), 50);
  }

  function removeMember(id) {
    setMembers(prev => { const next=prev.filter(m=>m.id!==id); if(hub===id) setHub(next[0]?.id||""); return next; });
  }

  function save() {
    if (!name.trim() || members.length === 0) return;
    const data = { id: group?.id||genId("g"), name:name.trim(), members, settlementHub:hub||members[0]?.id||"", language:groupLang };
    if (gpw.trim()) data.password = gpw.trim();
    else if (removePw) data.password = "";
    onSave(data);
  }

  const langOptions = [
    { val:null, label:t.useGlobal },
    { val:"en", label:"English" },
    { val:"ko", label:"한국어" },
  ];

  return (
    <Sheet onClose={onClose} title={isEdit ? t.editGroupTitle : t.createGroup}>
      <div className="form">
        <label className="field field-big">
          <span className="field-k">{t.groupName}</span>
          <input className="field-input" placeholder={t.groupNamePlaceholder} value={name} onChange={e=>setName(e.target.value)} autoFocus={!isEdit}/>
        </label>

        <div className="field">
          <span className="field-k">{t.addMemberLabel}</span>
          <div className="member-add-row">
            <input ref={ref} className="field-input member-input" placeholder={t.memberNamePlaceholder}
              value={newMemberName} onChange={e=>setNew(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addMember()}/>
            <button type="button" className="btn btn-ghost btn-sm" onClick={addMember}>{t.add}</button>
          </div>
          {members.length > 0 && (
            <div className="member-list">
              {members.map(m => (
                <div key={m.id} className="member-row">
                  <PersonDot name={m.name} tone={m.tone} size={32}/>
                  <input className="member-name-input" value={m.name}
                    onChange={e => setMembers(prev=>prev.map(p=>p.id===m.id?{...p,name:e.target.value}:p))}/>
                  <div className="member-tones">
                    {TONES.map(tn=>(
                      <button key={tn} type="button" className={"tone-dot"+(m.tone===tn?" tone-on":"")}
                        style={{background:tn}} onClick={()=>setMembers(prev=>prev.map(p=>p.id===m.id?{...p,tone:tn}:p))}/>
                    ))}
                  </div>
                  <button type="button" className="member-remove" onClick={()=>removeMember(m.id)}>✕</button>
                </div>
              ))}
            </div>
          )}
          {members.length === 0 && <div className="field-hint">{t.noMembersHint}</div>}
        </div>

        {members.length > 1 && (
          <div className="field">
            <span className="field-k">{t.settlementHub}</span>
            <div className="chip-row">
              {members.map(m => (
                <button key={m.id} type="button"
                  className={"chip chip-md"+(hub===m.id?" chip-on":"")}
                  style={hub===m.id?{"--tone":m.tone}:{}} onClick={()=>setHub(m.id)}>
                  <PersonDot name={m.name} tone={m.tone} size={24}/>
                  <span className="chip-name">{m.name}</span>
                </button>
              ))}
            </div>
            <div className="field-hint">{t.settlementHubHint}</div>
          </div>
        )}

        <div className="field">
          <span className="field-k">{t.groupLanguage}</span>
          <div className="lang-btn-row">
            {langOptions.map(opt => (
              <button key={String(opt.val)} type="button"
                className={"lang-option-btn"+(groupLang===opt.val?" lang-option-on":"")}
                onClick={()=>setGroupLang(opt.val)}>
                {opt.label}
                {opt.val===null && globalLang && <span className="lang-option-sub"> ({I18N[globalLang]?.langName})</span>}
              </button>
            ))}
          </div>
          <div className="field-hint">{t.groupLanguageHint}</div>
        </div>

        <div className="field">
          <span className="field-k">{t.groupPasswordLabel}</span>
          <input type="password" className="field-input" inputMode="numeric"
            placeholder={isEdit && hasPw ? t.groupPasswordKeep : t.groupPasswordPlaceholder}
            value={gpw} onChange={e => { const v = e.target.value.replace(/\D/g, ""); setGpw(v); if (v) setRemovePw(false); }}/>
          <div className="field-hint">{t.groupPasswordHint}</div>
          {isEdit && hasPw && (
            <label className="pw-remove-row">
              <input type="checkbox" checked={removePw} onChange={e => setRemovePw(e.target.checked)}/>
              {t.groupPwRemove}
            </label>
          )}
        </div>

        <div className="form-foot">
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" disabled={!name.trim()||members.length===0} onClick={save}>
            {isEdit ? t.editGroupTitle.replace("Edit ","Save ") : t.createGroup}
          </button>
        </div>
      </div>
    </Sheet>
  );
}

// ---- Settings Sheet ----
function SettingsSheet({ onClose }) {
  const t = useT();
  const [tab, setTab]           = useState("password");
  const [serverSettings, setSS] = useState(null);

  useEffect(() => {
    fetch("/api/settings").then(r=>r.json()).then(setSS).catch(()=>setSS({}));
  }, []);

  const tabs = [
    { id:"password", label:t.tabPassword },
    { id:"rates",    label:t.tabRates },
    { id:"language", label:t.tabLanguage },
    { id:"about",    label:t.tabAbout },
  ];

  return (
    <Sheet onClose={onClose} title={t.settings}>
      <div className="settings-tabs">
        {tabs.map(tab_ => (
          <button key={tab_.id}
            className={"settings-tab"+(tab===tab_.id?" tab-on":"")}
            onClick={()=>setTab(tab_.id)}>{tab_.label}</button>
        ))}
      </div>
      <div className="settings-body">
        {!serverSettings ? (
          <div style={{padding:"20px",color:"var(--ink-3)",textAlign:"center"}}>{t.loadingText}</div>
        ) : (
          <>
            {tab==="password" && <PasswordSettings hasPassword={serverSettings.hasPassword}/>}
            {tab==="rates"    && <RateSettings fallbackRates={serverSettings.fallbackRates||{KRW:1,USD:1400,EUR:1600}}/>}
            {tab==="language" && <LanguageSettings currentLang={serverSettings.language||"en"} onSaved={setSS}/>}
            {tab==="about"    && <AboutTab/>}
          </>
        )}
      </div>
    </Sheet>
  );
}

function PasswordSettings({ hasPassword }) {
  const t = useT();
  const [oldPw, setOldPw]     = useState("");
  const [newPw, setNewPw]     = useState("");
  const [cnfPw, setCnfPw]     = useState("");
  const [msg, setMsg]         = useState(null);
  const [saving, setSaving]   = useState(false);

  async function save() {
    if (newPw !== cnfPw) { setMsg({ err:true, text:t.passwordMismatch }); return; }
    setSaving(true);
    try {
      const res = await fetch("/api/settings", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ oldPassword:oldPw, newPassword:newPw }) });
      const d = await res.json();
      if (d.ok) { setMsg({ err:false, text:newPw?t.passwordChanged:t.passwordRemoved }); setOldPw(""); setNewPw(""); setCnfPw(""); }
      else if (d.error==="wrong_password") setMsg({ err:true, text:t.passwordWrongOld });
    } finally { setSaving(false); }
  }

  return (
    <div className="settings-section">
      <div className="settings-hint">{hasPassword ? t.passwordOn : t.passwordOff}</div>
      {hasPassword && (
        <label className="field"><span className="field-k">{t.currentPassword}</span>
          <input type="password" className="field-input" inputMode="numeric" value={oldPw} onChange={e=>setOldPw(e.target.value.replace(/\D/g,""))}/></label>
      )}
      <label className="field"><span className="field-k">{t.newPassword}</span>
        <input type="password" className="field-input" inputMode="numeric" placeholder={t.newPasswordPlaceholder} value={newPw} onChange={e=>setNewPw(e.target.value.replace(/\D/g,""))}/></label>
      <label className="field"><span className="field-k">{t.confirmPassword}</span>
        <input type="password" className="field-input" inputMode="numeric" value={cnfPw} onChange={e=>setCnfPw(e.target.value.replace(/\D/g,""))} onKeyDown={e=>e.key==="Enter"&&save()}/></label>
      {msg && <div className={"settings-msg"+(msg.err?" msg-err":" msg-ok")}>{msg.text}</div>}
      <button className="btn btn-primary" onClick={save} disabled={saving}>{saving?t.saving:t.changePassword}</button>
    </div>
  );
}

function RateSettings({ fallbackRates }) {
  const t = useT();
  const [usd, setUsd] = useState(String(fallbackRates.USD||1400));
  const [eur, setEur] = useState(String(fallbackRates.EUR||1600));
  const [msg, setMsg] = useState(null);

  async function save() {
    const u=parseFloat(usd), e=parseFloat(eur);
    if (!u||!e||u<=0||e<=0) { setMsg({ err:true, text:t.ratesInvalid }); return; }
    const res = await fetch("/api/settings", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ fallbackRates:{ KRW:1,USD:u,EUR:e } }) });
    const d = await res.json();
    if (d.ok) setMsg({ err:false, text:t.ratesSaved });
  }

  return (
    <div className="settings-section">
      <div className="settings-hint" style={{whiteSpace:"pre-line"}}>{t.ratesHint}</div>
      <label className="field"><span className="field-k">{t.usdRate}</span>
        <input type="number" className="field-input" value={usd} onChange={e=>setUsd(e.target.value)} min="1" step="1"/></label>
      <label className="field"><span className="field-k">{t.eurRate}</span>
        <input type="number" className="field-input" value={eur} onChange={e=>setEur(e.target.value)} min="1" step="1"/></label>
      {msg && <div className={"settings-msg"+(msg.err?" msg-err":" msg-ok")}>{msg.text}</div>}
      <button className="btn btn-primary" onClick={save}>{t.saveRates}</button>
    </div>
  );
}

function LanguageSettings({ currentLang, onSaved }) {
  const t = useT();
  const [selected, setSelected] = useState(currentLang);
  const [msg, setMsg] = useState(null);

  async function save(lang) {
    setSelected(lang);
    const res = await fetch("/api/settings", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ language:lang }) });
    const d = await res.json();
    if (d.ok) {
      setMsg({ err:false, text:(I18N[lang]||I18N.en).languageSaved });
      onSaved(prev => ({ ...prev, language:lang }));
      // Reload page so UI updates to new language
      setTimeout(() => window.location.reload(), 800);
    }
  }

  return (
    <div className="settings-section">
      <div className="settings-hint">{t.globalLanguageHint}</div>
      <div className="lang-btn-row lang-btn-row-lg">
        <button className={"lang-option-btn"+(selected==="en"?" lang-option-on":"")} onClick={()=>save("en")}>
          <span className="lang-flag">🇺🇸</span> English
        </button>
        <button className={"lang-option-btn"+(selected==="ko"?" lang-option-on":"")} onClick={()=>save("ko")}>
          <span className="lang-flag">🇰🇷</span> 한국어
        </button>
      </div>
      {msg && <div className={"settings-msg"+(msg.err?" msg-err":" msg-ok")}>{msg.text}</div>}
    </div>
  );
}

function AboutTab() {
  const t = useT();
  return (
    <div className="settings-section">
      {[
        [t.aboutName],
        ["Exchange rates", t.aboutRates],
        ["Storage", t.aboutStorage],
      ].filter(r=>r.length>0).map(([v,sub],i) => (
        <div key={i} className="about-item">
          <div className="about-v">{v}</div>
          {sub && <div className="about-k">{sub}</div>}
        </div>
      ))}
      <div className="about-item">
        <div className="about-v">Features</div>
        <div className="about-k" style={{fontSize:12,color:"var(--ink-3)",marginTop:2,lineHeight:1.5}}>{t.aboutFeatures}</div>
      </div>
    </div>
  );
}

// Mount
ReactDOM.createRoot(document.getElementById("root")).render(<GroupsApp/>);
