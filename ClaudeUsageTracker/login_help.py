"""Instructions printed before launching claude for the second account."""
import os

print(f"""
============================================================
  Second account login
  CLAUDE_CONFIG_DIR = {os.environ.get('CLAUDE_CONFIG_DIR')}
============================================================

  When claude starts, type these in order:

     1) /logout    <- log out the account currently attached
     2) /login     <- browser opens; log in with the OTHER account
     3) /exit

  Note: if that account is already logged into your browser,
  /login will silently reuse it. Switch accounts on the login
  page, or use a private/incognito window.

============================================================
""")
