// DutchPay — Group Expense App

const { useState, useMemo, useEffect, useRef } = React;

const I18N       = window.DUTCH_I18N      || { en:{}, ko:{} };
const CATS_DATA  = window.DUTCH_CATS_DATA || [];

const _p = new URLSearchParams(window.location.search);
const GROUP_ID = _p.get("gid");
if (!GROUP_ID) { window.location.replace("/"); }

// ---- Auth ----
const ADMIN_TOKEN_KEY = "dutch-pay.adminToken";
const GROUP_TOKEN_KEY = `dutch-pay.groupToken.${GROUP_ID}`;
function authToken(){ return localStorage.getItem(GROUP_TOKEN_KEY) || localStorage.getItem(ADMIN_TOKEN_KEY) || ""; }
function authFetch(url, opts = {}){ return fetch(url, { ...opts, headers: { ...(opts.headers||{}), "X-Auth": authToken() } }); }

const CURRENCIES = [
  { code:"KRW", symbol:"₩", label:"Won",  decimals:0 },
  { code:"USD", symbol:"$", label:"USD",  decimals:2 },
  { code:"EUR", symbol:"€", label:"EUR",  decimals:2 },
];
const ccyMeta = c => CURRENCIES.find(x=>x.code===c)||CURRENCIES[0];
const BASE = "KRW";

const TONES = ["#c4502a","#7a8c5c","#4d6b85","#8b6b4d","#6b4d8b","#4d8b6b","#8b4d6b","#5c7a8c","#8c5c7a","#6b8c5c"];
function genId(p) { return p+Date.now().toString(36)+Math.random().toString(36).slice(2,5); }
function randomTone(used) { const a=TONES.filter(t=>!used||!used.includes(t)); return(a.length?a:TONES)[Math.floor(Math.random()*(a.length||TONES.length))]; }
function getCats(lang) { return CATS_DATA.map(c=>({ id:c.id, label:lang==="ko"?c.ko:c.en, glyph:lang==="ko"?c.koGlyph:c.enGlyph })); }

// ---- Language context ----
const LangContext = React.createContext("en");
const useLang = () => React.useContext(LangContext);
const useT    = () => { const l=useLang(); return I18N[l]||I18N.en; };

// ---- Math helpers ----
function convert(v,from,to,rates){if(!from)from=BASE;if(!to)to=BASE;if(from===to)return v;return v*(rates[from]||1)/(rates[to]||1);}
function fmt(v,ccy,rates,dccy){const tg=dccy||ccy||BASE;const cv=convert(v,ccy||BASE,tg,rates);const m=ccyMeta(tg);const r=m.decimals===0?Math.round(cv):Math.round(cv*100)/100;return m.symbol+r.toLocaleString(undefined,{minimumFractionDigits:m.decimals,maximumFractionDigits:m.decimals});}
function fmtShort(v,ccy,rates,dccy){const tg=dccy||ccy||BASE;const cv=convert(v,ccy||BASE,tg,rates);const m=ccyMeta(tg);const abs=Math.abs(cv);if(tg==="KRW"&&abs>=100000)return m.symbol+Math.round(cv/1000)+"k";if(tg!=="KRW"&&abs>=10000)return m.symbol+(cv/1000).toFixed(1)+"k";const r=m.decimals===0?Math.round(cv):Math.round(cv*100)/100;return m.symbol+r.toLocaleString(undefined,{minimumFractionDigits:m.decimals,maximumFractionDigits:m.decimals});}

function relTimeT(t, d){
  if(!d) return "";
  const s=(Date.now()-d.getTime())/1000;
  if(s<30)  return t.relJustNow;
  if(s<60)  return t.relSec(Math.floor(s));
  if(s<3600)return t.relMin(Math.floor(s/60));
  if(s<86400)return t.relHour(Math.floor(s/3600));
  return t.relDay(Math.floor(s/86400));
}

function formatWhenT(t, dateStr) {
  const d = dateStr ? new Date(dateStr) : new Date();
  return (t.formatWhen || (d=>d.toLocaleString("en-US",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit",hour12:false})))(d);
}

function todayInputValue(){ const d=new Date(); return d.toISOString().slice(0,16); }

// ---- Balance calc ----
function computeBalances(expenses,people,rates){
  const bal=Object.fromEntries(people.map(p=>[p.id,0]));
  for(const e of expenses){
    if(!e||!e.paidBy||!Array.isArray(e.split)||e.split.length===0) continue;
    if(bal[e.paidBy]==null) bal[e.paidBy]=0;
    const ab=convert(e.amount,e.ccy||BASE,BASE,rates);
    const sh=ab/e.split.length;
    bal[e.paidBy]+=ab;
    for(const pid of e.split){ if(bal[pid]==null) bal[pid]=0; bal[pid]-=sh; }
  }
  return bal;
}
function settlements(bal,hub){
  const out=[];
  for(const[id,v] of Object.entries(bal)){
    if(id===hub) continue;
    if(v<-0.5) out.push({from:id,to:hub,amount:-v});
    else if(v>0.5) out.push({from:hub,to:id,amount:v});
  }
  return out.sort((a,b)=>b.amount-a.amount);
}

// ---- Live rates ----
const FALLBACK_RATES={KRW:1,USD:1400,EUR:1600};
const RATE_CACHE_KEY="dutch-pay.rates";
function readRateCache(){try{const c=JSON.parse(localStorage.getItem(RATE_CACHE_KEY)||"null");if(!c||!c.rates)return null;return{rates:{...FALLBACK_RATES,...c.rates},updatedAt:c.updatedAt?new Date(c.updatedAt):null};}catch{return null;}}

function useLiveRates(){
  const [state,setState]=useState(()=>{const c=readRateCache();if(c)return{rates:c.rates,status:"cached",updatedAt:c.updatedAt};return{rates:FALLBACK_RATES,status:"loading",updatedAt:null};});
  useEffect(()=>{
    let alive=true;
    async function refresh(){
      setState(p=>({...p,status:p.status==="loading"?"loading":"refreshing"}));
      try{
        const res=await fetch("/api/rates",{cache:"no-store"});
        if(!res.ok) throw new Error();
        const data=await res.json();
        const nr={...FALLBACK_RATES,...(data.rates||{})};
        const isLive=data.source!=="fallback";
        const ua=data.updatedAt?new Date(data.updatedAt):new Date();
        if(!alive) return;
        if(isLive) localStorage.setItem(RATE_CACHE_KEY,JSON.stringify({rates:nr,updatedAt:ua.toISOString()}));
        setState({rates:nr,status:isLive?"live":"offline",updatedAt:ua});
      }catch{
        if(!alive) return;
        const c=readRateCache();
        if(c) setState({rates:c.rates,status:"cached",updatedAt:c.updatedAt});
        else setState({rates:FALLBACK_RATES,status:"offline",updatedAt:null});
      }
    }
    refresh();
    const id=setInterval(refresh,60*60*1000);
    return()=>{alive=false;clearInterval(id);};
  },[]);
  return state;
}

// ---- Contexts ----
const CcyContext=React.createContext({rates:FALLBACK_RATES,displayCcy:BASE,setDisplayCcy:()=>{},status:"loading",updatedAt:null});
const useCcy=()=>React.useContext(CcyContext);

// ---- API ----
const API={
  async getExpenses(){const r=await authFetch(`/api/groups/${GROUP_ID}/expenses`);return r.ok?r.json():[];},
  async addExpense(e){const r=await authFetch(`/api/groups/${GROUP_ID}/expenses`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});return r.ok?r.json():null;},
  async deleteExpense(id){await authFetch(`/api/groups/${GROUP_ID}/expenses/delete`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id})});},
  async editExpense(p){await authFetch(`/api/groups/${GROUP_ID}/expenses/edit`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(p)});},
  async updateGroup(d){const r=await authFetch("/api/groups/update",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:GROUP_ID,...d})});return r.ok?r.json().catch(()=>({})):{};},
  async getSettings(){const r=await fetch("/api/settings");return r.ok?r.json():{};},
  async verifyPassword(pw){const r=await fetch("/api/settings/verify-password",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:pw})});const d=await r.json();return d.ok;},
  async unlockGroup(pw){
    const r=await fetch("/api/auth/group",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:GROUP_ID,password:pw})});
    const d=await r.json().catch(()=>({}));
    if(d.ok&&d.token){localStorage.setItem(d.scope==="admin"?ADMIN_TOKEN_KEY:GROUP_TOKEN_KEY,d.token);return true;}
    return false;
  },
  async unlockAdmin(pw){
    const r=await fetch("/api/auth/admin",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:pw})});
    const d=await r.json().catch(()=>({}));
    if(d.ok&&d.token){localStorage.setItem(ADMIN_TOKEN_KEY,d.token);return true;}
    return false;
  },
};

// ---- Atoms ----
function PersonDotG({id,people,size=22}){
  const p=people.find(p=>p.id===id)||{name:id||"?",tone:"#8a8073"};
  return <span className="dot" style={{width:size,height:size,background:p.tone,fontSize:size*0.42}}>{(p.name||"?")[0]}</span>;
}
function PersonChipG({id,people,selected,onClick,size="md",showName=true,disabled=false}){
  const p=people.find(p=>p.id===id); if(!p) return null;
  return(
    <button type="button" className={"chip chip-"+size+(selected?" chip-on":"")+(disabled?" chip-disabled":"")}
      onClick={disabled?undefined:onClick} style={selected?{"--tone":p.tone}:{}}>
      <PersonDotG id={id} people={people} size={size==="lg"?28:size==="sm"?20:24}/>
      {showName&&<span className="chip-name">{p.name}</span>}
    </button>
  );
}
function CatGlyphLang({id,lang,size=32}){
  const cats=getCats(lang);
  const c=cats.find(c=>c.id===id)||cats[cats.length-1]||{glyph:"?"};
  return <span className="cat-glyph" style={{width:size,height:size,fontSize:size*0.5}}>{c.glyph}</span>;
}
function PaperGrain(){return(<svg className="grain" aria-hidden="true"><filter id="g"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="3"/><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.05 0"/></filter><rect width="100%" height="100%" filter="url(#g)"/></svg>);}

// ---- PIN Keypad ----
function PinPad({value,onChange,onSubmit,err,busy}){
  function press(d){if(busy)return;onChange((value+d).slice(0,12));}
  function back(){if(busy)return;onChange(value.slice(0,-1));}
  return(
    <div className="pinpad">
      <div className={"pin-dots"+(err?" pin-err":"")}>
        {value.length===0
          ?<span className="pin-empty">· · ·</span>
          :Array.from(value).map((_,i)=><span key={i} className="pin-dot"/>)}
      </div>
      <div className="pin-grid">
        {["1","2","3","4","5","6","7","8","9"].map(k=>(
          <button key={k} type="button" className="pin-key" onClick={()=>press(k)}>{k}</button>
        ))}
        <button type="button" className="pin-key pin-key-fn" onClick={back}>⌫</button>
        <button type="button" className="pin-key" onClick={()=>press("0")}>0</button>
        <button type="button" className="pin-key pin-key-ok" onClick={onSubmit} disabled={busy||!value}>✓</button>
      </div>
    </div>
  );
}

function usePinKeyboard(setPw,setErr,submit,busy,onCancel){
  useEffect(()=>{
    const h=e=>{
      if(busy)return;
      if(/^[0-9]$/.test(e.key)){setPw(p=>(p+e.key).slice(0,12));setErr(false);}
      else if(e.key==="Backspace"){setPw(p=>p.slice(0,-1));setErr(false);}
      else if(e.key==="Enter")submit();
      else if(e.key==="Escape"&&onCancel)onCancel();
    };
    document.addEventListener("keydown",h);
    return()=>document.removeEventListener("keydown",h);
  });
}

// ---- Password Modal ----
function PasswordModal({onConfirm,onCancel,verify,title,hint}){
  const t=useT();
  const[pw,setPw]=useState("");const[err,setErr]=useState(false);const[loading,setLoading]=useState(false);
  async function submit(){
    if(!pw||loading)return;setLoading(true);
    const ok=await (verify||API.verifyPassword)(pw);setLoading(false);
    if(ok)onConfirm();else{setErr(true);setPw("");}
  }
  usePinKeyboard(setPw,setErr,submit,loading,onCancel);
  return(
    <div className="pw-modal-wrap" onClick={onCancel}>
      <div className="pw-modal" onClick={e=>e.stopPropagation()}>
        <div className="pw-modal-title">{title||t.passwordModalTitle}</div>
        {hint&&<div className="lock-hint">{hint}</div>}
        <PinPad value={pw} onChange={v=>{setPw(v);setErr(false);}} onSubmit={submit} err={err} busy={loading}/>
        <div className="pin-msg">
          {loading?t.passwordModalChecking:err?<span className="pw-modal-error">{t.passwordModalWrong}</span>:" "}
        </div>
        <div className="pw-modal-btns">
          <button className="btn btn-ghost btn-sm" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

// ---- Lock Gate ----
function LockGate({title,hint,onSubmit}){
  const t=useT();
  const[pw,setPw]=useState("");const[err,setErr]=useState(false);const[busy,setBusy]=useState(false);
  async function submit(){
    if(!pw||busy)return;setBusy(true);
    const ok=await onSubmit(pw);setBusy(false);
    if(!ok){setErr(true);setPw("");}
  }
  usePinKeyboard(setPw,setErr,submit,busy,null);
  return(
    <div className="lock-screen">
      <div className="lock-card">
        <div className="lock-icon">🔒</div>
        <div className="lock-title">{title}</div>
        <div className="lock-hint">{hint}</div>
        <PinPad value={pw} onChange={v=>{setPw(v);setErr(false);}} onSubmit={submit} err={err} busy={busy}/>
        <div className="pin-msg">
          {busy?t.passwordModalChecking:err?<span className="pw-modal-error">{t.passwordModalWrong}</span>:" "}
        </div>
      </div>
    </div>
  );
}

// ---- Sheet ----
function Sheet({children,onClose,title}){
  useEffect(()=>{const k=e=>{if(e.key==="Escape")onClose();};document.addEventListener("keydown",k);document.body.style.overflow="hidden";return()=>{document.removeEventListener("keydown",k);document.body.style.overflow="";};},[onClose]);
  return(
    <div className="sheet-wrap" onClick={onClose}>
      <div className="sheet" onClick={e=>e.stopPropagation()}>
        <div className="sheet-head"><div className="sheet-grab"/>
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

// ---- Main App ----
function App(){
  const[group,setGroup]=useState(null);
  const[expenses,setExpenses]=useState([]);
  const[editTarget,setEditTarget]=useState(null);
  const[view,setView]=useState("home");
  const[activePerson,setActivePerson]=useState(null);
  const[confirmation,setConfirmation]=useState(null);
  const[displayCcy,setDisplayCcyRaw]=useState(()=>localStorage.getItem("dutch-pay.displayCcy")||"KRW");
  const[meId,setMeId]=useState(()=>localStorage.getItem(`dutch-pay.me.${GROUP_ID}`)||"");
  const[hasPassword,setHasPassword]=useState(false);
  const[locked,setLocked]=useState(false);
  const[backPw,setBackPw]=useState(false);
  const[searchQuery,setSearch]=useState("");
  const[filterCat,setFilterCat]=useState("");
  const[sortOrder,setSortOrder]=useState("newest");
  const[groupLoaded,setGroupLoaded]=useState(false);
  const[effectiveLang,setEffectiveLang]=useState("en");
  const[,tick]=useState(0);

  const{rates,status,updatedAt}=useLiveRates();

  useEffect(()=>{const id=setInterval(()=>tick(x=>x+1),30000);return()=>clearInterval(id);},[]);

  async function loadData(){
    const s=await API.getSettings();
    setHasPassword(s?.hasPassword||false);
    const r=await authFetch(`/api/groups/${GROUP_ID}`);
    if(r.status===401){
      setEffectiveLang(s?.language||"en");
      setLocked(true);setGroupLoaded(true);
      return;
    }
    const g=r.ok?await r.json():null;
    const exps=await API.getExpenses();
    if(g){
      setGroup(g);
      const lang=g.language||s?.language||"en";
      setEffectiveLang(lang);
      if(!meId||!g.members.find(m=>m.id===meId)){const fid=g.members[0]?.id||"";setMeId(fid);localStorage.setItem(`dutch-pay.me.${GROUP_ID}`,fid);}
    }
    if(Array.isArray(exps)) setExpenses(exps);
    setLocked(false);
    setGroupLoaded(true);
  }

  useEffect(()=>{loadData();},[]);

  async function handleBack(){
    // 관리자 토큰이 유효하면(또는 비밀번호 미설정이면) 바로 이동, 아니면 비밀번호 입력
    try{
      const r=await fetch("/api/groups",{headers:{"X-Auth":localStorage.getItem(ADMIN_TOKEN_KEY)||""}});
      if(r.ok){window.location.href="/";return;}
      localStorage.removeItem(ADMIN_TOKEN_KEY);
    }catch{}
    setBackPw(true);
  }

  const t=I18N[effectiveLang]||I18N.en;
  const CATS=getCats(effectiveLang);
  const people=group?.members||[];
  const hub=group?.settlementHub||people[0]?.id||"";

  function setMe(id){setMeId(id);localStorage.setItem(`dutch-pay.me.${GROUP_ID}`,id);}
  function setDisplayCcy(v){setDisplayCcyRaw(v);localStorage.setItem("dutch-pay.displayCcy",v);}

  const realExpenses=useMemo(()=>expenses.filter(e=>!e._deleted),[expenses]);
  const balances=useMemo(()=>computeBalances(realExpenses,people,rates),[realExpenses,people,rates]);
  const total=useMemo(()=>realExpenses.filter(e=>!e.isSettlement).reduce((s,e)=>s+convert(e.amount,e.ccy||BASE,BASE,rates),0),[realExpenses,rates]);
  const settles=useMemo(()=>settlements(balances,hub),[balances,hub]);
  const me=people.find(p=>p.id===meId)?meId:people[0]?.id||"";
  const myBalance=balances[me]||0;

  const filteredExpenses=useMemo(()=>{
    let list=[...realExpenses];
    if(searchQuery.trim()){const q=searchQuery.trim().toLowerCase();list=list.filter(e=>e.title?.toLowerCase().includes(q)||e.notes?.toLowerCase().includes(q));}
    if(filterCat) list=list.filter(e=>e.cat===filterCat);
    if(sortOrder==="newest") list.sort((a,b)=>(b._ts||0)-(a._ts||0));
    else if(sortOrder==="oldest") list.sort((a,b)=>(a._ts||0)-(b._ts||0));
    else if(sortOrder==="amount_desc") list.sort((a,b)=>convert(b.amount,b.ccy,BASE,rates)-convert(a.amount,a.ccy,BASE,rates));
    else if(sortOrder==="amount_asc") list.sort((a,b)=>convert(a.amount,a.ccy,BASE,rates)-convert(b.amount,b.ccy,BASE,rates));
    return list;
  },[realExpenses,searchQuery,filterCat,sortOrder,rates]);

  function showToast(kind,extra){setConfirmation({kind,...extra});setTimeout(()=>setConfirmation(null),2400);}

  async function addExpense(e){
    const entry={...e,id:genId("e"),when:formatWhenT(t,e.dateInput),_ts:e.dateInput?new Date(e.dateInput).getTime():Date.now()};
    delete entry.dateInput;
    try{const saved=await API.addExpense(entry);if(!saved)throw new Error();setExpenses(prev=>[saved,...prev]);setView("home");showToast("added",{title:e.title});}
    catch{alert(t.saveFailed);}
  }
  async function deleteExpense(exp){await API.deleteExpense(exp.id);setExpenses(prev=>prev.filter(e=>e.id!==exp.id));}
  async function editExpense(payload){await API.editExpense(payload);setExpenses(prev=>prev.map(e=>e.id===payload.id?{...e,...payload}:e));setEditTarget(null);}
  async function settleOne(s){
    const fp=people.find(p=>p.id===s.from);const tp=people.find(p=>p.id===s.to);
    const entry={id:genId("s"),title:`${fp?.name||s.from} → ${tp?.name||s.to}`,amount:s.amount,ccy:s.ccy||BASE,paidBy:s.from,split:[s.to],cat:"other",when:formatWhenT(t),_ts:Date.now(),isSettlement:true};
    const saved=await API.addExpense(entry);
    setExpenses(prev=>[saved||entry,...prev]);
    showToast("settled",{from:s.from,to:s.to,amount:s.amount,ccy:s.ccy||BASE});
  }
  async function addMember(member){if(!group)return;const updated={...group,members:[...people,member]};await API.updateGroup({members:updated.members});setGroup(updated);}
  async function removeMember(id){if(!group)return;const nm=people.filter(p=>p.id!==id);const nh=group.settlementHub===id?(nm[0]?.id||""):group.settlementHub;await API.updateGroup({members:nm,settlementHub:nh});setGroup({...group,members:nm,settlementHub:nh});}
  async function updateGroupLang(lang){const updated={...group,language:lang};await API.updateGroup({language:lang});setGroup(updated);setEffectiveLang(lang||effectiveLang);}
  async function setGroupPassword(pw){
    const d=await API.updateGroup({password:pw});
    if(!d||!d.ok)return false;
    // 새 토큰 저장 (비밀번호 변경 시 기존 토큰은 무효화됨)
    if(pw&&d.token)localStorage.setItem(GROUP_TOKEN_KEY,d.token);
    else localStorage.removeItem(GROUP_TOKEN_KEY);
    setGroup(g=>({...g,hasPassword:!!pw}));
    return true;
  }

  if(!groupLoaded) return(
    <div className="app" data-bg="cream">
      <PaperGrain/>
      <div className="loading-screen">
        <div className="loading-dots"><span/><span/><span/></div>
        <div>{t.loadingText}</div>
      </div>
    </div>
  );

  if(locked) return(
    <LangContext.Provider value={effectiveLang}>
    <div className="app" data-bg="cream">
      <PaperGrain/>
      <LockGate title={t.groupGateTitle} hint={t.groupGateHint}
        onSubmit={async pw=>{
          const ok=await API.unlockGroup(pw);
          if(ok){setLocked(false);setGroupLoaded(false);loadData();}
          return ok;
        }}/>
    </div>
    </LangContext.Provider>
  );

  return(
    <LangContext.Provider value={effectiveLang}>
    <CcyContext.Provider value={{rates,displayCcy,setDisplayCcy,status,updatedAt}}>
    <div className="app" data-bg="cream">
      <PaperGrain/>

      {/* Header */}
      <header className="topbar">
        <div className="topbar-back-row">
          <button className="back-btn" onClick={handleBack}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polyline points="15 18 9 12 15 6"/></svg>
            {t.backToGroups}
          </button>
          <button className="icon-btn" onClick={()=>setView("groupSettings")} title={t.groupSettingsTitle}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M6 20v-2a6 6 0 0 1 12 0v2"/></svg>
          </button>
        </div>
        <div className="topbar-main">
          <div className="trip">
            <div className="trip-eyebrow">{t.groupExpenses}</div>
            <h1 className="trip-title">
              <span className="title-serif">{group?.name||"Group"}</span><br/>
              <span className="title-sans">{t.appTitle}<span className="title-amp">·</span></span>
            </h1>
          </div>
          <CcyPicker/>
        </div>
      </header>

      {/* Viewing as */}
      <div className="view-as">
        <div className="view-as-label">{t.viewingAs}</div>
        <div className="view-as-row">
          {people.map(p=><PersonChipG key={p.id} id={p.id} people={people} selected={me===p.id} onClick={()=>setMe(p.id)} size="sm"/>)}
        </div>
      </div>

      {/* Hero */}
      <section className="hero">
        <div className="hero-line">
          <span className="hero-eyebrow">{people.find(p=>p.id===me)?.name||"—"}</span>
          <span className="hero-status">{myBalance>0.5?t.isOwedStatus:myBalance<-0.5?t.owesStatus:t.settledStatus}</span>
        </div>
        <HeroAmount amountBase={Math.abs(myBalance)}/>
        <div className="hero-foot">
          <div className="hero-total">
            <span className="hero-foot-k">{t.totalLabel}</span>
            <strong><Money value={total} from={BASE}/></strong>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={()=>setView("settle")}>
            {t.settleUpBtn(settles.length)}
          </button>
        </div>
      </section>

      {/* Balances */}
      <section className="balances">
        <div className="section-head"><h2>{t.whoOwesWho}</h2></div>
        <div className="balance-grid">
          {people.length===0?<div style={{padding:"16px",color:"var(--ink-3)",textAlign:"center",fontSize:"13px"}}>—</div>
          :people.map(p=>{
            const b=balances[p.id]; const st=b>0.5?"pos":b<-0.5?"neg":"zero";
            return(
              <button key={p.id} className={"bal-card bal-"+st} onClick={()=>{setActivePerson(p.id);setView("person");}} style={{"--tone":p.tone}}>
                <PersonDotG id={p.id} people={people} size={32}/>
                <div className="bal-mid">
                  <div className="bal-name">{p.name}</div>
                  <div className="bal-label">{st==="pos"?t.owedLabel:st==="neg"?t.owesLabel:t.settledLabel}</div>
                </div>
                <div className="bal-amount">{st==="zero"?<span className="bal-zero">—</span>:<BalanceNum sign={st==="pos"?"+":"−"} amountBase={Math.abs(b)}/>}</div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Spending */}
      <section className="feed">
        <div className="section-head"><h2>{t.spendingLabel}</h2><span className="section-sub">{fmtShort(total,BASE,rates,displayCcy)}</span></div>
        <div className="spending-list">
          {people.map(p=>{
            const spent=realExpenses.filter(e=>e.split?.includes(p.id)&&!e.isSettlement).reduce((s,e)=>s+convert(e.amount,e.ccy||BASE,BASE,rates)/e.split.length,0);
            const pct=total>0?spent/total:0;
            return(
              <div key={p.id} className="spending-row">
                <div className="spending-left"><PersonDotG id={p.id} people={people} size={24}/><span className="spending-name">{p.name}</span></div>
                <div className="spending-bar-wrap"><div className="spending-bar" style={{width:(pct*100).toFixed(1)+"%",background:p.tone}}/></div>
                <span className="spending-amt">{fmtShort(spent,BASE,rates,displayCcy)}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Category stats */}
      <CatStats expenses={realExpenses} lang={effectiveLang}/>

      {/* Search/filter */}
      <div className="filter-bar">
        <div className="search-wrap">
          <svg className="search-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input className="search-input" placeholder={t.searchPlaceholder} value={searchQuery} onChange={e=>setSearch(e.target.value)}/>
          {searchQuery&&<button className="search-clear" onClick={()=>setSearch("")}>×</button>}
        </div>
        <div className="filter-row">
          <select className="sort-select" value={sortOrder} onChange={e=>setSortOrder(e.target.value)}>
            <option value="newest">{t.sortNewest}</option>
            <option value="oldest">{t.sortOldest}</option>
            <option value="amount_desc">{t.sortAmountDesc}</option>
            <option value="amount_asc">{t.sortAmountAsc}</option>
          </select>
          <div className="cat-filter-row">
            <button className={"cat-filter-btn"+(!filterCat?" cat-filter-on":"")} onClick={()=>setFilterCat("")}>{t.allCats}</button>
            {getCats(effectiveLang).map(c=>(
              <button key={c.id} className={"cat-filter-btn"+(filterCat===c.id?" cat-filter-on":"")} onClick={()=>setFilterCat(c.id===filterCat?"":c.id)}>{c.label}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Expense list */}
      <section className="feed">
        <div className="section-head"><h2>{t.expensesLabel}</h2><span className="section-sub">{t.expenseCount(filteredExpenses.length)}</span></div>
        <ul className="exp-list">
          {filteredExpenses.length===0&&(
            <li className="empty-exp">
              <div className="empty-exp-title">{searchQuery||filterCat?t.noResults:t.noExpenses}</div>
              <div className="empty-exp-sub">{searchQuery||filterCat?t.noResultsHint:t.noExpensesHint}</div>
            </li>
          )}
          {filteredExpenses.map(e=>(
            <ExpenseRow key={e.id} exp={e} me={me} people={people} lang={effectiveLang}
              onDelete={exp=>deleteExpense(exp)}
              onEdit={exp=>setEditTarget(exp)}/>
          ))}
        </ul>
      </section>

      <button className="fab" onClick={()=>setView("add")} aria-label={t.addExpenseBtn}>
        <span className="fab-plus">+</span>
        <span className="fab-label">{t.addExpenseBtn}</span>
      </button>

      {view==="add"&&<AddExpense people={people} onClose={()=>setView("home")} onSave={addExpense} defaultPayer={me} lang={effectiveLang}/>}
      {editTarget&&<EditExpense exp={editTarget} people={people} onClose={()=>setEditTarget(null)} onSave={editExpense} lang={effectiveLang}/>}
      {view==="settle"&&<SettleUp settles={settles} people={people} onClose={()=>setView("home")} onSettle={settleOne} me={me}/>}
      {view==="person"&&activePerson&&<PersonDetail id={activePerson} people={people} expenses={realExpenses} balance={balances[activePerson]} onClose={()=>setView("home")}/>}
      {view==="groupSettings"&&<GroupSettingsSheet group={group} onClose={()=>setView("home")} onAddMember={addMember} onRemoveMember={removeMember} hasPassword={hasPassword} onLangChange={updateGroupLang} globalLang={effectiveLang} onSetGroupPassword={setGroupPassword}/>}

      {backPw&&<PasswordModal title={t.backPwTitle} hint={t.backPwHint}
        verify={API.unlockAdmin}
        onConfirm={()=>{window.location.href="/";}}
        onCancel={()=>setBackPw(false)}/>}
      <Toast confirmation={confirmation} people={people}/>
    </div>
    </CcyContext.Provider>
    </LangContext.Provider>
  );
}

// ---- Category Stats ----
function CatStats({expenses,lang}){
  const{rates,displayCcy}=useCcy(); const t=useT();
  const CATS=getCats(lang);
  const real=expenses.filter(e=>!e.isSettlement); if(real.length===0) return null;
  const totals=CATS.map(c=>({...c,total:real.filter(e=>e.cat===c.id).reduce((s,e)=>s+convert(e.amount,e.ccy||BASE,BASE,rates),0)})).filter(c=>c.total>0).sort((a,b)=>b.total-a.total);
  const max=totals[0]?.total||1;
  return(
    <section className="feed cat-stats-section">
      <div className="section-head"><h2>{t.byCategoryLabel}</h2></div>
      <div className="cat-stats-list">
        {totals.map(c=>(
          <div key={c.id} className="cat-stats-row">
            <div className="cat-stats-left"><CatGlyphLang id={c.id} lang={lang} size={26}/><span className="cat-stats-label">{c.label}</span></div>
            <div className="spending-bar-wrap"><div className="spending-bar" style={{width:(c.total/max*100).toFixed(1)+"%",background:"var(--accent)"}}/></div>
            <span className="spending-amt">{fmtShort(c.total,BASE,rates,displayCcy)}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ---- Expense Row ----
function ExpenseRow({exp,me,people,lang,onDelete,onEdit}){
  const[open,setOpen]=useState(false); const{rates,displayCcy}=useCcy(); const t=useT();
  const payer=people.find(p=>p.id===exp.paidBy)||{name:exp.paidBy,tone:"#8a8073"};
  const expCcy=exp.ccy||BASE; const share=exp.split?.length?exp.amount/exp.split.length:exp.amount;
  const youOwe=exp.split?.includes(me)&&exp.paidBy!==me?share:0;
  const youAreOwed=exp.paidBy===me?exp.amount-(exp.split?.includes(me)?share:0):0;
  return(
    <li className={"exp"+(open?" exp-open":"")+(exp.isSettlement?" exp-settle":"")}>
      <button className="exp-row" onClick={()=>setOpen(o=>!o)}>
        <div className="exp-cat"><CatGlyphLang id={exp.cat} lang={lang} size={36}/></div>
        <div className="exp-mid">
          <div className="exp-title">{exp.title}</div>
          <div className="exp-sub"><PersonDotG id={exp.paidBy} people={people} size={14}/><span><strong>{payer.name}</strong> · {exp.when}</span></div>
        </div>
        <div className="exp-amt">
          <div className={"exp-amt-line"+(displayCcy==="KRW"?" exp-amt-primary":"")}>{fmtShort(exp.amount,expCcy,rates,"KRW")}</div>
          {displayCcy!=="KRW"&&<div className="exp-amt-line exp-amt-primary">{fmtShort(exp.amount,expCcy,rates,displayCcy)}</div>}
          <div className="exp-your">
            {youOwe>0&&<span className="lent neg">−{fmtShort(youOwe,expCcy,rates,displayCcy)}</span>}
            {youAreOwed>0&&<span className="lent pos">+{fmtShort(youAreOwed,expCcy,rates,displayCcy)}</span>}
            {youOwe===0&&youAreOwed===0&&<span className="lent zero">—</span>}
          </div>
        </div>
      </button>
      {open&&(
        <div className="exp-detail">
          <div className="detail-row"><span className="detail-k">{t.paidByLabel}</span><span className="detail-v"><PersonChipG id={exp.paidBy} people={people} selected size="sm"/></span></div>
          <div className="detail-row"><span className="detail-k">{t.splitBetweenRow}</span><span className="detail-v detail-chips">{exp.split?.map(id=><PersonChipG key={id} id={id} people={people} selected size="sm"/>)}</span></div>
          <div className="detail-row"><span className="detail-k">{t.amountLabel}</span><span className="detail-v"><strong>{fmt(exp.amount,expCcy,rates,"KRW")}</strong>{displayCcy!=="KRW"&&<span className="muted">  ·  {fmt(exp.amount,expCcy,rates,displayCcy)}</span>}</span></div>
          <div className="detail-row"><span className="detail-k">{t.eachOwesLabel}</span><span className="detail-v"><strong>{fmt(share,expCcy,rates,"KRW")}</strong>{displayCcy!=="KRW"&&<span className="muted">  ·  {fmt(share,expCcy,rates,displayCcy)}</span>}</span></div>
          {exp.notes&&<div className="detail-row"><span className="detail-k">{t.notesLabel}</span><span className="detail-v detail-notes">{exp.notes}</span></div>}
          {exp.image&&<div className="detail-img"><img src={exp.image} alt="receipt"/></div>}
          {(onEdit||onDelete)&&!exp.isSettlement&&(
            <div className="detail-row detail-actions">
              {onEdit&&<button className="edit-btn" onClick={()=>onEdit(exp)}>{t.editBtn}</button>}
              {onDelete&&<button className="delete-btn" onClick={()=>{if(confirm(t.deleteConfirm(exp.title)))onDelete(exp);}}>{t.deleteBtn}</button>}
            </div>
          )}
        </div>
      )}
    </li>
  );
}

// ---- Image Picker ----
function ImagePicker({value,onChange}){
  const t=useT(); const ref=useRef();
  function pick(e){const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>onChange(ev.target.result);r.readAsDataURL(f);}
  return(
    <div className="field">
      <span className="field-k">{t.receiptPhoto}</span>
      {value?(<div className="img-preview"><img src={value} alt="receipt"/><button type="button" className="img-remove" onClick={()=>onChange(null)}>{t.removePhoto}</button></div>)
        :(<button type="button" className="img-upload-btn" onClick={()=>ref.current.click()}>{t.addPhoto}</button>)}
      <input ref={ref} type="file" accept="image/*" style={{display:"none"}} onChange={pick}/>
    </div>
  );
}

// ---- Expense Form Fields ----
function ExpenseFields({title,setTitle,amount,setAmount,ccy,setCcy,payer,setPayer,split,setSplit,cat,setCat,image,setImage,notes,setNotes,dateInput,setDateInput,people,lang,isEdit}){
  const{rates,displayCcy}=useCcy(); const t=useT();
  const CATS=getCats(lang);
  function toggle(id){setSplit(s=>s.includes(id)?s.filter(x=>x!==id):[...s,id]);}
  const amt=parseFloat(amount.replace(/[^\d.]/g,""))||0;
  const each=split.length?amt/split.length:0;
  const meta=ccyMeta(ccy);
  return(
    <>
      <label className="field field-big">
        <span className="field-k">{t.whatFor}</span>
        <input className="field-input" placeholder={t.whatForPlaceholder} value={title} onChange={e=>setTitle(e.target.value)} autoFocus={!isEdit}/>
      </label>
      <div className="field">
        <div className="field-k-row">
          <span className="field-k">{t.howMuch}</span>
          <div className="ccy-seg">
            {CURRENCIES.map(c=><button key={c.code} type="button" className={"ccy-seg-b "+(ccy===c.code?"ccy-seg-on":"")} onClick={()=>setCcy(c.code)}>{c.symbol}</button>)}
          </div>
        </div>
        <div className="amt-input"><span className="amt-cur">{meta.symbol}</span><input className="amt-num" inputMode="decimal" placeholder="0" value={amount} onChange={e=>setAmount(e.target.value)}/></div>
        {amt>0&&ccy!==displayCcy&&<div className="amt-convert">≈ {fmt(amt,ccy,rates,displayCcy)} ({displayCcy})</div>}
      </div>
      <div className="field">
        <span className="field-k">{t.dateTimeLabel}</span>
        <input type="datetime-local" className="field-input date-input" value={dateInput} onChange={e=>setDateInput(e.target.value)}/>
      </div>
      <div className="field">
        <span className="field-k">{t.categoryLabel}</span>
        <div className="cat-row">
          {CATS.map(c=><button key={c.id} className={"cat-pill "+(cat===c.id?"cat-on":"")} onClick={()=>setCat(c.id)} type="button"><CatGlyphLang id={c.id} lang={lang} size={22}/><span>{c.label}</span></button>)}
        </div>
      </div>
      <div className="field">
        <span className="field-k">{t.whoPaidLabel}</span>
        <div className="chip-row">{people.map(p=><PersonChipG key={p.id} id={p.id} people={people} selected={payer===p.id} onClick={()=>setPayer(p.id)} size="md"/>)}</div>
      </div>
      <div className="field">
        <div className="field-k-row">
          <span className="field-k">{t.splitBetweenLabel}</span>
          <div className="quick-row">
            <button type="button" className="mini" onClick={()=>setSplit(people.map(p=>p.id))}>{t.allBtn}</button>
            <button type="button" className="mini" onClick={()=>setSplit([])}>{t.noneBtn}</button>
          </div>
        </div>
        <div className="chip-row">{people.map(p=><PersonChipG key={p.id} id={p.id} people={people} selected={split.includes(p.id)} onClick={()=>toggle(p.id)} size="md"/>)}</div>
        <div className="split-helper">
          {split.length>0?<span><strong>{fmt(each,ccy,rates,ccy)}</strong> <span className="muted">{t.perPersonLabel} · {t.peopleUnit(split.length)}</span></span>
            :<span className="muted">{t.pickAtLeastOne}</span>}
        </div>
      </div>
      <div className="field">
        <span className="field-k">{t.notesLabel}</span>
        <textarea className="field-input field-textarea" placeholder={t.notesPlaceholder} value={notes} onChange={e=>setNotes(e.target.value)} rows={2}/>
      </div>
      <ImagePicker value={image} onChange={setImage}/>
    </>
  );
}

// ---- Add / Edit Expense ----
function AddExpense({people,onClose,onSave,defaultPayer,lang}){
  const{rates,displayCcy}=useCcy(); const t=useT();
  const[title,setTitle]=useState(""); const[amount,setAmount]=useState(""); const[ccy,setCcy]=useState(displayCcy);
  const[payer,setPayer]=useState(defaultPayer); const[split,setSplit]=useState(people.map(p=>p.id));
  const[cat,setCat]=useState("food"); const[image,setImage]=useState(null); const[notes,setNotes]=useState(""); const[dateInput,setDateInput]=useState(todayInputValue());
  const amt=parseFloat(amount.replace(/[^\d.]/g,""))||0; const valid=title.trim()&&amt>0&&split.length>0;
  return(
    <Sheet onClose={onClose} title={t.addExpenseTitle}>
      <div className="form">
        <ExpenseFields title={title} setTitle={setTitle} amount={amount} setAmount={setAmount} ccy={ccy} setCcy={setCcy} payer={payer} setPayer={setPayer} split={split} setSplit={setSplit} cat={cat} setCat={setCat} image={image} setImage={setImage} notes={notes} setNotes={setNotes} dateInput={dateInput} setDateInput={setDateInput} people={people} lang={lang}/>
        <div className="form-foot">
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" disabled={!valid} onClick={()=>valid&&onSave({title:title.trim(),amount:amt,ccy,paidBy:payer,split,cat,image,notes,dateInput})}>{t.saveExpense}</button>
        </div>
      </div>
    </Sheet>
  );
}
function EditExpense({exp,people,onClose,onSave,lang}){
  const{rates,displayCcy}=useCcy(); const t=useT();
  const[title,setTitle]=useState(exp.title); const[amount,setAmount]=useState(String(exp.amount)); const[ccy,setCcy]=useState(exp.ccy||BASE);
  const[payer,setPayer]=useState(exp.paidBy); const[split,setSplit]=useState(exp.split||[]);
  const[cat,setCat]=useState(exp.cat||"other"); const[image,setImage]=useState(exp.image||null); const[notes,setNotes]=useState(exp.notes||"");
  const[dateInput,setDateInput]=useState(exp._ts?new Date(exp._ts).toISOString().slice(0,16):todayInputValue());
  const amt=parseFloat(amount.replace(/[^\d.]/g,""))||0; const valid=title.trim()&&amt>0&&split.length>0;
  function handleSave(){
    if(!valid) return;
    onSave({id:exp.id,title:title.trim(),amount:amt,ccy,paidBy:payer,split,cat,image,notes,when:formatWhenT(t,dateInput),_ts:dateInput?new Date(dateInput).getTime():exp._ts,removeImage:!image});
  }
  return(
    <Sheet onClose={onClose} title={t.editExpenseTitle}>
      <div className="form">
        <ExpenseFields title={title} setTitle={setTitle} amount={amount} setAmount={setAmount} ccy={ccy} setCcy={setCcy} payer={payer} setPayer={setPayer} split={split} setSplit={setSplit} cat={cat} setCat={setCat} image={image} setImage={setImage} notes={notes} setNotes={setNotes} dateInput={dateInput} setDateInput={setDateInput} people={people} lang={lang} isEdit/>
        <div className="form-foot">
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" disabled={!valid} onClick={handleSave}>{t.saveChanges}</button>
        </div>
      </div>
    </Sheet>
  );
}

// ---- Settle Up ----
function SettleUp({settles,people,onClose,onSettle,me}){
  const{rates,displayCcy}=useCcy(); const t=useT();
  const[rowCcy,setRowCcy]=useState({}); const ccyFor=i=>rowCcy[i]||displayCcy; const setCcyFor=(i,c)=>setRowCcy(p=>({...p,[i]:c}));
  return(
    <Sheet onClose={onClose} title={t.settleUpTitle}>
      {settles.length===0?(
        <div className="empty-settle"><div className="empty-mark">✓</div><div className="empty-title">{t.allEvenTitle}</div><div className="empty-sub">{t.allEvenSub}</div></div>
      ):(
        <div className="settle-list">
          <div className="settle-eyebrow">{t.paymentsNeeded(settles.length)}</div>
          {settles.map((s,i)=>{
            const mine=s.from===me||s.to===me; const ccy=ccyFor(i); const converted=convert(s.amount,BASE,ccy,rates);
            return(
              <div key={i} className={"settle-row "+(mine?"settle-mine":"")}>
                <div className="settle-people"><PersonChipG id={s.from} people={people} selected size="md"/><svg className="arrow" viewBox="0 0 40 12" width="36" height="12"><line x1="0" y1="6" x2="32" y2="6" stroke="currentColor" strokeWidth="1.4"/><polyline points="26,1 32,6 26,11" fill="none" stroke="currentColor" strokeWidth="1.4"/></svg><PersonChipG id={s.to} people={people} selected size="md"/></div>
                <div className="settle-pay-in"><span className="settle-pay-k">{t.payInLabel}</span><div className="ccy-seg ccy-seg-sm">{CURRENCIES.map(c=><button key={c.code} type="button" className={"ccy-seg-b "+(ccy===c.code?"ccy-seg-on":"")} onClick={()=>setCcyFor(i,c.code)}><span className="ccy-sym">{c.symbol}</span></button>)}</div></div>
                <div className="settle-amt"><div className="settle-num">{fmt(converted,ccy,rates,ccy)}{ccy!==BASE&&<span className="settle-num-alt"> · {fmt(s.amount,BASE,rates,BASE)}</span>}</div><button className="btn btn-mark" onClick={()=>onSettle({...s,amount:converted,ccy})}>{t.markPaidBtn}</button></div>
              </div>
            );
          })}
        </div>
      )}
    </Sheet>
  );
}

// ---- Person Detail ----
function PersonDetail({id,people,expenses,balance,onClose}){
  const{rates,displayCcy}=useCcy(); const t=useT(); const lang=useLang();
  const p=people.find(p=>p.id===id)||{name:id,tone:"#8a8073"};
  const involved=expenses.filter(e=>e.paidBy===id||e.split?.includes(id));
  const paid=expenses.filter(e=>e.paidBy===id).reduce((s,e)=>s+convert(e.amount,e.ccy||BASE,BASE,rates),0);
  const owes=expenses.filter(e=>e.split?.includes(id)).reduce((s,e)=>s+convert(e.amount,e.ccy||BASE,BASE,rates)/(e.split?.length||1),0);
  const st=balance>0.5?"pos":balance<-0.5?"neg":"zero";
  return(
    <Sheet onClose={onClose} title={p.name}>
      <div className={"person-head ph-"+st} style={{"--tone":p.tone}}>
        <PersonDotG id={id} people={people} size={52}/>
        <div className="person-meta"><div className="person-name">{p.name}</div><div className="person-status">{st==="pos"?t.isOwedDetail:st==="neg"?t.owesDetail:t.settledDetail}</div></div>
        <div className="person-bal">{st!=="zero"&&<span className="person-sign">{st==="pos"?"+":"−"}</span>}{st==="zero"?<span className="person-zero">{ccyMeta(displayCcy).symbol}0</span>:<span>{fmtShort(Math.abs(balance),BASE,rates,displayCcy)}</span>}</div>
      </div>
      <div className="person-stats">
        <div className="stat"><div className="stat-k">{t.paidStat}</div><div className="stat-v">{fmtShort(paid,BASE,rates,displayCcy)}</div></div>
        <div className="stat"><div className="stat-k">{t.shareStat}</div><div className="stat-v">{fmtShort(owes,BASE,rates,displayCcy)}</div></div>
        <div className="stat"><div className="stat-k">{t.entriesStat}</div><div className="stat-v">{involved.length}</div></div>
      </div>
      <div className="person-feed"><div className="section-head"><h2>{t.involvedTitle}</h2></div>
        <ul className="exp-list exp-list-tight">{involved.map(e=><ExpenseRow key={e.id} exp={e} me={id} people={people} lang={lang}/>)}</ul>
      </div>
    </Sheet>
  );
}

// ---- Group Settings Sheet ----
function GroupSettingsSheet({group,onClose,onAddMember,onRemoveMember,hasPassword,onLangChange,globalLang,onSetGroupPassword}){
  const t=useT(); const currentLang=useLang();
  const[tab,setTab]=useState("members"); const[newName,setNewName]=useState("");
  const people=group?.members||[];
  const groupLang=group?.language||null;

  function addMember(){const n=newName.trim();if(!n)return;const usedTones=people.map(m=>m.tone);onAddMember({id:genId("m"),name:n,tone:randomTone(usedTones)});setNewName("");}

  const langOptions=[{val:null,label:t.useGlobal},{val:"en",label:"English"},{val:"ko",label:"한국어"}];

  return(
    <Sheet onClose={onClose} title={t.groupSettingsTitle}>
      <div className="settings-tabs">
        <button className={"settings-tab"+(tab==="members"?" tab-on":"")} onClick={()=>setTab("members")}>{t.tabMembers}</button>
        <button className={"settings-tab"+(tab==="security"?" tab-on":"")} onClick={()=>setTab("security")}>{t.tabGroupPw}</button>
        <button className={"settings-tab"+(tab==="lang"?" tab-on":"")} onClick={()=>setTab("lang")}>{t.tabLanguage}</button>
        <button className={"settings-tab"+(tab==="app"?" tab-on":"")} onClick={()=>setTab("app")}>{t.tabAppSettings}</button>
      </div>
      <div className="settings-body">
        {tab==="members"&&(
          <div className="settings-section">
            <div className="member-add-row">
              <input className="field-input member-input" placeholder={t.newMemberPlaceholder} value={newName} onChange={e=>setNewName(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addMember()}/>
              <button className="btn btn-ghost btn-sm" onClick={addMember}>{t.add}</button>
            </div>
            <div className="member-list">
              {people.map(m=>(
                <div key={m.id} className="member-row member-row-simple">
                  <span className="dot" style={{width:32,height:32,background:m.tone,fontSize:14,display:"inline-flex",alignItems:"center",justifyContent:"center",borderRadius:"50%",color:"#fff",fontWeight:600}}>{m.name[0]}</span>
                  <span className="member-name">{m.name}</span>
                  <button className="member-remove" onClick={()=>{if(confirm(t.removeMemberConfirm(m.name)))onRemoveMember(m.id);}}>✕</button>
                </div>
              ))}
            </div>
          </div>
        )}
        {tab==="security"&&<GroupPasswordTab group={group} onSetGroupPassword={onSetGroupPassword}/>}
        {tab==="lang"&&(
          <div className="settings-section">
            <div className="settings-hint">{t.groupLanguageHint}</div>
            <div className="lang-btn-row lang-btn-row-lg">
              {langOptions.map(opt=>(
                <button key={String(opt.val)} className={"lang-option-btn"+(groupLang===opt.val?" lang-option-on":"")} onClick={()=>onLangChange(opt.val)}>
                  {opt.val===null?(<><span>{t.useGlobal}</span><span className="lang-option-sub"> ({I18N[globalLang]?.langName||globalLang})</span></>):opt.label}
                </button>
              ))}
            </div>
          </div>
        )}
        {tab==="app"&&<AppSettingsTab hasPassword={hasPassword}/>}
      </div>
    </Sheet>
  );
}

function GroupPasswordTab({group,onSetGroupPassword}){
  const t=useT();
  const[pw,setPw]=useState("");const[cnf,setCnf]=useState("");const[msg,setMsg]=useState(null);const[busy,setBusy]=useState(false);
  const hasPw=!!group?.hasPassword;
  async function save(){
    if(!pw)return;
    if(pw!==cnf){setMsg({err:true,text:t.passwordMismatch});return;}
    setBusy(true);
    const ok=await onSetGroupPassword(pw);
    setBusy(false);
    if(ok){setMsg({err:false,text:t.groupPwSaved});setPw("");setCnf("");}
    else setMsg({err:true,text:t.groupPwFailed});
  }
  async function remove(){
    setBusy(true);
    const ok=await onSetGroupPassword("");
    setBusy(false);
    setMsg(ok?{err:false,text:t.groupPwRemoved}:{err:true,text:t.groupPwFailed});
  }
  return(
    <div className="settings-section">
      <div className="settings-hint">{hasPw?t.groupPwOn:t.groupPwOff}</div>
      <div className="settings-hint">{t.groupPasswordHint}</div>
      <label className="field"><span className="field-k">{t.groupPwNew}</span>
        <input type="password" className="field-input" inputMode="numeric" value={pw} onChange={e=>{setPw(e.target.value.replace(/\D/g,""));setMsg(null);}}/></label>
      <label className="field"><span className="field-k">{t.confirmPassword}</span>
        <input type="password" className="field-input" inputMode="numeric" value={cnf} onChange={e=>{setCnf(e.target.value.replace(/\D/g,""));setMsg(null);}} onKeyDown={e=>e.key==="Enter"&&save()}/></label>
      {msg&&<div className={"settings-msg"+(msg.err?" msg-err":" msg-ok")}>{msg.text}</div>}
      <div style={{display:"flex",gap:8}}>
        <button className="btn btn-primary btn-sm" onClick={save} disabled={busy||!pw}>{t.groupPwSave}</button>
        {hasPw&&<button className="btn btn-ghost btn-sm" onClick={remove} disabled={busy}>{t.groupPwRemove}</button>}
      </div>
    </div>
  );
}

function AppSettingsTab({hasPassword}){
  const t=useT();
  const[oldPw,setOldPw]=useState("");const[newPw,setNewPw]=useState("");const[cnfPw,setCnfPw]=useState("");const[msg,setMsg]=useState(null);
  const[usd,setUsd]=useState("");const[eur,setEur]=useState("");const[rMsg,setRMsg]=useState(null);
  const[globalLang,setGlobalLang]=useState("en");const[langMsg,setLangMsg]=useState(null);
  useEffect(()=>{
    fetch("/api/settings").then(r=>r.json()).then(s=>{
      setUsd(String(s.fallbackRates?.USD||1400));
      setEur(String(s.fallbackRates?.EUR||1600));
      setGlobalLang(s.language||"en");
    });
  },[]);
  async function savePw(){if(newPw!==cnfPw){setMsg({err:true,text:t.passwordMismatch});return;}const res=await fetch("/api/settings",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({oldPassword:oldPw,newPassword:newPw})});const d=await res.json();if(d.ok){setMsg({err:false,text:newPw?t.passwordChanged:t.passwordRemoved});setOldPw("");setNewPw("");setCnfPw("");}else setMsg({err:true,text:t.passwordWrongOld});}
  async function saveRates(){const u=parseFloat(usd),e=parseFloat(eur);if(!u||!e||u<=0||e<=0){setRMsg({err:true,text:t.ratesInvalid});return;}const res=await fetch("/api/settings",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({fallbackRates:{KRW:1,USD:u,EUR:e}})});const d=await res.json();if(d.ok)setRMsg({err:false,text:t.ratesSaved});}
  async function saveLang(lang){
    setGlobalLang(lang);
    const res=await fetch("/api/settings",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({language:lang})});
    const d=await res.json();
    if(d.ok){setLangMsg({err:false,text:(I18N[lang]||I18N.en).languageSaved});setTimeout(()=>window.location.reload(),700);}
  }
  return(
    <div className="settings-section">
      <div className="settings-sub-title">{t.globalLanguage}</div>
      <div className="lang-btn-row lang-btn-row-lg">
        <button className={"lang-option-btn"+(globalLang==="en"?" lang-option-on":"")} onClick={()=>saveLang("en")}>
          <span className="lang-flag">🇺🇸</span> English
        </button>
        <button className={"lang-option-btn"+(globalLang==="ko"?" lang-option-on":"")} onClick={()=>saveLang("ko")}>
          <span className="lang-flag">🇰🇷</span> 한국어
        </button>
      </div>
      {langMsg&&<div className={"settings-msg"+(langMsg.err?" msg-err":" msg-ok")}>{langMsg.text}</div>}
      <div className="settings-sub-title">{t.pwSubtitle}</div>
      {hasPassword&&<label className="field"><span className="field-k">{t.currentPassword}</span><input type="password" className="field-input" inputMode="numeric" value={oldPw} onChange={e=>setOldPw(e.target.value.replace(/\D/g,""))}/></label>}
      <label className="field"><span className="field-k">{t.newPassword}</span><input type="password" className="field-input" inputMode="numeric" placeholder={t.newPasswordPlaceholder} value={newPw} onChange={e=>setNewPw(e.target.value.replace(/\D/g,""))}/></label>
      <label className="field"><span className="field-k">{t.confirmPassword}</span><input type="password" className="field-input" inputMode="numeric" value={cnfPw} onChange={e=>setCnfPw(e.target.value.replace(/\D/g,""))}/></label>
      {msg&&<div className={"settings-msg"+(msg.err?" msg-err":" msg-ok")}>{msg.text}</div>}
      <button className="btn btn-primary btn-sm" style={{marginBottom:20}} onClick={savePw}>{t.changePassword}</button>
      <div className="settings-sub-title">{t.ratesSubtitle}</div>
      <label className="field"><span className="field-k">{t.usdRate}</span><input type="number" className="field-input" value={usd} onChange={e=>setUsd(e.target.value)}/></label>
      <label className="field"><span className="field-k">{t.eurRate}</span><input type="number" className="field-input" value={eur} onChange={e=>setEur(e.target.value)}/></label>
      {rMsg&&<div className={"settings-msg"+(rMsg.err?" msg-err":" msg-ok")}>{rMsg.text}</div>}
      <button className="btn btn-primary btn-sm" onClick={saveRates}>{t.saveRates}</button>
    </div>
  );
}

// ---- Display helpers ----
function Money({value,from}){const{rates,displayCcy}=useCcy();return <span>{fmt(value,from,rates,displayCcy)}</span>;}
function HeroAmount({amountBase}){
  const{rates,displayCcy}=useCcy(); const v=convert(amountBase,BASE,displayCcy,rates); const m=ccyMeta(displayCcy);
  const r=m.decimals===0?Math.round(v):Math.round(v*100)/100;
  return(<div className="hero-amount"><span className="hero-currency">{m.symbol}</span><span className="hero-number">{r.toLocaleString(undefined,{minimumFractionDigits:m.decimals,maximumFractionDigits:m.decimals})}</span></div>);
}
function BalanceNum({sign,amountBase}){const{rates,displayCcy}=useCcy();return<><span className="bal-sign">{sign}</span><span className="bal-num">{fmtShort(amountBase,BASE,rates,displayCcy)}</span></>;}
function Toast({confirmation,people}){
  const{rates}=useCcy(); const t=useT(); if(!confirmation)return null;
  const fp=people.find(p=>p.id===confirmation.from); const tp=people.find(p=>p.id===confirmation.to);
  return(
    <div className="toast">
      {confirmation.kind==="added"&&<span>{t.toastAdded(confirmation.title)}</span>}
      {confirmation.kind==="settled"&&<span><strong>{fp?.name||confirmation.from}</strong> → <strong>{tp?.name||confirmation.to}</strong> · {fmt(confirmation.amount,confirmation.ccy||BASE,rates,confirmation.ccy||BASE)}</span>}
    </div>
  );
}

function CcyPicker(){
  const{rates,displayCcy,setDisplayCcy,status,updatedAt}=useCcy(); const t=useT();
  const[,tk]=useState(0); useEffect(()=>{const id=setInterval(()=>tk(x=>x+1),30000);return()=>clearInterval(id);},[]);
  const bSym=ccyMeta(BASE).symbol;
  const rateStr=Object.entries(rates).filter(([c])=>c!==BASE&&CURRENCIES.find(x=>x.code===c)).map(([c,v])=>`${ccyMeta(c).symbol}1=${Number(v).toLocaleString(undefined,{maximumFractionDigits:0})}${bSym}`).join("  ");
  const ago=updatedAt?relTimeT(t,updatedAt):"";
  const statusText={live:t.ccyLive,refreshing:t.ccyUpdating,cached:t.ccyCached(ago),loading:t.ccyLoading,offline:t.ccyOffline}[status]||status;
  return(
    <div className="ccy-picker">
      <div className="ccy-seg ccy-seg-lg">
        {CURRENCIES.map(c=><button key={c.code} type="button" className={"ccy-seg-b "+(displayCcy===c.code?"ccy-seg-on":"")} onClick={()=>setDisplayCcy(c.code)} title={c.label}><span className="ccy-sym">{c.symbol}</span><span className="ccy-code">{c.code}</span></button>)}
      </div>
      <div className={"ccy-status ccy-status-"+status}><span className="ccy-dot"/><span>{statusText} · {rateStr}</span></div>
    </div>
  );
}

// Mount
if(GROUP_ID){ReactDOM.createRoot(document.getElementById("root")).render(<App/>);}
