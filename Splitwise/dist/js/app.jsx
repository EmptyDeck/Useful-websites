// Korean Trip Split — mobile-first bill splitter

const { useState, useMemo, useEffect, useRef } = React;

// ----- DATA -----
const PEOPLE = [
  { id: "sejik",  name: "sejik",  tone: "#c4502a" },
  { id: "saimi",  name: "saimi",  tone: "#7a8c5c" },
  { id: "alexis", name: "alexis", tone: "#b88a2e" },
  { id: "ada",    name: "ada",    tone: "#4d6b85" },
  { id: "jere",   name: "jere",   tone: "#9a5040" },
];

const CATS = [
  { id: "food",    label: "food",    glyph: "F" },
  { id: "stay",    label: "stay",    glyph: "S" },
  { id: "transit", label: "transit", glyph: "T" },
  { id: "tickets", label: "tickets", glyph: "K" },
  { id: "shop",    label: "shop",    glyph: "H" },
  { id: "other",   label: "other",   glyph: "O" },
];

// Imported from koreangang_2026-05-17_export.csv. Each row: payer is the
// person who fronted the cost; split is everyone who owes an equal share.
const SEED = [
  { id: "e1", title: "Alexsis Esim",           amount: 8900,   ccy: "KRW", paidBy: "sejik", split: ["alexis"],                   cat: "other",   when: "May 12" },
  { id: "e2", title: "Cash",                   amount: 150000, ccy: "KRW", paidBy: "sejik", split: ["jere","saimi","ada"],       cat: "other",   when: "May 16" },
  { id: "e3", title: "extra cash",             amount: 20000,  ccy: "KRW", paidBy: "sejik", split: ["jere","saimi"],             cat: "other",   when: "May 17" },
  { id: "e4", title: "Train in finland",       amount: 8,      ccy: "EUR", paidBy: "jere",  split: ["sejik"],                    cat: "transit", when: "May 17" },
  { id: "e5", title: "suki yaki 17lunch",      amount: 83600,  ccy: "KRW", paidBy: "sejik", split: ["jere","alexis","saimi","ada"], cat: "other",when: "May 17" },
  { id: "e6", title: "Greap ade 17 lunch-jere",amount: 6000,   ccy: "KRW", paidBy: "sejik", split: ["jere"],                     cat: "food",    when: "May 17" },
  { id: "e7", title: "Finnish people Esim",    amount: 12900,  ccy: "KRW", paidBy: "sejik", split: ["ada","jere","saimi"],       cat: "other",   when: "May 15" },
  { id: "e8", title: "accommodation",          amount: 1165269,ccy: "KRW", paidBy: "sejik", split: ["sejik","saimi","alexis","ada","jere"], cat: "stay", when: "May 17" },
  { id: "e9", title: "Incheon airport taxi",   amount: 45800,  ccy: "KRW", paidBy: "sejik", split: ["saimi","alexis","ada","jere"], cat: "transit", when: "May 18" },
  { id: "e10",title: "Japan Esim",             amount: 11500,  ccy: "KRW", paidBy: "sejik", split: ["saimi","alexis","ada","jere"], cat: "other",   when: "May 18" },
  // 노래방 ₩90,000 was split 7 ways (2 people not in this app). sejik paid;
  // amount here = the 4 in-app members' shares (90000/7 × 4 ≈ ₩51,429),
  // so each of jere/saimi/ada/alexis owes ₩12,857. sejik covers his own
  // 1/7 and collects the 2 externals' shares offline.
  { id: "e11",title: "Karaoke (90,000 / 7, 2 external)", amount: 51429, ccy: "KRW", paidBy: "sejik", split: ["jere","saimi","ada","alexis"], cat: "other", when: "May 17" },
];

const CURRENCIES = [
  { code: "KRW", symbol: "₩", label: "won",    decimals: 0 },
  { code: "USD", symbol: "$", label: "dollar", decimals: 2 },
  { code: "EUR", symbol: "€", label: "euro",   decimals: 2 },
];
const ccyMeta = (code) => CURRENCIES.find(c => c.code === code) || CURRENCIES[0];

// All seed expenses are stored in their native currency; balances
// normalize to KRW internally, then display converts to whatever the
// user picked.
const BASE = "KRW";

function convert(value, from, to, rates) {
  if (!from) from = BASE;
  if (!to) to = BASE;
  if (from === to) return value;
  const inBase = value * (rates[from] || 1);
  return inBase / (rates[to] || 1);
}

function fmt(value, ccy, rates, displayCcy) {
  const target = displayCcy || ccy || BASE;
  const v = convert(value, ccy || BASE, target, rates);
  const meta = ccyMeta(target);
  const rounded = meta.decimals === 0 ? Math.round(v) : Math.round(v * 100) / 100;
  return meta.symbol + rounded.toLocaleString(undefined, {
    minimumFractionDigits: meta.decimals,
    maximumFractionDigits: meta.decimals,
  });
}

function fmtShort(value, ccy, rates, displayCcy) {
  const target = displayCcy || ccy || BASE;
  const v = convert(value, ccy || BASE, target, rates);
  const meta = ccyMeta(target);
  const abs = Math.abs(v);
  if (target === "KRW" && abs >= 100000) return meta.symbol + (v/1000).toFixed(0) + "k";
  if (target !== "KRW" && abs >= 10000) return meta.symbol + (v/1000).toFixed(1) + "k";
  const rounded = meta.decimals === 0 ? Math.round(v) : Math.round(v * 100) / 100;
  return meta.symbol + rounded.toLocaleString(undefined, {
    minimumFractionDigits: meta.decimals,
    maximumFractionDigits: meta.decimals,
  });
}

const personById = (id) => PEOPLE.find(p => p.id === id);

// ----- LIVE RATES -----
// Stores how many BASE units = 1 unit of currency. So rates[KRW] = 1.
// Default fallback values; replaced by live fetch on mount.
const FALLBACK_RATES = { KRW: 1, USD: 1370, EUR: 1480 };

function useLiveRates() {
  const cached = (() => {
    try {
      const raw = localStorage.getItem("kts:rates");
      if (!raw) return null;
      const p = JSON.parse(raw);
      if (!p || !p.rates) return null;
      return p;
    } catch { return null; }
  })();

  const [rates, setRates] = useState(cached?.rates || FALLBACK_RATES);
  const [updatedAt, setUpdatedAt] = useState(cached?.updatedAt ? new Date(cached.updatedAt) : null);
  const [status, setStatus] = useState(cached ? "cached" : "loading");

  useEffect(() => {
    let cancelled = false;
    async function fetchRates() {
      try {
        setStatus(s => s === "loading" ? "loading" : "refreshing");
        const r = await fetch("https://api.frankfurter.app/latest?from=USD&to=KRW,EUR");
        if (!r.ok) throw new Error("bad status");
        const data = await r.json();
        const krwPerUsd = data.rates.KRW;
        const eurPerUsd = data.rates.EUR;
        // rates[X] = how many KRW = 1 X
        const next = {
          KRW: 1,
          USD: krwPerUsd,
          EUR: krwPerUsd / eurPerUsd,
        };
        if (cancelled) return;
        const now = new Date();
        setRates(next);
        setUpdatedAt(now);
        setStatus("live");
        try {
          localStorage.setItem("kts:rates", JSON.stringify({ rates: next, updatedAt: now.toISOString() }));
        } catch {}
      } catch (e) {
        if (cancelled) return;
        setStatus(cached ? "cached" : "offline");
      }
    }
    fetchRates();
    const id = setInterval(fetchRates, 5 * 60 * 1000);
    return () => { cancelled = true; clearInterval(id); };
  }, []);

  return { rates, status, updatedAt };
}

// ----- CURRENCY CONTEXT -----
const CcyContext = React.createContext({
  rates: FALLBACK_RATES,
  displayCcy: "KRW",
  setDisplayCcy: () => {},
  status: "loading",
  updatedAt: null,
});
const useCcy = () => React.useContext(CcyContext);

function relTime(d) {
  if (!d) return "";
  const diff = (Date.now() - d.getTime()) / 1000;
  if (diff < 30) return "just now";
  if (diff < 60) return Math.floor(diff) + "s ago";
  if (diff < 3600) return Math.floor(diff/60) + "m ago";
  if (diff < 86400) return Math.floor(diff/3600) + "h ago";
  return Math.floor(diff/86400) + "d ago";
}

// ----- BALANCES -----
function computeBalances(expenses, people, rates) {
  const bal = Object.fromEntries(people.map(p => [p.id, 0]));
  for (const e of expenses) {
    // normalize to BASE so mixed-currency expenses still net correctly
    const amtBase = convert(e.amount, e.ccy || BASE, BASE, rates);
    const share = amtBase / e.split.length;
    bal[e.paidBy] += amtBase;
    for (const pid of e.split) bal[pid] -= share;
  }
  return bal;
}

function settlements(bal) {
  const debtors = [], creditors = [];
  for (const [id, v] of Object.entries(bal)) {
    if (v < -0.5) debtors.push({ id, v: -v });
    else if (v > 0.5) creditors.push({ id, v });
  }
  debtors.sort((a,b) => b.v - a.v);
  creditors.sort((a,b) => b.v - a.v);
  const out = [];
  let i = 0, j = 0;
  while (i < debtors.length && j < creditors.length) {
    const pay = Math.min(debtors[i].v, creditors[j].v);
    out.push({ from: debtors[i].id, to: creditors[j].id, amount: pay });
    debtors[i].v -= pay;
    creditors[j].v -= pay;
    if (debtors[i].v < 0.5) i++;
    if (creditors[j].v < 0.5) j++;
  }
  return out;
}

// ----- ATOMS -----
function PersonDot({ id, size = 22 }) {
  const p = personById(id);
  if (!p) return null;
  return (
    <span className="dot" style={{ width: size, height: size, background: p.tone, fontSize: size * 0.42 }}>
      {p.name[0]}
    </span>
  );
}

function PersonChip({ id, selected, onClick, size = "md", showName = true, disabled = false }) {
  const p = personById(id);
  if (!p) return null;
  return (
    <button
      type="button"
      className={"chip chip-" + size + (selected ? " chip-on" : "") + (disabled ? " chip-disabled" : "")}
      onClick={disabled ? undefined : onClick}
      style={selected ? { "--tone": p.tone } : {}}
    >
      <PersonDot id={id} size={size === "lg" ? 28 : size === "sm" ? 20 : 24} />
      {showName && <span className="chip-name">{p.name}</span>}
    </button>
  );
}

function CatGlyph({ id, size = 32 }) {
  const c = CATS.find(c => c.id === id) || CATS[5];
  return (
    <span className="cat-glyph" style={{ width: size, height: size, fontSize: size * 0.5 }}>
      {c.glyph}
    </span>
  );
}

// ----- MAIN APP -----
function App({ tweaks, setTweak }) {
  const [expenses, setExpenses] = useState(SEED);
  const [view, setView] = useState("home"); // home | add | settle | person
  const [activePerson, setActivePerson] = useState(null);
  const [confirmation, setConfirmation] = useState(null);

  const { rates, status, updatedAt } = useLiveRates();
  const displayCcy = tweaks.displayCcy || "KRW";
  const setDisplayCcy = (v) => setTweak("displayCcy", v);
  const [, tick] = useState(0);
  // tick relTime label every 30s
  useEffect(() => {
    const id = setInterval(() => tick(x => x + 1), 30000);
    return () => clearInterval(id);
  }, []);

  const balances = useMemo(() => computeBalances(expenses, PEOPLE, rates), [expenses, rates]);
  const total    = useMemo(() => expenses.reduce((s,e) => s + convert(e.amount, e.ccy || BASE, BASE, rates), 0), [expenses, rates]);
  const settles  = useMemo(() => settlements(balances), [balances]);

  const me = tweaks.me || "sejik";
  const myBalance = balances[me];

  function addExpense(e) {
    setExpenses(prev => [{ ...e, id: "e" + (prev.length + 1) + Date.now(), when: "just now" }, ...prev]);
    setView("home");
    setConfirmation({ kind: "added", title: e.title });
    setTimeout(() => setConfirmation(null), 2400);
  }

  function settleOne(s) {
    setExpenses(prev => [{
      id: "s" + Date.now(),
      title: `${personById(s.from).name} → ${personById(s.to).name}`,
      amount: s.amount,
      ccy: s.ccy || BASE,
      paidBy: s.from,
      split: [s.to],
      cat: "other",
      when: "just now",
      isSettlement: true,
    }, ...prev]);
    setConfirmation({ kind: "settled", from: s.from, to: s.to, amount: s.amount, ccy: s.ccy || BASE });
    setTimeout(() => setConfirmation(null), 2400);
  }

  return (
    <CcyContext.Provider value={{ rates, displayCcy, setDisplayCcy, status, updatedAt }}>
    <div className="app" data-bg={tweaks.bg || "cream"}>
      <PaperGrain />

      {/* HEADER */}
      <header className="topbar">
        <div className="trip">
          <div className="trip-eyebrow">a trip, splitting</div>
          <h1 className="trip-title">
            <span className="title-serif">Korean Trip</span><br/>
            <span className="title-sans">Split<span className="title-amp">·</span></span>
          </h1>
        </div>
        <CcyPicker />
      </header>

      {/* VIEW-AS CHIP STRIP */}
      <div className="view-as">
        <div className="view-as-label">viewing as</div>
        <div className="view-as-row">
          {PEOPLE.map(p => (
            <PersonChip
              key={p.id}
              id={p.id}
              selected={me === p.id}
              onClick={() => setTweak("me", p.id)}
              size="sm"
            />
          ))}
        </div>
      </div>

      {/* HERO BALANCE */}
      <section className="hero">
        <div className="hero-line">
          <span className="hero-eyebrow">you</span>
          <span className="hero-status">
            {myBalance > 0.5 ? "are owed" : myBalance < -0.5 ? "owe" : "are settled"}
          </span>
        </div>
        <HeroAmount amountBase={Math.abs(myBalance)} />
        <div className="hero-foot">
          <div className="hero-total">
            <span className="hero-foot-k">trip total</span>
            <strong><Money value={total} from={BASE} /></strong>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={() => setView("settle")}>
            settle up{settles.length > 0 ? ` · ${settles.length}` : ""}
          </button>
        </div>
      </section>

      {/* BALANCES */}
      <section className="balances">
        <div className="section-head">
          <h2>who owes who</h2>
        </div>
        <div className="balance-grid">
          {PEOPLE.map(p => {
            const b = balances[p.id];
            const state = b > 0.5 ? "pos" : b < -0.5 ? "neg" : "zero";
            return (
              <button
                key={p.id}
                className={"bal-card bal-" + state}
                onClick={() => { setActivePerson(p.id); setView("person"); }}
                style={{ "--tone": p.tone }}
              >
                <PersonDot id={p.id} size={32} />
                <div className="bal-mid">
                  <div className="bal-name">{p.name}</div>
                  <div className="bal-label">
                    {state === "pos" ? "is owed" : state === "neg" ? "owes" : "settled"}
                  </div>
                </div>
                <div className="bal-amount">
                  {state === "zero" ? (
                    <span className="bal-zero">—</span>
                  ) : (
                    <BalanceNum sign={state === "pos" ? "+" : "−"} amountBase={Math.abs(b)} />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* FEED */}
      <section className="feed">
        <div className="section-head">
          <h2>the receipts</h2>
          <span className="section-sub">{expenses.length}</span>
        </div>
        <ul className="exp-list">
          {expenses.map(e => <ExpenseRow key={e.id} exp={e} me={me} />)}
        </ul>
      </section>

      {/* FAB */}
      <button className="fab" onClick={() => setView("add")} aria-label="add expense">
        <span className="fab-plus">+</span>
        <span className="fab-label">add</span>
      </button>

      {view === "add"   && <AddExpense onClose={() => setView("home")} onSave={addExpense} defaultPayer={me} />}
      {view === "settle" && <SettleUp settles={settles} onClose={() => setView("home")} onSettle={settleOne} me={me} />}
      {view === "person" && activePerson && (
        <PersonDetail
          id={activePerson}
          expenses={expenses}
          balance={balances[activePerson]}
          onClose={() => setView("home")}
        />
      )}

      <Toast confirmation={confirmation} />
    </div>
    </CcyContext.Provider>
  );
}

// ----- EXPENSE ROW -----
function ExpenseRow({ exp, me }) {
  const [open, setOpen] = useState(false);
  const { rates, displayCcy } = useCcy();
  const payer = personById(exp.paidBy);
  const expCcy = exp.ccy || BASE;
  const share = exp.amount / exp.split.length;
  const youOwe = exp.split.includes(me) && exp.paidBy !== me ? share : 0;
  const youAreOwed = exp.paidBy === me ? exp.amount - (exp.split.includes(me) ? share : 0) : 0;
  const showOriginal = expCcy !== displayCcy;

  return (
    <li className={"exp" + (open ? " exp-open" : "") + (exp.isSettlement ? " exp-settle" : "")}>
      <button className="exp-row" onClick={() => setOpen(o => !o)}>
        <div className="exp-cat">
          <CatGlyph id={exp.cat} size={36} />
        </div>
        <div className="exp-mid">
          <div className="exp-title">{exp.title}</div>
          <div className="exp-sub">
            <PersonDot id={exp.paidBy} size={14} />
            <span><strong>{payer.name}</strong> paid · {exp.when}</span>
          </div>
        </div>
        <div className="exp-amt">
          <div className={"exp-amt-line" + (displayCcy === "KRW" ? " exp-amt-primary" : "")}>
            {fmtShort(exp.amount, expCcy, rates, "KRW")}
          </div>
          <div className={"exp-amt-line" + (displayCcy === "EUR" ? " exp-amt-primary" : "")}>
            {fmtShort(exp.amount, expCcy, rates, "EUR")}
          </div>
          <div className="exp-your">
            {youOwe > 0      && <span className="lent neg">−{fmtShort(youOwe, expCcy, rates, displayCcy)}</span>}
            {youAreOwed > 0  && <span className="lent pos">+{fmtShort(youAreOwed, expCcy, rates, displayCcy)}</span>}
            {youOwe === 0 && youAreOwed === 0 && <span className="lent zero">—</span>}
          </div>
        </div>
      </button>
      {open && (
        <div className="exp-detail">
          <div className="detail-row">
            <span className="detail-k">paid by</span>
            <span className="detail-v"><PersonChip id={exp.paidBy} selected size="sm" /></span>
          </div>
          <div className="detail-row">
            <span className="detail-k">split between</span>
            <span className="detail-v detail-chips">
              {exp.split.map(id => <PersonChip key={id} id={id} selected size="sm" />)}
            </span>
          </div>
          <div className="detail-row">
            <span className="detail-k">paid in</span>
            <span className="detail-v">
              <strong>{fmt(exp.amount, expCcy, rates, "KRW")}</strong>
              <span className="muted">  ·  {fmt(exp.amount, expCcy, rates, "EUR")}</span>
            </span>
          </div>
          <div className="detail-row">
            <span className="detail-k">each owes</span>
            <span className="detail-v"><strong>{fmt(share, expCcy, rates, "KRW")}</strong><span className="muted">  ·  {fmt(share, expCcy, rates, "EUR")}</span></span>
          </div>
        </div>
      )}
    </li>
  );
}

// ----- ADD EXPENSE -----
function AddExpense({ onClose, onSave, defaultPayer }) {
  const { rates, displayCcy } = useCcy();
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [ccy, setCcy] = useState(displayCcy);
  const [payer, setPayer] = useState(defaultPayer);
  const [split, setSplit] = useState(PEOPLE.map(p => p.id));
  const [cat, setCat] = useState("food");

  function toggle(id) {
    setSplit(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);
  }
  function setAll() { setSplit(PEOPLE.map(p => p.id)); }
  function clearAll() { setSplit([]); }

  const amt = parseFloat(amount.replace(/[^\d.]/g, "")) || 0;
  const each = split.length ? amt / split.length : 0;
  const valid = title.trim() && amt > 0 && split.length > 0;
  const meta = ccyMeta(ccy);

  return (
    <Sheet onClose={onClose} title="new expense">
      <div className="form">
        <label className="field field-big">
          <span className="field-k">what for</span>
          <input
            className="field-input"
            placeholder="bibimbap, taxi…"
            value={title}
            onChange={e => setTitle(e.target.value)}
            autoFocus
          />
        </label>

        <div className="field">
          <div className="field-k-row">
            <span className="field-k">how much</span>
            <div className="ccy-seg">
              {CURRENCIES.map(c => (
                <button
                  key={c.code}
                  type="button"
                  className={"ccy-seg-b " + (ccy === c.code ? "ccy-seg-on" : "")}
                  onClick={() => setCcy(c.code)}
                >
                  {c.symbol}
                </button>
              ))}
            </div>
          </div>
          <div className="amt-input">
            <span className="amt-cur">{meta.symbol}</span>
            <input
              className="amt-num"
              inputMode="decimal"
              placeholder="0"
              value={amount}
              onChange={e => setAmount(e.target.value)}
            />
          </div>
          {amt > 0 && ccy !== displayCcy && (
            <div className="amt-convert">≈ {fmt(amt, ccy, rates, displayCcy)} in {displayCcy.toLowerCase()}</div>
          )}
        </div>

        <div className="field">
          <span className="field-k">category</span>
          <div className="cat-row">
            {CATS.map(c => (
              <button
                key={c.id}
                className={"cat-pill " + (cat === c.id ? "cat-on" : "")}
                onClick={() => setCat(c.id)}
                type="button"
              >
                <CatGlyph id={c.id} size={22} />
                <span>{c.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="field">
          <span className="field-k">who paid</span>
          <div className="chip-row">
            {PEOPLE.map(p => (
              <PersonChip key={p.id} id={p.id} selected={payer === p.id} onClick={() => setPayer(p.id)} size="md" />
            ))}
          </div>
        </div>

        <div className="field">
          <div className="field-k-row">
            <span className="field-k">split between</span>
            <div className="quick-row">
              <button type="button" className="mini" onClick={setAll}>all</button>
              <button type="button" className="mini" onClick={clearAll}>none</button>
            </div>
          </div>
          <div className="chip-row">
            {PEOPLE.map(p => (
              <PersonChip key={p.id} id={p.id} selected={split.includes(p.id)} onClick={() => toggle(p.id)} size="md" />
            ))}
          </div>
          <div className="split-helper">
            {split.length > 0 ? (
              <span><strong>{fmt(each, ccy, rates, ccy)}</strong> <span className="muted">per person · {split.length} {split.length === 1 ? "person" : "people"}</span></span>
            ) : (
              <span className="muted">pick at least one person</span>
            )}
          </div>
        </div>

        <div className="form-foot">
          <button className="btn btn-ghost" onClick={onClose}>cancel</button>
          <button
            className="btn btn-primary"
            disabled={!valid}
            onClick={() => valid && onSave({ title: title.trim(), amount: amt, ccy, paidBy: payer, split, cat })}
          >
            save expense
          </button>
        </div>
      </div>
    </Sheet>
  );
}

// ----- SETTLE UP -----
function SettleUp({ settles, onClose, onSettle, me }) {
  const { rates, displayCcy } = useCcy();
  // per-row currency choice; default to user's display currency
  const [rowCcy, setRowCcy] = useState({});
  const ccyFor = (i) => rowCcy[i] || displayCcy;
  const setCcyFor = (i, c) => setRowCcy(prev => ({ ...prev, [i]: c }));

  return (
    <Sheet onClose={onClose} title="settle up">
      {settles.length === 0 ? (
        <div className="empty-settle">
          <div className="empty-mark">✓</div>
          <div className="empty-title">everyone's even</div>
          <div className="empty-sub">no payments to make. go eat more tteokbokki.</div>
        </div>
      ) : (
        <div className="settle-list">
          <div className="settle-eyebrow">{settles.length} payment{settles.length === 1 ? "" : "s"} clears the trip</div>
          {settles.map((s, i) => {
            const mine = s.from === me || s.to === me;
            const ccy = ccyFor(i);
            const converted = convert(s.amount, BASE, ccy, rates);
            const showAlt = ccy !== BASE;
            return (
              <div key={i} className={"settle-row " + (mine ? "settle-mine" : "")}>
                <div className="settle-people">
                  <PersonChip id={s.from} selected size="md" />
                  <svg className="arrow" viewBox="0 0 40 12" width="36" height="12">
                    <line x1="0" y1="6" x2="32" y2="6" stroke="currentColor" strokeWidth="1.4" />
                    <polyline points="26,1 32,6 26,11" fill="none" stroke="currentColor" strokeWidth="1.4" />
                  </svg>
                  <PersonChip id={s.to} selected size="md" />
                </div>

                <div className="settle-pay-in">
                  <span className="settle-pay-k">pay in</span>
                  <div className="ccy-seg ccy-seg-sm">
                    {CURRENCIES.map(c => (
                      <button
                        key={c.code}
                        type="button"
                        className={"ccy-seg-b " + (ccy === c.code ? "ccy-seg-on" : "")}
                        onClick={() => setCcyFor(i, c.code)}
                      >
                        <span className="ccy-sym">{c.symbol}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="settle-amt">
                  <div className="settle-num">
                    {fmt(converted, ccy, rates, ccy)}
                    {showAlt && (
                      <span className="settle-num-alt"> · {fmt(s.amount, BASE, rates, BASE)}</span>
                    )}
                  </div>
                  <button
                    className="btn btn-mark"
                    onClick={() => onSettle({ ...s, amount: converted, ccy })}
                  >
                    mark paid
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Sheet>
  );
}

// ----- PERSON DETAIL -----
function PersonDetail({ id, expenses, balance, onClose }) {
  const { rates, displayCcy } = useCcy();
  const p = personById(id);
  const involved = expenses.filter(e => e.paidBy === id || e.split.includes(id));
  const paid    = expenses.filter(e => e.paidBy === id).reduce((s,e) => s + convert(e.amount, e.ccy || BASE, BASE, rates), 0);
  const owes    = expenses.filter(e => e.split.includes(id)).reduce((s,e) => s + convert(e.amount, e.ccy || BASE, BASE, rates) / e.split.length, 0);
  const state   = balance > 0.5 ? "pos" : balance < -0.5 ? "neg" : "zero";

  return (
    <Sheet onClose={onClose} title={p.name}>
      <div className={"person-head ph-" + state} style={{ "--tone": p.tone }}>
        <PersonDot id={id} size={52} />
        <div className="person-meta">
          <div className="person-name">{p.name}</div>
          <div className="person-status">
            {state === "pos" ? "is owed" : state === "neg" ? "owes group" : "all settled"}
          </div>
        </div>
        <div className="person-bal">
          {state !== "zero" && <span className="person-sign">{state === "pos" ? "+" : "−"}</span>}
          {state === "zero" ? <span className="person-zero">{ccyMeta(displayCcy).symbol}0</span> : <span>{fmtShort(Math.abs(balance), BASE, rates, displayCcy)}</span>}
        </div>
      </div>
      <div className="person-stats">
        <div className="stat">
          <div className="stat-k">paid</div>
          <div className="stat-v">{fmtShort(paid, BASE, rates, displayCcy)}</div>
        </div>
        <div className="stat">
          <div className="stat-k">share</div>
          <div className="stat-v">{fmtShort(owes, BASE, rates, displayCcy)}</div>
        </div>
        <div className="stat">
          <div className="stat-k">entries</div>
          <div className="stat-v">{involved.length}</div>
        </div>
      </div>
      <div className="person-feed">
        <div className="section-head"><h2>involved in</h2></div>
        <ul className="exp-list exp-list-tight">
          {involved.map(e => <ExpenseRow key={e.id} exp={e} me={id} />)}
        </ul>
      </div>
    </Sheet>
  );
}

// ----- SHEET (bottom drawer on mobile) -----
function Sheet({ children, onClose, title }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);
  return (
    <div className="sheet-wrap" onClick={onClose}>
      <div className="sheet" onClick={e => e.stopPropagation()}>
        <div className="sheet-head">
          <div className="sheet-grab" />
          <div className="sheet-head-row">
            <span className="sheet-title">{title}</span>
            <button className="sheet-x" onClick={onClose} aria-label="close">×</button>
          </div>
        </div>
        <div className="sheet-body">{children}</div>
      </div>
    </div>
  );
}

// ----- TOAST -----
function Toast({ confirmation }) {
  const { rates, displayCcy } = useCcy();
  if (!confirmation) return null;
  return (
    <div className="toast">
      {confirmation.kind === "added" && <span>added <strong>{confirmation.title}</strong></span>}
      {confirmation.kind === "settled" && (
        <span>
          <strong>{personById(confirmation.from).name}</strong> → <strong>{personById(confirmation.to).name}</strong> · {fmt(confirmation.amount, confirmation.ccy || BASE, rates, confirmation.ccy || BASE)}
        </span>
      )}
    </div>
  );
}

// ----- PAPER GRAIN -----
function PaperGrain() {
  return (
    <svg className="grain" aria-hidden="true">
      <filter id="g">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="3" />
        <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.05 0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#g)" />
    </svg>
  );
}

window.App = App;

// ----- MONEY / HERO / BALANCE / CCY PICKER -----
function Money({ value, from }) {
  const { rates, displayCcy } = useCcy();
  return <span>{fmt(value, from, rates, displayCcy)}</span>;
}

function HeroAmount({ amountBase }) {
  const { rates, displayCcy } = useCcy();
  const v = convert(amountBase, BASE, displayCcy, rates);
  const meta = ccyMeta(displayCcy);
  const rounded = meta.decimals === 0 ? Math.round(v) : Math.round(v * 100) / 100;
  return (
    <div className="hero-amount">
      <span className="hero-currency">{meta.symbol}</span>
      <span className="hero-number">{rounded.toLocaleString(undefined, {
        minimumFractionDigits: meta.decimals,
        maximumFractionDigits: meta.decimals,
      })}</span>
    </div>
  );
}

function BalanceNum({ sign, amountBase }) {
  const { rates, displayCcy } = useCcy();
  const txt = fmtShort(amountBase, BASE, rates, displayCcy);
  return (
    <>
      <span className="bal-sign">{sign}</span>
      <span className="bal-num">{txt}</span>
    </>
  );
}

function CcyPicker() {
  const { displayCcy, setDisplayCcy, status, updatedAt } = useCcy();
  // tick label
  const [, t] = useState(0);
  useEffect(() => {
    const id = setInterval(() => t(x => x + 1), 30000);
    return () => clearInterval(id);
  }, []);
  const label = status === "live"      ? "live · " + relTime(updatedAt)
              : status === "refreshing" ? "refreshing…"
              : status === "cached"     ? "cached · " + relTime(updatedAt)
              : status === "loading"    ? "loading…"
              :                           "offline";
  return (
    <div className="ccy-picker">
      <div className="ccy-seg ccy-seg-lg">
        {CURRENCIES.map(c => (
          <button
            key={c.code}
            type="button"
            className={"ccy-seg-b " + (displayCcy === c.code ? "ccy-seg-on" : "")}
            onClick={() => setDisplayCcy(c.code)}
            title={c.label}
          >
            <span className="ccy-sym">{c.symbol}</span>
            <span className="ccy-code">{c.code}</span>
          </button>
        ))}
      </div>
      <div className={"ccy-status ccy-status-" + status}>
        <span className="ccy-dot" />
        <span>{label}</span>
      </div>
    </div>
  );
}
