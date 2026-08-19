# DutchPay

A local multi-group shared expense tracker for roommates, trips, and friend groups. Clone it, run one script, and use it in your browser. Data lives in local JSON files — no account, database, or cloud service.

## Quick Start

### Windows

1. Install Python 3 from <https://www.python.org/downloads/>.
2. Double-click `start_server.bat`.
3. Open `http://localhost:8282` if the browser does not open automatically.

Stop with `Ctrl+C` in the server window or `stop_server.bat`.

### macOS

1. Python 3 is usually preinstalled (otherwise `brew install python3`).
2. Double-click `start_server.command` (first time: right-click → Open, or run `xattr -d com.apple.quarantine start_server.command` if Gatekeeper complains).
3. The browser opens `http://localhost:8282` automatically.

Stop with `Ctrl+C` in the terminal window or `stop_server.command`.

## Groups & Passwords

- The main page lists **all your groups** — it is locked behind the **owner password** (default `1234`, change it in Settings). Only you should know this.
- Each group can have its **own password**. Share the group link (`http://YOUR-IP:8282/group.html?gid=...`, shown when you open a group) plus its password with that friend group. They can only see their own group.
- Pressing "Groups" (back) from a group page asks for the owner password, so friends can't browse your other groups.
- Deleting or editing an expense asks for the group password (or owner password) again.
- The owner password always works everywhere. Changing a password immediately logs out everyone who used the old one.

## Expenses

Two entry modes when adding an expense:

- **Simple** — one amount, split evenly among selected members.
- **Itemized** — enter each receipt line (name + price) and pick *who shares that item*. Optional buttons add:
  - **Delivery fee** and **Tip** — split evenly per item, using the "divide by" count (set it to the total item count on the receipt, even items you don't track here).
  - **Sales tax %** — applied per item via each item's `tax` yes/no toggle.

  Each person's share is computed exactly (item price + its tax + fee/tip portion, divided among that item's people) and used for all balances.

Currencies: KRW / USD / EUR with live exchange rates (Frankfurter API, cached 1 hour, offline fallback rates configurable in Settings).

## Sharing With Your Group

When the server starts it prints:

- `Local: http://localhost:8282` — your own computer.
- `Network: http://YOUR-IP:8282` — for people on the same Wi-Fi.

Open a group and share its URL (with `?gid=...`). If the OS firewall asks, allow Python on private networks.

## Data & Files

- `groups.json` — group definitions (members, hub, password).
- `expenses_<groupId>.json` — one expense file per group.
- `settings.json` — owner password, language, fallback rates (created on first run; see `settings.sample.json`).
- `dist/uploads/` — receipt photos (git-ignored).
- `server.py` — static server + JSON API.
- `start_server.bat` / `stop_server.bat` / `reset_data.bat` — Windows scripts.
- `start_server.command` / `stop_server.command` / `reset_data.command` — macOS scripts.
- `dist/` — the browser app (React, no build step).

`reset_data.*` wipes all groups, expenses, and uploaded receipts.

## Sanity Checks Before Publishing

```sh
python3 -m py_compile server.py
python3 server.py 8282
```

Then visit `http://localhost:8282` and `http://localhost:8282/api/health`. Make sure you are not committing private data (`settings.json`, `expenses_*.json`, uploads are git-ignored).

## License

MIT. See `LICENSE`.
