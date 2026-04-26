"""
KoreaGang 2026 — Server (v5)
- Upload size limit removed
- Source/data files blocked from direct HTTP access
- Visitor logging (JSONL) with IP, user-agent, request details
"""
import http.server, socket, socketserver, json, os, re, random, threading, base64, urllib.parse, sys
from datetime import datetime

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8080
ADMIN_PIN = '111111'

DIR = os.path.dirname(os.path.abspath(__file__))

# Obfuscated data and log file names
DATA_FILE = os.path.join(DIR, 'db_xp7kqm2v.json')
LOG_FILE  = os.path.join(DIR, 'access_xp7kqm2v.log')

# Migrate legacy data.json if new file doesn't exist yet
_legacy = os.path.join(DIR, 'data.json')
if not os.path.exists(DATA_FILE) and os.path.exists(_legacy):
    import shutil
    shutil.copy2(_legacy, DATA_FILE)

UPLOADS = os.path.join(DIR, 'uploads')
os.makedirs(UPLOADS, exist_ok=True)

_lock      = threading.Lock()
_log_lock  = threading.Lock()

# ── Blocked path patterns (never serve these directly) ──────────────────────
_BLOCKED = re.compile(
    r'^/[^/]*\.(py|json|log|bat|sh|cfg|ini|env|pyc)$',
    re.IGNORECASE
)

# ── Logging ──────────────────────────────────────────────────────────────────

def log_visit(handler, extra=None):
    """Append one JSONL entry to the log file."""
    entry = {
        'ts':         datetime.now().isoformat(timespec='seconds'),
        'ip':         handler.client_address[0],
        'method':     handler.command,
        'path':       handler.path,
        'ua':         handler.headers.get('User-Agent', ''),
        'referer':    handler.headers.get('Referer', ''),
        'accept_lang':handler.headers.get('Accept-Language', ''),
    }
    if extra:
        entry['data'] = extra
    with _log_lock:
        with open(LOG_FILE, 'a', encoding='utf-8') as f:
            f.write(json.dumps(entry, ensure_ascii=False) + '\n')

# ── Data helpers ─────────────────────────────────────────────────────────────

def load():
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    return {'comments': {}, 'reactions': {}, 'hidden': {}, 'wishlist': []}

def save(d):
    with open(DATA_FILE, 'w', encoding='utf-8') as f:
        json.dump(d, f, ensure_ascii=False, indent=2)

MIME_EXT = {'image/jpeg':'.jpg','image/png':'.png','image/gif':'.gif','image/webp':'.webp'}

def save_image(data_url):
    if not data_url or not data_url.startswith('data:'): return None
    try:
        header, b64 = data_url.split(',', 1)
        mime = header.split(';')[0].split(':')[1].lower()
        ext = MIME_EXT.get(mime, '.jpg')
        raw = base64.b64decode(b64)
        # No size limit — just save it
        fname = f"{int(datetime.now().timestamp()*1000)}_{random.randint(1000,9999)}{ext}"
        with open(os.path.join(UPLOADS, fname), 'wb') as f: f.write(raw)
        return f'/uploads/{fname}'
    except Exception: return None

def normalize_hidden(h):
    out = {}
    for k, v in (h or {}).items():
        if isinstance(v, dict):
            out[k] = {'message': v.get('message', '')}
        elif v:
            out[k] = {'message': v if isinstance(v, str) else ''}
    return out

def _strip_fp(cmts):
    return [{k:v for k,v in c.items() if k != '_fp'} for c in cmts]

# ── Request handler ──────────────────────────────────────────────────────────

class H(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *a, **kw): super().__init__(*a, directory=DIR, **kw)

    def do_GET(self):
        log_visit(self)
        if self.path.startswith('/api/'): self.api_get(); return
        p = self.path.split('?')[0]
        # Block direct access to sensitive files
        if _BLOCKED.match(p):
            self.send_error(403); return
        if p in ('/', ''): self.path = '/_index.html'
        elif re.match(r'^/day\d+\.html$', p): self.path = '/day.html'
        super().do_GET()

    def do_POST(self):
        if self.path.startswith('/api/'): self.api_post()
        else: self.send_error(404)

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def api_get(self):
        u = urllib.parse.urlparse(self.path)
        q = urllib.parse.parse_qs(u.query)
        with _lock: d = load()
        page = q.get('page', ['_index'])[0]
        path = u.path
        if path == '/api/comments':   return self.ok(_strip_fp(d['comments'].get(page, [])))
        if path == '/api/reactions':  return self.ok(d['reactions'].get(page, {}))
        if path == '/api/hidden':
            h = normalize_hidden(d.get('hidden', {}))
            v = h.get(page)
            return self.ok({'hidden': bool(v), 'message': (v or {}).get('message','')})
        if path == '/api/hidden_days':
            return self.ok(normalize_hidden(d.get('hidden', {})))
        if path == '/api/wishlist':   return self.ok(d.get('wishlist', []))
        self.send_error(404)

    def api_post(self):
        u = urllib.parse.urlparse(self.path)
        length = int(self.headers.get('Content-Length', 0))
        try: body = json.loads(self.rfile.read(length))
        except Exception: self.send_error(400); return

        page = body.get('page', '_index')
        route = u.path

        # Build log payload (omit raw image data — too large)
        log_data = {k: v for k, v in body.items() if k != 'image'}
        log_data['route'] = route
        log_visit(self, extra=log_data)

        if route == '/api/wishlist':
            text = (body.get('text') or '').strip()[:200]
            nick = (body.get('nickname') or 'Anonymous')[:30]
            if not text: return self.ok({'ok': False, 'error': 'empty'}, 400)
            with _lock:
                d = load()
                d.setdefault('wishlist', []).append({
                    'id': int(datetime.now().timestamp()*1000),
                    'text': text, 'nickname': nick,
                    'timestamp': datetime.now().isoformat(),
                })
                save(d)
            return self.ok({'ok': True})

        if route == '/api/admin/auth':
            return self.ok({'ok': str(body.get('pin','')) == ADMIN_PIN})

        with _lock:
            d = load()
            if route == '/api/comment':
                raw = body.get('image')
                img = save_image(raw) if raw else None
                c = {
                    'id': int(datetime.now().timestamp()*1000),
                    'nickname': (body.get('nickname') or 'Anonymous')[:30],
                    'text': (body.get('text') or '')[:1000],
                    'image': img,
                    'timestamp': datetime.now().isoformat(),
                    'reactions': {'❤️':0,'😂':0,'🔥':0,'👍':0,'✈️':0,'🍜':0,'🏯':0,'🫡':0,'😭':0,'✅':0,'😱':0,'🤮':0,'🤨':0},
                    'replies': [],
                    '_fp': (body.get('fingerprint') or '')[:80],
                }
                d['comments'].setdefault(page, []).append(c)
                save(d); return self.ok({k:v for k,v in c.items() if k != '_fp'})

            if route == '/api/react':
                emoji = body.get('emoji','')
                d['reactions'].setdefault(page, {})
                d['reactions'][page][emoji] = d['reactions'][page].get(emoji, 0) + 1
                save(d); return self.ok(d['reactions'][page])

            if route == '/api/comment/react':
                cid = body.get('comment_id'); emoji = body.get('emoji','')
                for c in d['comments'].get(page, []):
                    if c['id'] == cid:
                        c.setdefault('reactions', {})
                        c['reactions'][emoji] = c['reactions'].get(emoji, 0) + 1
                save(d); return self.ok({'ok': True})

            if route == '/api/reply':
                cid = body.get('comment_id')
                for c in d['comments'].get(page, []):
                    if c['id'] == cid:
                        c.setdefault('replies', []).append({
                            'nickname': (body.get('nickname') or 'Anonymous')[:30],
                            'text': (body.get('text') or '')[:500],
                            'timestamp': datetime.now().isoformat(),
                        })
                save(d); return self.ok({'ok': True})

            if route == '/api/admin/set_day_hide':
                if str(body.get('pin','')) != ADMIN_PIN: self.send_error(403); return
                hide = bool(body.get('hide', False))
                msg = (body.get('message') or '')[:200].strip()
                d.setdefault('hidden', {})
                if hide: d['hidden'][page] = {'message': msg}
                elif page in d['hidden']: del d['hidden'][page]
                save(d); return self.ok({'hidden': hide, 'message': msg})

            if route == '/api/admin/delete_reply':
                if str(body.get('pin','')) != ADMIN_PIN: self.send_error(403); return
                cid = body.get('comment_id')
                ridx = body.get('reply_index')
                for c in d['comments'].get(page, []):
                    if str(c['id']) == str(cid) and isinstance(ridx, int):
                        if 0 <= ridx < len(c.get('replies', [])):
                            c['replies'].pop(ridx)
                save(d); return self.ok({'ok': True})

            if route == '/api/admin/delete_comment':
                if str(body.get('pin','')) != ADMIN_PIN: self.send_error(403); return
                cid = body.get('comment_id')
                if page in d['comments']:
                    d['comments'][page] = [c for c in d['comments'][page] if c['id'] != cid]
                save(d); return self.ok({'ok': True})

            if route == '/api/admin/edit_wishlist':
                if str(body.get('pin','')) != ADMIN_PIN: self.send_error(403); return
                wid = body.get('wishlist_id')
                text = (body.get('text') or '').strip()[:200]
                for w in d.get('wishlist', []):
                    if str(w['id']) == str(wid):
                        w['text'] = text; break
                save(d); return self.ok({'ok': True})

            if route == '/api/admin/delete_wishlist':
                if str(body.get('pin','')) != ADMIN_PIN: self.send_error(403); return
                wid = body.get('wishlist_id')
                d['wishlist'] = [w for w in d.get('wishlist', []) if str(w['id']) != str(wid)]
                save(d); return self.ok({'ok': True})

        self.send_error(404)

    def ok(self, obj, status=200):
        body = json.dumps(obj, ensure_ascii=False).encode('utf-8')
        self.send_response(status)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(body)))
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers(); self.wfile.write(body)

    def end_headers(self):
        p = self.path.split('?')[0]
        if p.endswith(('.html', '.js', '.css')):
            self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()

    def address_string(self): return self.client_address[0]
    def log_message(self, fmt, *a):
        print(f'[{datetime.now().strftime("%H:%M:%S")}] {self.client_address[0]} {fmt % a}')

# ── Server ───────────────────────────────────────────────────────────────────

class Srv(socketserver.ThreadingTCPServer):
    allow_reuse_address = True
    address_family = socket.AF_INET6
    def server_bind(self):
        self.socket.setsockopt(socket.IPPROTO_IPV6, socket.IPV6_V6ONLY, 0)
        super().server_bind()

if __name__ == '__main__':
    with Srv(('::', PORT), H) as httpd:
        import socket as _s
        _ips = []
        try:
            for info in _s.getaddrinfo(_s.gethostname(), None):
                ip = info[4][0]
                if ':' not in ip and not ip.startswith('127.'):
                    if ip not in _ips:
                        _ips.append(ip)
        except Exception:
            pass
        _net = '\n'.join(f'Network:  http://{ip}:{PORT}' for ip in _ips) or 'Network:  (not detected)'
        print(f'=== KoreaGang Server v5 ===\nLocal:   http://localhost:{PORT}\n{_net}\nAdmin PIN: {ADMIN_PIN}\nLog: {os.path.basename(LOG_FILE)}\nCtrl+C to stop\n===========================')
        try: httpd.serve_forever()
        except KeyboardInterrupt: print('\nStopped.')
