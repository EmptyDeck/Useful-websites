"""
더치페이 - 다중 그룹 지출 관리 서버
"""
import base64
import hashlib
import http.server
import json
import os
import re
import socket
import socketserver
import sys
import threading
import urllib.request
from datetime import datetime

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8282

ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
STATIC_DIR = os.path.join(ROOT_DIR, "dist")
GROUPS_FILE = os.path.join(ROOT_DIR, "groups.json")
SETTINGS_FILE = os.path.join(ROOT_DIR, "settings.json")
OLD_EXP_FILE = os.path.join(ROOT_DIR, "expenses.json")
IMG_DIR = os.path.join(STATIC_DIR, "uploads")

_lock = threading.Lock()

MIME_EXT = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/gif": ".gif",
    "image/webp": ".webp",
}

DEFAULT_SETTINGS = {
    "editPassword": "1234",
    "fallbackRates": {"KRW": 1, "USD": 1400, "EUR": 1600},
    "theme": "cream",
    "language": "en",
}

TONES = ["#c4502a","#7a8c5c","#4d6b85","#8b6b4d","#6b4d8b","#4d8b6b","#8b4d6b","#5c7a8c"]

TOKEN_SALT = "dutch-pay-auth-v1"


def make_token(kind, secret):
    return hashlib.sha256(f"{kind}:{secret}:{TOKEN_SALT}".encode()).hexdigest()


def admin_token():
    """관리자(오너) 비밀번호에서 파생된 토큰 — 비밀번호 변경 시 자동 무효화"""
    settings = load_json(SETTINGS_FILE, DEFAULT_SETTINGS)
    return make_token("admin", settings.get("editPassword") or "")


def group_token(group):
    """그룹 비밀번호에서 파생된 토큰"""
    return make_token("group:" + str(group.get("id", "")), group.get("password") or "")


def find_group(gid):
    for g in load_json(GROUPS_FILE, []):
        if g.get("id") == gid:
            return g
    return None


def public_group(g):
    """비밀번호를 제외한 그룹 정보"""
    safe = {k: v for k, v in g.items() if k != "password"}
    safe["hasPassword"] = bool(g.get("password"))
    return safe


def exp_file(group_id):
    return os.path.join(ROOT_DIR, f"expenses_{group_id}.json")


def load_json(path, default):
    if not os.path.exists(path):
        return default
    try:
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception as ex:
        print(f"[json] 읽기 실패 {path}: {ex}")
        return default


def save_json(path, data):
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)


def migrate_old_data():
    """expenses.json 데이터가 있으면 기본 그룹으로 이전"""
    if not os.path.exists(OLD_EXP_FILE):
        return
    try:
        with open(OLD_EXP_FILE, "r", encoding="utf-8") as f:
            old_exps = json.load(f)
        if not isinstance(old_exps, list) or len(old_exps) == 0:
            return
        groups = load_json(GROUPS_FILE, [])
        if any(g.get("id") == "default" for g in groups):
            return
        print("[이전] 기존 expenses.json 데이터를 기본 그룹으로 이전합니다...")
        default_group = {
            "id": "default",
            "name": "기본 그룹",
            "members": [
                {"id": "you", "name": "나", "tone": TONES[0]},
                {"id": "min", "name": "민", "tone": TONES[1]},
                {"id": "alex", "name": "알렉스", "tone": TONES[2]},
            ],
            "settlementHub": "you",
            "createdAt": datetime.now().isoformat(),
        }
        groups.insert(0, default_group)
        save_json(GROUPS_FILE, groups)
        save_json(exp_file("default"), old_exps)
        os.rename(OLD_EXP_FILE, OLD_EXP_FILE + ".migrated")
        print(f"[이전] 완료: {len(old_exps)}개 항목 이전됨")
    except Exception as ex:
        print(f"[이전] 실패: {ex}")


def ensure_runtime_files():
    if not os.path.isdir(STATIC_DIR):
        raise RuntimeError(f"정적 파일 디렉토리 없음: {STATIC_DIR}")
    os.makedirs(IMG_DIR, exist_ok=True)
    if not os.path.exists(GROUPS_FILE):
        save_json(GROUPS_FILE, [])
    if not os.path.exists(SETTINGS_FILE):
        save_json(SETTINGS_FILE, DEFAULT_SETTINGS)
    migrate_old_data()


def save_image(data_url):
    if not data_url or not data_url.startswith("data:"):
        return None
    try:
        header, b64 = data_url.split(",", 1)
        mime = header.split(";")[0].split(":")[1].lower()
        ext = MIME_EXT.get(mime, ".jpg")
        raw = base64.b64decode(b64)
        fname = f"{int(datetime.now().timestamp() * 1000)}{ext}"
        with open(os.path.join(IMG_DIR, fname), "wb") as f:
            f.write(raw)
        return f"/uploads/{fname}"
    except Exception as ex:
        print(f"[이미지] 업로드 실패: {ex}")
        return None


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=STATIC_DIR, **kwargs)

    # ---- 인증 ----
    def auth_token(self):
        return self.headers.get("X-Auth", "") or ""

    def is_admin(self):
        settings = load_json(SETTINGS_FILE, DEFAULT_SETTINGS)
        if not settings.get("editPassword"):
            return True
        return self.auth_token() == admin_token()

    def has_group_access(self, group):
        if group is None:
            return False
        if not group.get("password"):
            return True
        return self.auth_token() == group_token(group) or self.is_admin()

    def deny(self):
        self.ok({"locked": True}, status=401)

    def do_GET(self):
        if self.path.startswith("/api/"):
            self.api_get()
            return
        # /group 경로는 group.html 서빙
        if self.path == "/group" or self.path.startswith("/group?"):
            qs = self.path[6:] if len(self.path) > 6 else ""
            self.path = "/group.html" + qs
        super().do_GET()

    def do_POST(self):
        if self.path.startswith("/api/"):
            self.api_post()
            return
        self.send_error(404)

    def do_OPTIONS(self):
        self.send_response(200)
        self._cors()
        self.end_headers()

    def api_get(self):
        path = self.path.split("?")[0]

        if path == "/api/groups":
            # 전체 그룹 목록은 관리자(오너) 전용
            if not self.is_admin():
                self.deny()
                return
            with _lock:
                groups = load_json(GROUPS_FILE, [])
                out = []
                for g in groups:
                    exps = load_json(exp_file(g["id"]), [])
                    real = [e for e in exps if not e.get("isSettlement") and not e.get("_deleted")]
                    pg = public_group(g)
                    pg["expenseCount"] = len(real)
                    out.append(pg)
            self.ok(out)

        elif path == "/api/settings":
            with _lock:
                settings = load_json(SETTINGS_FILE, DEFAULT_SETTINGS)
            safe = {k: v for k, v in settings.items() if k != "editPassword"}
            safe["hasPassword"] = bool(settings.get("editPassword"))
            safe.setdefault("language", "en")
            safe.setdefault("fallbackRates", DEFAULT_SETTINGS["fallbackRates"])
            self.ok(safe)

        elif path == "/api/rates":
            self.fetch_rates()

        elif path == "/api/health":
            self.ok({"ok": True})

        else:
            m = re.match(r"^/api/groups/([^/]+)/expenses$", path)
            if m:
                group_id = m.group(1)
                with _lock:
                    g = find_group(group_id)
                    data = load_json(exp_file(group_id), [])
                if g is None:
                    self.send_error(404)
                    return
                if not self.has_group_access(g):
                    self.deny()
                    return
                self.ok(data)
                return
            m = re.match(r"^/api/groups/([^/]+)$", path)
            if m:
                with _lock:
                    g = find_group(m.group(1))
                if g is None:
                    self.send_error(404)
                    return
                if not self.has_group_access(g):
                    self.deny()
                    return
                self.ok(public_group(g))
                return
            self.send_error(404)

    def fetch_rates(self):
        import concurrent.futures

        def _fetch():
            url = "https://api.frankfurter.app/latest?from=USD&to=KRW,EUR"
            req = urllib.request.Request(url, headers={"User-Agent": "dutch-pay-local/2.0"})
            with urllib.request.urlopen(req, timeout=6) as resp:
                return json.loads(resp.read())

        try:
            with concurrent.futures.ThreadPoolExecutor(max_workers=1) as ex:
                raw = ex.submit(_fetch).result(timeout=8)
            usd_to_krw = raw.get("rates", {}).get("KRW")
            usd_to_eur = raw.get("rates", {}).get("EUR")
            if not usd_to_krw or not usd_to_eur:
                raise ValueError("KRW/EUR 환율 없음")
            data = {
                "base": "KRW",
                "rates": {
                    "KRW": 1,
                    "USD": usd_to_krw,
                    "EUR": usd_to_krw / usd_to_eur,
                },
                "source": "Frankfurter",
                "date": raw.get("date"),
                "updatedAt": datetime.now().isoformat(),
            }
            self.ok(data)
        except Exception as ex:
            print(f"[환율] 가져오기 실패: {ex}")
            # 서버 설정에서 폴백 환율 반환
            try:
                with _lock:
                    settings = load_json(SETTINGS_FILE, DEFAULT_SETTINGS)
                fallback = settings.get("fallbackRates", DEFAULT_SETTINGS["fallbackRates"])
                self.ok({
                    "base": "KRW",
                    "rates": fallback,
                    "source": "fallback",
                    "updatedAt": datetime.now().isoformat(),
                })
            except Exception:
                self.send_error(502)

    def api_post(self):
        length = int(self.headers.get("Content-Length", 0) or 0)
        try:
            raw = self.rfile.read(length) if length else b"{}"
            body = json.loads(raw)
        except Exception as ex:
            print(f"[api] 요청 파싱 실패: {ex}")
            self.send_error(400)
            return

        route = self.path.split("?")[0]

        if route == "/api/auth/admin":
            # 오너 비밀번호 → 관리자 토큰
            pw = body.get("password", "")
            with _lock:
                settings = load_json(SETTINGS_FILE, DEFAULT_SETTINGS)
            if not settings.get("editPassword") or pw == settings["editPassword"]:
                self.ok({"ok": True, "token": admin_token()})
            else:
                self.ok({"ok": False})

        elif route == "/api/auth/group":
            # 그룹 비밀번호(또는 오너 비밀번호) → 그룹 토큰
            gid = body.get("id") or body.get("gid")
            pw = body.get("password", "")
            with _lock:
                settings = load_json(SETTINGS_FILE, DEFAULT_SETTINGS)
                g = find_group(gid)
            if g is None:
                self.ok({"ok": False})
            elif settings.get("editPassword") and pw == settings["editPassword"]:
                self.ok({"ok": True, "token": admin_token(), "scope": "admin"})
            elif not g.get("password") or pw == g["password"]:
                self.ok({"ok": True, "token": group_token(g), "scope": "group"})
            else:
                self.ok({"ok": False})

        elif route == "/api/groups":
            if not self.is_admin():
                self.deny()
                return
            with _lock:
                groups = load_json(GROUPS_FILE, [])
                new_group = {
                    "id": body.get("id", "g" + str(int(datetime.now().timestamp() * 1000))),
                    "name": body.get("name", "New Group"),
                    "members": body.get("members", []),
                    "settlementHub": body.get("settlementHub", ""),
                    "language": body.get("language", None),
                    "createdAt": datetime.now().isoformat(),
                }
                if body.get("password"):
                    new_group["password"] = body["password"]
                groups.append(new_group)
                save_json(GROUPS_FILE, groups)
                save_json(exp_file(new_group["id"]), [])
            self.ok(public_group(new_group))

        elif route == "/api/groups/delete":
            gid = body.get("id")
            pw = body.get("password", "")
            with _lock:
                settings = load_json(SETTINGS_FILE, DEFAULT_SETTINGS)
            pw_ok = settings.get("editPassword") and pw == settings["editPassword"]
            if not (self.is_admin() or pw_ok):
                self.send_error(403)
                return
            with _lock:
                groups = load_json(GROUPS_FILE, [])
                groups = [g for g in groups if g.get("id") != gid]
                save_json(GROUPS_FILE, groups)
                ef = exp_file(gid)
                if os.path.exists(ef):
                    os.remove(ef)
            self.ok({"ok": True})

        elif route == "/api/groups/update":
            gid = body.get("id")
            with _lock:
                groups = load_json(GROUPS_FILE, [])
                target = next((g for g in groups if g.get("id") == gid), None)
                if target is None:
                    self.send_error(404)
                    return
                if not self.has_group_access(target):
                    self.deny()
                    return
                for key in ("name", "members", "settlementHub", "language"):
                    if key in body:
                        target[key] = body[key]
                if "password" in body:
                    if body["password"]:
                        target["password"] = body["password"]
                    else:
                        target.pop("password", None)
                save_json(GROUPS_FILE, groups)
                tok = group_token(target)
            self.ok({"ok": True, "token": tok})

        elif route == "/api/settings":
            with _lock:
                settings = load_json(SETTINGS_FILE, DEFAULT_SETTINGS)
                if "newPassword" in body:
                    old_pw = body.get("oldPassword", "")
                    if settings.get("editPassword") and old_pw != settings["editPassword"]:
                        self.ok({"ok": False, "error": "wrong_password"})
                        return
                    settings["editPassword"] = body["newPassword"]
                if "fallbackRates" in body:
                    settings["fallbackRates"] = body["fallbackRates"]
                if "theme" in body:
                    settings["theme"] = body["theme"]
                if "language" in body:
                    settings["language"] = body["language"]
                save_json(SETTINGS_FILE, settings)
            self.ok({"ok": True})

        elif route == "/api/settings/verify-password":
            pw = body.get("password", "")
            with _lock:
                settings = load_json(SETTINGS_FILE, DEFAULT_SETTINGS)
            stored = settings.get("editPassword", "")
            self.ok({"ok": not stored or pw == stored})

        else:
            m = re.match(r"^/api/groups/([^/]+)/expenses(/delete|/edit)?$", route)
            if m:
                group_id = m.group(1)
                sub = m.group(2) or ""
                with _lock:
                    g = find_group(group_id)
                if g is None:
                    self.send_error(404)
                    return
                if not self.has_group_access(g):
                    self.deny()
                    return
                self.handle_group_expense(group_id, sub, body)
                return
            self.send_error(404)

    def handle_group_expense(self, group_id, sub, body):
        ef = exp_file(group_id)
        if sub == "":
            with _lock:
                data = load_json(ef, [])
                entry = {k: v for k, v in body.items() if k != "image"}
                img = save_image(body.get("image"))
                if img:
                    entry["image"] = img
                data.append(entry)
                save_json(ef, data)
            self.ok(entry)
        elif sub == "/delete":
            eid = body.get("id")
            with _lock:
                data = load_json(ef, [])
                data = [e for e in data if e.get("id") != eid]
                save_json(ef, data)
            self.ok({"ok": True})
        elif sub == "/edit":
            eid = body.get("id")
            with _lock:
                data = load_json(ef, [])
                for e in data:
                    if e.get("id") == eid:
                        img = save_image(body.get("image"))
                        for k, v in body.items():
                            if k not in ("id", "image"):
                                e[k] = v
                        if img:
                            e["image"] = img
                        elif body.get("removeImage"):
                            e.pop("image", None)
                        break
                save_json(ef, data)
            self.ok({"ok": True})
        else:
            self.send_error(404)

    def ok(self, obj, status=200):
        body = json.dumps(obj, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self._cors()
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def _cors(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, X-Auth")

    def end_headers(self):
        path = getattr(self, "path", "").split("?")[0]
        if path.endswith((".html", ".js", ".jsx", ".css")):
            self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        super().end_headers()

    def address_string(self):
        return self.client_address[0]

    def log_message(self, fmt, *args):
        print(f'[{datetime.now().strftime("%H:%M:%S")}] {self.client_address[0]} {fmt % args}')


class DualStackServer(socketserver.ThreadingTCPServer):
    allow_reuse_address = True
    address_family = socket.AF_INET6

    def server_bind(self):
        try:
            self.socket.setsockopt(socket.IPPROTO_IPV6, socket.IPV6_V6ONLY, 0)
        except OSError:
            pass
        super().server_bind()


def local_ips():
    ips = []
    try:
        for info in socket.getaddrinfo(socket.gethostname(), None):
            ip = info[4][0]
            if ":" not in ip and not ip.startswith("127.") and ip not in ips:
                ips.append(ip)
    except Exception:
        pass
    return ips


if __name__ == "__main__":
    ensure_runtime_files()
    with DualStackServer(("::", PORT), Handler) as httpd:
        network = "\n".join(f"네트워크: http://{ip}:{PORT}" for ip in local_ips())
        if not network:
            network = "네트워크: (감지 안됨)"
        print(
            "=== 더치페이 서버 시작 ===\n"
            f"로컬:   http://localhost:{PORT}\n"
            f"{network}\n"
            "종료: Ctrl+C\n"
            "========================="
        )
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n서버 종료.")
