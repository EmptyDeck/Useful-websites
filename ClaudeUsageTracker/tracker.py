"""Claude 사용량 24/7 추적기.

위젯(../ClaudeUseWidget)과 별개로 돌아가며, 두 계정의 사용량을 주기적으로
수집해 usage-history.jsonl 에 계속 쌓고 그래프로 보여준다.

  실행:  Start-Tracker.bat  (또는 python tracker.py)
  화면:  http://localhost:3457
"""

import http.server
import json
import os
import re
import sys
import threading
import time
from pathlib import Path

# 사용량 수집(claude CLI /usage pty 스크래핑) 로직은 위젯 서버 것을 그대로 재사용한다.
# 한쪽만 고치면 되도록 복사하지 않고 import 한다.
WIDGET_DIR = Path(__file__).resolve().parent.parent / "ClaudeUseWidget"
sys.path.insert(0, str(WIDGET_DIR))
import server as widget  # noqa: E402

HERE = Path(__file__).resolve().parent
HISTORY_FILE = HERE / "usage-history.jsonl"
PORT = int(os.environ.get("TRACKER_PORT", 3457))
POLL_INTERVAL = int(os.environ.get("POLL_SEC", 600))  # 수집 주기(초), 기본 10분

FIELDS = ("session", "week", "weekSonnet", "extra")

_last = {"rows": 0, "at": None, "error": None, "fetching": False}


LOG_FILE = HERE / "tracker.log"


def log(msg):
    line = f"[tracker] {time.strftime('%Y-%m-%d %H:%M:%S')} {msg}"
    print(line, flush=True)
    # pythonw 로 띄우면 stdout 이 사라진다. 파일에도 남겨야 나중에 원인을 볼 수 있다.
    try:
        with LOG_FILE.open("a", encoding="utf-8") as f:
            f.write(line + "\n")
        if LOG_FILE.stat().st_size > 2_000_000:
            tail = LOG_FILE.read_text(encoding="utf-8").splitlines()[-5000:]
            LOG_FILE.write_text("\n".join(tail) + "\n", encoding="utf-8")
    except Exception:
        pass


# 계정별 연속 실패 횟수. 한쪽만 계속 실패하면 프로세스가 맛이 간 것이므로 재시작한다.
# (실제로 8/15 에 계정 a 만 26시간 동안 누락됐고, 새 프로세스에서는 즉시 정상이었다)
_fails = {}
FAIL_LIMIT = 6          # 6번 연속(=약 1시간) 실패하면 자가 재시작


def restart_self():
    log("한쪽 계정이 계속 실패한다. 프로세스를 재시작한다.")
    try:
        os.execv(sys.executable, [sys.executable, str(Path(__file__).resolve())])
    except Exception as e:
        log(f"재시작 실패: {e}")


def collect():
    """두 계정을 순서대로 수집해 한 줄로 기록한다."""
    row = {"t": int(time.time() * 1000)}
    for acct in widget.ACCOUNTS:
        key = acct["key"]
        try:
            data = widget.fetch_usage_pty(acct.get("config_dir"))
        except Exception as e:
            log(f"{key} 수집 실패: {e}")
            _fails[key] = _fails.get(key, 0) + 1
            continue
        if not data or not (data.get("session") or data.get("week")):
            log(f"{key} 사용량 파싱 실패 (연속 {_fails.get(key, 0) + 1}회)")
            _fails[key] = _fails.get(key, 0) + 1
            continue
        _fails[key] = 0
        entry = {"name": widget.account_label(acct)}
        for f in FIELDS:
            v = data.get(f)
            if isinstance(v, dict) and v.get("percent") is not None:
                entry[f] = v["percent"]
                # 리셋 시각도 같이 남긴다 ("5:30pm (Asia/Seoul)" 같은 문자열)
                if v.get("resetTime"):
                    entry[f + "Reset"] = v["resetTime"]
        row[key] = entry

    if len(row) == 1:
        _last["error"] = "수집된 계정 없음"
        return
    # append + fsync: 갑자기 전원이 나가도 이미 쓴 줄은 디스크에 남는다.
    with HISTORY_FILE.open("a", encoding="utf-8") as f:
        f.write(json.dumps(row, ensure_ascii=False) + "\n")
        f.flush()
        os.fsync(f.fileno())
    _last.update(at=row["t"], error=None, fails=dict(_fails))
    log("기록: " + ", ".join(
        f"{k}={v.get('session')}%/{v.get('week')}%" for k, v in row.items() if k != "t"))

    # 한 계정만 계속 실패하는데 다른 계정은 멀쩡하다면 프로세스 문제다
    if any(n >= FAIL_LIMIT for n in _fails.values()):
        restart_self()


def poll_loop():
    while True:
        _last["fetching"] = True
        try:
            collect()
        except Exception as e:
            _last["error"] = str(e)
            log(f"오류: {e}")
        finally:
            _last["fetching"] = False
        time.sleep(POLL_INTERVAL)


def load_history(hours=None):
    cutoff = (time.time() - hours * 3600) * 1000 if hours else None
    rows = []
    try:
        with HISTORY_FILE.open("r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if not line:
                    continue
                try:
                    row = json.loads(line)
                except Exception:
                    continue
                if cutoff and row.get("t", 0) < cutoff:
                    continue
                rows.append(row)
    except FileNotFoundError:
        pass
    return rows


class Handler(http.server.BaseHTTPRequestHandler):
    def log_message(self, *args):
        pass

    def do_GET(self):
        path = self.path.split("?")[0]
        if path in ("/", "/graph"):
            self.send_file("history.html", "text/html; charset=utf-8")
        elif path == "/api/history":
            m = re.search(r'hours=(\d+)', self.path)
            self.send_json({
                "rows": load_history(int(m.group(1)) if m else None),
                "pollSec": POLL_INTERVAL,
                "status": _last,
            })
        elif path == "/api/collect":
            threading.Thread(target=collect, daemon=True).start()
            self.send_json({"ok": True})
        else:
            self.send_response(404)
            self.end_headers()

    def send_json(self, obj):
        body = json.dumps(obj, ensure_ascii=False).encode("utf-8")
        self.send_response(200)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Content-Length", len(body))
        self.end_headers()
        self.wfile.write(body)

    def send_file(self, name, ctype):
        try:
            content = (HERE / name).read_bytes()
        except FileNotFoundError:
            self.send_response(404)
            self.end_headers()
            return
        self.send_response(200)
        self.send_header("Content-Type", ctype)
        # 페이지를 고쳐도 브라우저가 옛날 HTML 을 계속 보여주는 걸 막는다
        self.send_header("Cache-Control", "no-store, must-revalidate")
        self.send_header("Content-Length", len(content))
        self.end_headers()
        self.wfile.write(content)


def backup_history():
    """시작할 때 하루 한 번 사본을 남긴다. 실수로 지워도 되돌릴 수 있게."""
    if not HISTORY_FILE.exists():
        return
    bdir = HERE / "backups"
    bdir.mkdir(exist_ok=True)
    dest = bdir / f"usage-history-{time.strftime('%Y%m%d')}.jsonl"
    if dest.exists():
        return
    try:
        dest.write_bytes(HISTORY_FILE.read_bytes())
        log(f"백업: backups/{dest.name}")
        # 30일치만 유지
        old = sorted(bdir.glob("usage-history-*.jsonl"))[:-30]
        for p in old:
            p.unlink()
    except Exception as e:
        log(f"백업 실패: {e}")


if __name__ == "__main__":
    backup_history()
    log(f"화면: http://localhost:{PORT}")
    log(f"{POLL_INTERVAL}초마다 수집 → {HISTORY_FILE.name}")
    threading.Thread(target=poll_loop, daemon=True).start()
    try:
        http.server.HTTPServer(("localhost", PORT), Handler).serve_forever()
    except KeyboardInterrupt:
        log("종료")
