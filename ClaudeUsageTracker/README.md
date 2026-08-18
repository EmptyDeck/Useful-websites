# Claude Usage Tracker

Records usage for both Claude accounts 24/7 and graphs it, so you can see which
account has headroom and which hours are usually quiet.

## Running it

- **Start-Tracker.bat** — double-click. Runs in the background, opens http://localhost:3457
- **Stop-Tracker.bat** — stop it
- **Run-Console.bat** — run with a visible log window (for debugging)
- **Login-Account2.bat** — log the second account into `~/.claude-acct2`

It is already registered to auto-start at login (a shortcut in `shell:startup`,
launched with `/noweb` so it does not pop a browser every boot). Delete that
shortcut to disable.

## How it works

- Every 10 min it spawns `claude` once per account and reads `/usage` (~40s total).
- Each sample is appended as one line to `usage-history.jsonl`, flushed with
  `fsync`, so nothing is lost if the machine loses power.
- On each start it copies the file to `backups/usage-history-YYYYMMDD.jsonl`
  (30 days kept).
- The scraping code is imported from `../ClaudeUseWidget/server.py` — one place
  to fix if the `/usage` screen ever changes.

Interval: `set POLL_SEC=1800` before launching. Port: `TRACKER_PORT`.

## The page

- **Which account should I use now?** — latest sample per account, plus reset
  time, countdown, and when the current window started.
- **Usage over time** — 6h / 24h / 7d / All; switch between session, weekly,
  weekly per-model. Dashed vertical lines mark resets.
- **Average usage by hour of day** — needs a couple of days before the pattern
  means anything.

## Both accounts must be logged in separately

Check with `python check_accounts.py`. Example output:

```
  A (~/.claude)        you@example.com
  B (~/.claude-acct2)  other@example.com
```

If both show the same email, run **Login-Account2.bat** and use `/logout` then
`/login` inside claude. `/login` alone will silently reuse the account already
signed in to your browser — use a private window.
