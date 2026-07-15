import glob
import http.server
import json
import os
import re
import subprocess
import sys
import threading
import time
from pathlib import Path

import winpty

PORT = 3456
CACHE_FILE = Path(__file__).parent / ".usage-cache.json"
CWD = str(Path(__file__).parent)

# 계정 목록. config_dir 은 각 계정의 CLAUDE_CONFIG_DIR 폴더.
# 자격증명(.credentials.json)은 유출 위험 때문에 이 git 폴더가 아니라
# 홈 밑에 둔다. 라벨(name)은 각 폴더의 .claude.json 이메일을 자동으로 읽는다.
ACCOUNTS = [
    # 기본 계정은 CLAUDE_CONFIG_DIR 를 지정하지 않는다(=None). 지정하면
    # claude 가 설정을 <dir>/.claude.json 에서 찾는데 기본 계정의 실제 파일은
    # 홈 루트 ~/.claude.json 이라 로그인 안 된 것처럼 온보딩이 뜬다.
    {"key": "a", "config_dir": None},
    {"key": "b", "config_dir": str(Path.home() / ".claude-acct2")},
]


def account_label(acct):
    """설정 폴더의 .claude.json 에서 로그인 이메일을 읽어 라벨로 사용."""
    cfg = acct.get("config_dir")
    candidates = []
    if cfg:
        candidates.append(Path(cfg) / ".claude.json")
    # 기본 폴더(~/.claude)는 .claude.json 이 홈 루트에 있는 경우가 있다
    candidates.append(Path.home() / ".claude.json")
    for p in candidates:
        try:
            email = json.loads(p.read_text(encoding="utf-8"))["oauthAccount"]["emailAddress"]
            if email:
                return email
        except Exception:
            continue
    return acct["key"]

_fetching = False
_fetch_lock = threading.Lock()


def find_claude():
    home = Path.home()
    pattern = str(home / ".vscode" / "extensions" / "anthropic.claude-code-*" / "resources" / "native-binary" / "claude.exe")
    matches = sorted(glob.glob(pattern))
    if matches:
        return matches[-1]
    pkg_pattern = str(home / "AppData" / "Local" / "Packages" / "Claude_*" / "LocalCache" / "Roaming" / "Claude" / "claude-code" / "*" / "claude.exe")
    matches = sorted(glob.glob(pkg_pattern))
    if matches:
        return matches[-1]
    for cmd in (["where", "claude"], ["which", "claude"]):
        try:
            r = subprocess.run(cmd, capture_output=True, text=True)
            if r.returncode == 0:
                return r.stdout.strip().splitlines()[0]
        except Exception:
            pass
    raise RuntimeError("claude CLI를 찾을 수 없습니다")


def clean_output(raw):
    s = re.sub(r'\x1b\[(\d+)C', lambda m: ' ' * int(m.group(1)), raw)
    s = re.sub(r'\x1b\[\d+;\d+H', '\n', s)
    s = re.sub(r'\x1b\[[^A-Za-z]*[A-Za-z]', '', s)
    s = re.sub(r'\x1b\][^\x07]*\x07', '', s)
    s = re.sub(r'\x1b.', '', s)
    s = re.sub(r'[█▉▊▋▌▍▎▏░▒▓▐▛▜▝▘▗▖▞▟]', '', s)
    s = re.sub(r'\t', ' ', s)
    s = re.sub(r' {2,}', ' ', s)
    return '\n'.join(l.strip() for l in s.splitlines() if l.strip())


def parse_usage(text):
    result = {
        "session": None, "week": None,
        "weekSonnet": None, "extra": None,
        "timestamp": int(time.time() * 1000),
    }

    # Find all "NN% used"
    pct_matches = re.findall(r'(\d+)\s*%\s*used', text, re.IGNORECASE)
    # Find reset times like "Resets 12:50pm (Asia/Seoul)" or "Resets Apr 30, 12pm ..."
    reset_matches = re.findall(r'[Rr]esets?\s+([\w\d,: ]+\([\w/]+\))', text)
    # Spend pattern
    spend_match = re.search(r'\$(\d+\.?\d*)\s*/\s*\$(\d+\.?\d*)\s*spent', text, re.IGNORECASE)

    keys = ["session", "week", "weekSonnet", "extra"]
    for i, key in enumerate(keys):
        if i >= len(pct_matches):
            break
        result[key] = {"percent": int(pct_matches[i])}
        if i < len(reset_matches):
            result[key]["resetTime"] = re.sub(r'\s+', ' ', reset_matches[i].strip())

    if result["extra"] and spend_match:
        result["extra"]["spent"] = float(spend_match.group(1))
        result["extra"]["limit"] = float(spend_match.group(2))

    return result


def save_cache(data):
    try:
        CACHE_FILE.write_text(json.dumps(data, indent=2), encoding="utf-8")
    except Exception:
        pass


def load_cache():
    try:
        data = json.loads(CACHE_FILE.read_text(encoding="utf-8"))
        data["fromCache"] = True
        return data
    except Exception:
        return None


def fetch_usage_pty(config_dir=None):
    claude = find_claude()
    # 부모가 Claude Code 세션이면 CLAUDE_CODE_*/CLAUDECODE 등이 상속돼
    # 자식 claude 가 자식 세션으로 붙어 /usage 가 꼬인다. 깨끗한 환경으로 실행.
    env = {
        k: v for k, v in os.environ.items()
        if not (k.startswith("CLAUDE_CODE") or k.startswith("CLAUDE_AGENT")
                or k in ("CLAUDECODE", "CLAUDE_EFFORT", "AI_AGENT"))
    }
    env["NO_COLOR"] = "1"
    env["FORCE_COLOR"] = "0"
    if config_dir:
        env["CLAUDE_CONFIG_DIR"] = config_dir

    proc = winpty.PtyProcess.spawn(
        [claude],
        dimensions=(80, 120),
        env=env,
        cwd=CWD,
    )

    parts = []

    def reader():
        while True:
            try:
                chunk = proc.read(4096)
                if chunk:
                    parts.append(chunk)
            except Exception:
                break

    threading.Thread(target=reader, daemon=True).start()

    def current():
        return clean_output(''.join(parts))

    def wait_for(keywords, timeout=10):
        end = time.time() + timeout
        while time.time() < end:
            text = current().lower()
            for kw in keywords:
                if kw.lower() in text:
                    return kw
            time.sleep(0.25)
        return None

    # Step 1: Wait for initial prompt or trust dialog
    hit = wait_for(['effort', 'shortcuts', 'trust this folder', 'trust the folder'], timeout=10)

    # Step 2: If trust dialog, press Enter to confirm
    if hit and 'trust' in hit:
        proc.write('\r')
        time.sleep(1)
        wait_for(['effort', 'shortcuts'], timeout=8)

    # Step 2b: 새 계정 첫 실행 시 뜨는 온보딩 모달들(Chrome 확장, 풀스크린 렌더러 등)을
    # Esc로 닫는다. 이 모달들은 프롬프트(shortcuts/effort)를 가려 /usage 를 막는다.
    modal_kw = ['chrome extension', 'fullscreen renderer', 'esc to keep', 'esc to cancel']
    for _ in range(4):
        text = current().lower()
        if any(kw in text for kw in modal_kw):
            proc.write('\x1b')  # Esc: 기본 유지/취소 (브라우저 툴 off, 렌더러 취소)
            time.sleep(1.2)
        else:
            break

    # Short settle time
    time.sleep(1)

    # Step 3: Send /usage
    proc.write('/usage\r')
    time.sleep(7)
    proc.write('\r')
    time.sleep(1)

    text = current()

    try:
        proc.write('/exit\r')
        time.sleep(0.5)
        proc.close()
    except Exception:
        pass

    return parse_usage(text)


def do_fetch():
    global _fetching
    with _fetch_lock:
        if _fetching:
            return
        _fetching = True
    try:
        prev = load_cache() or {}
        prev_accounts = prev.get("accounts", {})
        accounts = {}
        for acct in ACCOUNTS:
            key = acct["key"]
            try:
                data = fetch_usage_pty(acct.get("config_dir"))
            except Exception as e:
                print(f"[fetch] {key} Error: {e}")
                data = None
            label = account_label(acct)
            if data and (data.get("session") or data.get("week")):
                accounts[key] = {"name": label, "usage": data}
            else:
                # 파싱 실패 시 이전 캐시 유지 (로그인 안 됐거나 일시 오류)
                print(f"[fetch] {key}: 사용량 파싱 실패")
                if key in prev_accounts:
                    accounts[key] = prev_accounts[key]
                else:
                    accounts[key] = {"name": label, "usage": None}
        save_cache({"accounts": accounts, "timestamp": int(time.time() * 1000)})
    except Exception as e:
        print(f"[fetch] Error: {e}")
    finally:
        with _fetch_lock:
            _fetching = False


class Handler(http.server.BaseHTTPRequestHandler):
    def log_message(self, format, *args):
        pass

    def do_GET(self):
        if self.path == "/":
            self.serve_file("index.html", "text/html; charset=utf-8")
        elif self.path == "/api/usage":
            self.serve_usage()
        elif self.path == "/api/refresh":
            self.trigger_refresh()
        elif self.path == "/api/status":
            self.serve_status()
        else:
            self.send_response(404)
            self.end_headers()

    def serve_file(self, filename, content_type):
        filepath = Path(__file__).parent / filename
        try:
            content = filepath.read_bytes()
            self.send_response(200)
            self.send_header("Content-Type", content_type)
            self.send_header("Content-Length", len(content))
            self.end_headers()
            self.wfile.write(content)
        except FileNotFoundError:
            self.send_response(404)
            self.end_headers()

    def serve_usage(self):
        data = load_cache() or {"error": "No data yet. Click refresh."}
        body = json.dumps(data, ensure_ascii=False).encode("utf-8")
        self.send_response(200)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Content-Length", len(body))
        self.end_headers()
        self.wfile.write(body)

    def serve_status(self):
        with _fetch_lock:
            fetching = _fetching
        body = json.dumps({"fetching": fetching}).encode()
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", len(body))
        self.end_headers()
        self.wfile.write(body)

    def trigger_refresh(self):
        threading.Thread(target=do_fetch, daemon=True).start()
        body = b'{"ok": true}'
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", len(body))
        self.end_headers()
        self.wfile.write(body)


if __name__ == "__main__":
    print(f"[Claude Usage] http://localhost:{PORT}")
    if not CACHE_FILE.exists():
        print("[Claude Usage] 첫 실행 - 데이터 가져오는 중... (~15초)")
        threading.Thread(target=do_fetch, daemon=True).start()

    server = http.server.HTTPServer(("localhost", PORT), Handler)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n[Claude Usage] 서버 종료")
