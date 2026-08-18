"""두 설정 폴더가 서로 다른 계정으로 로그인돼 있는지 확인한다."""
import json
from pathlib import Path

HOME = Path.home()
TARGETS = [
    ("계정 A (기본 ~/.claude)  ", HOME / ".claude.json"),
    ("계정 B (~/.claude-acct2) ", HOME / ".claude-acct2" / ".claude.json"),
]


def email_of(path):
    try:
        return json.loads(path.read_text(encoding="utf-8"))["oauthAccount"]["emailAddress"]
    except Exception:
        return None


emails = []
print()
for label, path in TARGETS:
    e = email_of(path)
    emails.append(e)
    print(f"  {label}: {e or '(로그인 안 됨 / 읽을 수 없음)'}")
print()

a, b = emails
if not a or not b:
    print("  [!] 한쪽이 로그인 안 된 상태다.")
elif a == b:
    print("  [X] 아직 같은 계정이다. claude 안에서 /logout 후 /login 을 다시 해보자.")
else:
    print("  [O] 두 계정이 다르다! Start-Tracker.bat 실행하면 된다.")
print()
