import ctypes
import datetime
import glob
import json
import os
import re
import subprocess
import sys
import threading
import time
import tkinter as tk
import tkinter.font as tkfont
from pathlib import Path

# Make fonts crisp on high-DPI screens
try:
    ctypes.windll.shcore.SetProcessDpiAwareness(2)
except Exception:
    try:
        ctypes.windll.user32.SetProcessDPIAware()
    except Exception:
        pass

# Ensure a console exists for ConPTY to work, then hide it
if getattr(sys, 'frozen', False):
    ctypes.windll.kernel32.AllocConsole()
    hwnd = ctypes.windll.kernel32.GetConsoleWindow()
    if hwnd:
        ctypes.windll.user32.ShowWindow(hwnd, 0)

if getattr(sys, 'frozen', False):
    _BASE = Path(sys.executable).parent
else:
    _BASE = Path(__file__).parent

CACHE_FILE = _BASE / ".usage-cache.json"
CWD = str(_BASE)
REFRESH_INTERVAL_MS = 60 * 1000  # 1 minute

FONT = "맑은 고딕"

# Colors
BG        = "#111318"
SURFACE   = "#1c1f26"
BORDER    = "#2a2d36"
TEXT      = "#e2e8f0"
MUTED     = "#64748b"
C_SESSION = "#3b82f6"
C_WEEK    = "#22c55e"
C_SONNET  = "#a855f7"
C_DESIGN  = "#f59e0b"
C_DANGER  = "#f97316"
C_CRIT    = "#ef4444"

KST = datetime.timezone(datetime.timedelta(hours=9))
MONTHS = {"jan":1,"feb":2,"mar":3,"apr":4,"may":5,"jun":6,
          "jul":7,"aug":8,"sep":9,"oct":10,"nov":11,"dec":12}
DAYS_KO = ["월","화","수","목","금","토","일"]

# 계정 목록. 두 계정 모두 "전용" 설정 폴더를 쓴다. 기본 폴더(~/.claude)는
# 평소 Claude 사용 중 /login 으로 쉽게 바뀌므로 위젯이 의존하지 않는다.
ACCOUNTS = [
    {"key": "a", "config_dir": str(Path.home() / ".claude-acct1")},
    {"key": "b", "config_dir": str(Path.home() / ".claude-acct2")},
]


def account_label(acct):
    """해당 계정 폴더의 .claude.json 에서 로그인 이메일만 읽어 라벨로 사용."""
    cfg = acct.get("config_dir")
    p = (Path(cfg) / ".claude.json") if cfg else (Path.home() / ".claude.json")
    try:
        email = json.loads(p.read_text(encoding="utf-8"))["oauthAccount"]["emailAddress"]
        if email:
            return email
    except Exception:
        pass
    return acct.get("key", "?")


# ── PTY fetch ────────────────────────────────────────────────────────────────

def find_claude():
    home = Path.home()
    pattern = str(home / ".vscode" / "extensions" / "anthropic.claude-code-*"
                  / "resources" / "native-binary" / "claude.exe")
    m = sorted(glob.glob(pattern))
    if m: return m[-1]
    pkg = str(home / "AppData" / "Local" / "Packages" / "Claude_*"
              / "LocalCache" / "Roaming" / "Claude" / "claude-code" / "*" / "claude.exe")
    m = sorted(glob.glob(pkg))
    if m: return m[-1]
    for cmd in (["where", "claude"], ["which", "claude"]):
        try:
            r = subprocess.run(cmd, capture_output=True, text=True)
            if r.returncode == 0: return r.stdout.strip().splitlines()[0]
        except Exception: pass
    raise RuntimeError("claude not found")


def clean_output(raw):
    s = re.sub(r'\x1b\[(\d+)C', lambda m: ' ' * int(m.group(1)), raw)
    s = re.sub(r'\x1b\[\d+;\d+H', '\n', s)
    s = re.sub(r'\x1b\[[^A-Za-z]*[A-Za-z]', '', s)
    s = re.sub(r'\x1b\][^\x07]*\x07', '', s)
    s = re.sub(r'\x1b.', '', s)
    s = re.sub(r'[█▉▊▋▌▍▎▏░▒▓▐▛▜▝▘▗▖▞▟]', '', s)
    s = re.sub(r' {2,}', ' ', s)
    return '\n'.join(l.strip() for l in s.splitlines() if l.strip())


def parse_usage(text):
    result = {"session": None, "week": None, "weekSonnet": None, "design": None,
              "timestamp": int(time.time() * 1000)}
    pct = re.findall(r'(\d+)\s*%\s*used', text, re.IGNORECASE)
    resets = re.findall(r'[Rr]esets?\s+([\w\d,: ]+\([\w/]+\))', text)
    for i, key in enumerate(["session", "week", "weekSonnet", "design"]):
        if i >= len(pct): break
        result[key] = {"percent": int(pct[i])}
        if i < len(resets):
            result[key]["resetTime"] = re.sub(r'\s+', ' ', resets[i].strip())
    return result


def save_cache(data):
    try: CACHE_FILE.write_text(json.dumps(data, indent=2), encoding="utf-8")
    except Exception: pass


def load_cache():
    try: return json.loads(CACHE_FILE.read_text(encoding="utf-8"))
    except Exception: return None


LOG = _BASE / "debug.log"

def log(msg):
    try:
        with open(LOG, "a", encoding="utf-8") as f:
            f.write(f"[{time.strftime('%H:%M:%S')}] {msg}\n")
    except Exception:
        pass


def fetch_pty(config_dir=None):
    log(f"fetch_pty start, CWD={CWD}, config_dir={config_dir}")
    try:
        import winpty
        log("winpty imported OK")
    except ImportError as e:
        log(f"winpty import FAILED: {e}")
        return None

    try:
        claude = find_claude()
        log(f"claude: {claude}")
    except Exception as e:
        log(f"find_claude FAILED: {e}")
        return None

    keep = {"USERPROFILE", "HOME", "APPDATA", "LOCALAPPDATA", "TEMP", "TMP",
            "PATH", "PATHEXT", "SYSTEMROOT", "SYSTEMDRIVE", "WINDIR",
            "COMPUTERNAME", "USERNAME", "USERDOMAIN", "OS",
            "PROCESSOR_ARCHITECTURE", "NUMBER_OF_PROCESSORS",
            "PROGRAMFILES", "PROGRAMFILES(X86)", "COMMONPROGRAMFILES"}
    env = {k: v for k, v in os.environ.items() if k.upper() in keep}
    env["NO_COLOR"] = "1"
    env["FORCE_COLOR"] = "0"
    if config_dir:
        env["CLAUDE_CONFIG_DIR"] = config_dir
    log(f"clean env built, keys={sorted(env.keys())}")

    try:
        import ctypes as _ct
        _ct.windll.kernel32.SetConsoleCtrlHandler(None, True)
        proc = winpty.PtyProcess.spawn([claude], dimensions=(80, 120), env=env, cwd=CWD,
                                      backend=winpty.Backend.WinPTY)
        log(f"spawned PID={proc.pid}")
    except Exception as e:
        log(f"spawn FAILED: {e}")
        return None

    parts = []

    def reader():
        while True:
            try:
                c = proc.read(4096)
                if c:
                    parts.append(c)
                    log(f"read {len(c)}b total={sum(len(x) for x in parts)}")
            except Exception as e:
                log(f"reader exit: {e}")
                break

    threading.Thread(target=reader, daemon=True).start()

    def current(): return clean_output(''.join(parts))

    def wait_for(kws, timeout=10):
        end = time.time() + timeout
        while time.time() < end:
            t = current().lower()
            for k in kws:
                if k.lower() in t:
                    log(f"wait_for matched: {k}")
                    return k
            time.sleep(0.25)
        log(f"wait_for timeout, kws={kws}")
        return None

    hit = wait_for(['effort', 'shortcuts', 'trust this folder', 'trust the folder'], 10)
    if hit and 'trust' in str(hit):
        proc.write('\r')
        time.sleep(1)
        wait_for(['effort', 'shortcuts'], 8)

    # 새 계정 첫 실행 시 뜨는 온보딩 모달(Chrome 확장/풀스크린 렌더러 등)을 Esc로 닫는다.
    modal_kw = ['chrome extension', 'fullscreen renderer', 'esc to keep', 'esc to cancel']
    for _ in range(4):
        t = current().lower()
        if any(kw in t for kw in modal_kw):
            log("dismissing onboarding modal with Esc")
            proc.write('\x1b')
            time.sleep(1.2)
        else:
            break

    time.sleep(1)
    log("sending /usage")
    proc.write('/usage\r')
    time.sleep(7)
    proc.write('\r')
    time.sleep(1)
    text = current()
    log(f"final text len={len(text)}, sample={repr(text[:200])}")

    try: proc.write('/exit\r'); time.sleep(0.5); proc.close()
    except Exception: pass

    data = parse_usage(text)
    log(f"parsed: {data}")
    if data.get("session") or data.get("week"):
        return data
    log("no usage data parsed")
    return None


FETCH_TIMEOUT_S = 45  # 계정 하나가 이 시간 넘게 걸리면 포기하고 넘어간다


def _fetch_one(config_dir, out):
    try:
        out["data"] = fetch_pty(config_dir)
    except Exception as e:
        log(f"_fetch_one error: {e}")
        out["data"] = None


def fetch_all():
    """모든 계정의 사용량을 수집해 {accounts:{...}, timestamp} 로 저장/반환."""
    prev = load_cache() or {}
    prev_acc = prev.get("accounts", {})
    accounts = {}
    for acct in ACCOUNTS:
        key = acct["key"]
        data = None
        # 각 계정 수집을 워커 스레드로 돌리고 타임아웃을 건다.
        # spawn/read 가 멈춰도 위젯 전체가 죽지 않도록 방어.
        out = {}
        t = threading.Thread(target=_fetch_one, args=(acct.get("config_dir"), out),
                             daemon=True)
        t.start()
        t.join(FETCH_TIMEOUT_S)
        if t.is_alive():
            log(f"fetch_all {key} TIMEOUT ({FETCH_TIMEOUT_S}s) — 건너뜀")
        else:
            data = out.get("data")
        label = account_label(acct)
        if data and (data.get("session") or data.get("week")):
            accounts[key] = {"name": label, "usage": data}
        elif key in prev_acc:
            accounts[key] = prev_acc[key]  # 실패 시 이전 값 유지
        else:
            accounts[key] = {"name": label, "usage": None}
    result = {"accounts": accounts, "timestamp": int(time.time() * 1000)}
    save_cache(result)
    return result


# ── Widget UI ─────────────────────────────────────────────────────────────────

class UsageWidget:
    def __init__(self):
        self.root = tk.Tk()
        self.root.title("Claude Usage")
        self.root.overrideredirect(True)
        self.root.wm_attributes("-topmost", True)
        self.root.wm_attributes("-alpha", 0.92)
        self.root.configure(bg=BG)
        self.root.resizable(False, False)

        self._drag_x = 0
        self._drag_y = 0
        self._fetching = False
        self._data = load_cache()

        self._build_ui()
        self._restore_position()

        self.root.bind("<ButtonPress-1>", self._drag_start)
        self.root.bind("<B1-Motion>", self._drag_move)
        self.root.bind("<Escape>", lambda e: self.root.destroy())

        self._render()
        self.root.after(REFRESH_INTERVAL_MS, self._auto_refresh)

    # ── layout ────────────────────────────────────────────────────────────────

    def _build_ui(self):
        W = 280
        self.canvas = tk.Canvas(self.root, width=W, height=20,
                                bg=BG, highlightthickness=0)
        self.canvas.pack(fill="both", expand=True)

        # Header title
        self.canvas.create_text(14, 14, text="Claude 사용량",
                                font=(FONT, 10, "bold"),
                                fill=TEXT, anchor="w", tags="header")

        # ↻ button — placed right after title text
        f = tkfont.Font(family=FONT, size=10, weight="bold")
        title_w = f.measure("Claude 사용량")
        rx = 14 + title_w + 10
        self.refresh_btn = self.canvas.create_text(rx, 14, text="↻",
                                font=(FONT, 12), fill=MUTED, anchor="w",
                                tags="refresh_btn")
        self.canvas.tag_bind("refresh_btn", "<Button-1>", lambda e: self._trigger_refresh())
        self.canvas.tag_bind("refresh_btn", "<Enter>",
                             lambda e: self.canvas.itemconfig("refresh_btn", fill=TEXT))
        self.canvas.tag_bind("refresh_btn", "<Leave>",
                             lambda e: self.canvas.itemconfig("refresh_btn", fill=MUTED))

        # Status dot + time
        self.status_dot = self.canvas.create_oval(0, 0, 0, 0,
                                                   fill=MUTED, outline="", tags="dot")
        self.status_text = self.canvas.create_text(0, 0, text="",
                                                    font=(FONT, 8),
                                                    fill=MUTED, anchor="e", tags="status")

        # Close button
        self.canvas.create_text(W - 8, 14, text="✕",
                                font=(FONT, 9), fill=MUTED, anchor="e",
                                tags="close")
        self.canvas.tag_bind("close", "<Button-1>", lambda e: self.root.destroy())
        self.canvas.tag_bind("close", "<Enter>",
                             lambda e: self.canvas.itemconfig("close", fill=TEXT))
        self.canvas.tag_bind("close", "<Leave>",
                             lambda e: self.canvas.itemconfig("close", fill=MUTED))

    def _render(self):
        W = 280
        pad = 14
        data = self._data
        accounts = data.get("accounts") if data else None

        self.canvas.delete("section")
        self.canvas.delete("spinner")

        y = 34
        row_defs = [("session", "세션", C_SESSION), ("week", "주간 전체", C_WEEK)]

        if not accounts and not self._fetching:
            self.canvas.create_text(W // 2, y + 20, text="↻ 버튼으로 새로고침",
                                    font=(FONT, 9), fill=MUTED,
                                    anchor="center", tags="section")
            total_h = y + 50
        else:
            row_h = 38
            for idx, (key, acct) in enumerate(sorted((accounts or {}).items())):
                if idx > 0:
                    # 계정 구분선
                    self.canvas.create_line(pad, y - 4, W - pad, y - 4,
                                            fill=BORDER, tags="section")
                    y += 6
                # 이메일 헤더
                name = acct.get("name", key)
                self.canvas.create_oval(pad, y + 2, pad + 6, y + 8,
                                        fill=C_SESSION, outline="", tags="section")
                self.canvas.create_text(pad + 12, y + 5, text=name,
                                        font=(FONT, 8, "bold"),
                                        fill=C_SESSION, anchor="w", tags="section")
                y += 18

                usage = acct.get("usage")
                drew = False
                for rk, label, color in row_defs:
                    d = usage.get(rk) if usage else None
                    if not d:
                        continue
                    drew = True
                    pct = d["percent"]
                    reset = d.get("resetTime", "")
                    bar_color = C_CRIT if pct >= 90 else C_DANGER if pct >= 75 else color
                    self._draw_row(y, W, label, pct, reset, bar_color)
                    y += row_h
                if not drew:
                    self.canvas.create_text(W // 2, y + 8, text="로그인 필요",
                                            font=(FONT, 8), fill=MUTED,
                                            anchor="center", tags="section")
                    y += 22
                y += 6
            total_h = y + 2

        self.canvas.config(height=total_h)

        if self._fetching:
            self._set_status("fetching", "가져오는 중...")
            self.canvas.itemconfig("refresh_btn", fill=C_SESSION)
        elif data:
            ts = time.strftime("%H:%M", time.localtime(data["timestamp"] / 1000))
            self._set_status("live", ts)
            self.canvas.itemconfig("refresh_btn", fill=MUTED)
        else:
            self._set_status("none", "")
            self.canvas.itemconfig("refresh_btn", fill=MUTED)

        self.canvas.coords(self.status_dot, W - 68, 9, W - 60, 17)
        self.canvas.coords(self.status_text, W - 20, 14)

    def _draw_row(self, y, W, label, pct, reset, bar_color):
        pad = 14
        bar_w = W - pad * 2
        bar_h = 6
        bar_y = y + 22

        self.canvas.create_text(pad, y + 6, text=label,
                                font=(FONT, 8, "bold"),
                                fill=MUTED, anchor="w", tags="section")
        self.canvas.create_text(W - pad, y + 6, text=f"{pct}%",
                                font=(FONT, 9, "bold"),
                                fill=TEXT, anchor="e", tags="section")

        reset_label = self._format_reset(reset)
        if reset_label:
            self.canvas.create_text(W - pad, y + 17, text=reset_label,
                                    font=(FONT, 7),
                                    fill=MUTED, anchor="e", tags="section")

        self.canvas.create_rectangle(pad, bar_y, pad + bar_w, bar_y + bar_h,
                                     fill="#0d0f13", outline="", tags="section")
        fill_w = max(3, int(bar_w * pct / 100))
        self.canvas.create_rectangle(pad, bar_y, pad + fill_w, bar_y + bar_h,
                                     fill=bar_color, outline="", tags="section")

    def _format_reset(self, reset_str):
        if not reset_str: return ""
        now = datetime.datetime.now(KST)

        # Date-based reset: "Apr 30, 12pm" → "목요일 리셋"
        m = re.search(r'([A-Za-z]{3})\s+(\d{1,2})', reset_str)
        if m:
            month = MONTHS.get(m.group(1).lower())
            day = int(m.group(2))
            if month:
                try:
                    target = datetime.datetime(now.year, month, day, tzinfo=KST)
                    if target.date() < now.date():
                        target = target.replace(year=now.year + 1)
                    return f"{DAYS_KO[target.weekday()]}요일 리셋"
                except Exception:
                    pass
            return ""

        # Time-based reset: "5:50pm" 또는 분 없는 "4pm" → "X시간 X분 후 리셋"
        m = re.search(r'(\d{1,2})(?::(\d{2}))?\s*(am|pm)', reset_str, re.IGNORECASE)
        if m:
            h = int(m.group(1))
            mn = int(m.group(2)) if m.group(2) else 0
            ampm = m.group(3).lower()
            if ampm == 'pm' and h != 12: h += 12
            if ampm == 'am' and h == 12: h = 0
            target = now.replace(hour=h, minute=mn, second=0, microsecond=0)
            if target <= now:
                target += datetime.timedelta(days=1)
            diff = target - now
            total_min = int(diff.total_seconds() / 60)
            hrs, mins = total_min // 60, total_min % 60
            if hrs > 0:
                return f"{hrs}시간 {mins}분 후 리셋"
            return f"{mins}분 후 리셋"
        return ""

    def _set_status(self, state, text):
        colors = {"live": "#22c55e", "fetching": "#3b82f6",
                  "cached": "#eab308", "none": MUTED}
        self.canvas.itemconfig(self.status_dot, fill=colors.get(state, MUTED))
        self.canvas.itemconfig(self.status_text, text=text)

    # ── drag ──────────────────────────────────────────────────────────────────

    def _drag_start(self, e):
        self._drag_x = e.x_root - self.root.winfo_x()
        self._drag_y = e.y_root - self.root.winfo_y()

    def _drag_move(self, e):
        x = e.x_root - self._drag_x
        y = e.y_root - self._drag_y
        self.root.geometry(f"+{x}+{y}")

    # ── position persistence ───────────────────────────────────────────────────

    def _pos_file(self): return _BASE / ".widget-pos.json"

    def _restore_position(self):
        try:
            pos = json.loads(self._pos_file().read_text())
            self.root.geometry(f"+{pos['x']}+{pos['y']}")
        except Exception:
            sw = self.root.winfo_screenwidth()
            sh = self.root.winfo_screenheight()
            self.root.geometry(f"+{sw - 320}+{sh - 280}")

        def save_on_move(e):
            try:
                self._pos_file().write_text(
                    json.dumps({"x": self.root.winfo_x(), "y": self.root.winfo_y()}))
            except Exception: pass

        self.root.bind("<ButtonRelease-1>", save_on_move)

    # ── refresh ───────────────────────────────────────────────────────────────

    def _trigger_refresh(self):
        if self._fetching:
            # 워치독: 이전 새로고침이 비정상적으로 오래 걸리면 포기하고 재시도 허용
            if time.time() - getattr(self, "_fetch_started", 0) > 150:
                log("watchdog: 이전 fetch 가 150s 초과 — 강제 해제")
                self._fetching = False
            else:
                return
        self._fetching = True
        self._fetch_started = time.time()
        self._render()
        threading.Thread(target=self._do_fetch, daemon=True).start()

    def _do_fetch(self):
        try:
            self._data = fetch_all()
        except Exception as e:
            log(f"fetch error: {e}")
            cached = load_cache()
            if cached: self._data = cached
        finally:
            self._fetching = False
            self.root.after(0, self._render)

    def _auto_refresh(self):
        self._trigger_refresh()
        self.root.after(REFRESH_INTERVAL_MS, self._auto_refresh)

    def run(self):
        if not (self._data and self._data.get("accounts")):
            self._trigger_refresh()
        self.root.mainloop()


if __name__ == "__main__":
    UsageWidget().run()
