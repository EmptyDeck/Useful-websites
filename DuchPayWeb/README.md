# Trip Split

A tiny local shared expense tracker for trips, roommates, and small groups. Clone it, run the `.bat` file, and use it in your browser. It stores data in local JSON files, so there is no account, database, or cloud service.

## Quick Start

1. Install Python 3 from <https://www.python.org/downloads/>.
2. Download or clone this repository.
3. Double-click `start_server.bat`.
4. Open `http://localhost:8282` if the browser does not open automatically.

To stop the server, press `Ctrl+C` in the server window or run `stop_server.bat`.

## Let Other People Use It

When `start_server.bat` runs, it prints two kinds of URLs:

- `Local: http://localhost:8282` for your own computer.
- `Network: http://YOUR-IP:8282` for other people on the same Wi-Fi.

Send the `Network` URL to your group. If Windows Firewall asks for permission, allow Python on private networks.

## Customize People

Open `dist/js/config.js` and edit `people`.

```js
people: [
  { id: "you", name: "You", tone: "#c4502a" },
  { id: "min", name: "Min", tone: "#7a8c5c" },
  { id: "alex", name: "Alex", tone: "#4d6b85" },
],
```

Rules:

- Keep `id` simple: lowercase letters/numbers only is safest.
- `paidBy`, `split`, `defaultPerson`, and `settlementHub` must use those same IDs.
- `tone` is the person's color in the UI.

## Customize The Trip

In `dist/js/config.js`, edit:

- `tripName`: first line of the app title.
- `appLabel`: second line of the app title.
- `defaultCurrency`: currency shown by default.
- `settlementHub`: the person everyone settles with.
- `editPassword`: edit/delete password. Set it to `""` to disable the prompt.
- `fixedRates`: fallback exchange rates used when online rates are unavailable. Each value means `1 currency unit = how many baseCurrency units`.

The app automatically fetches USD/KRW and EUR/KRW rates from the server endpoint `/api/rates`. If the computer is offline, it uses the last cached rates, then falls back to `fixedRates`.

## Expense Data

Expenses live in `expenses.json`. The public repo starts with an empty file so nobody's real records are included. See `expenses.sample.json` for demo rows you can copy if you want test data.

Example:

```json
{
  "id": "demo-1",
  "title": "Airport taxi",
  "amount": 48000,
  "ccy": "KRW",
  "paidBy": "you",
  "split": ["you", "min", "alex"],
  "cat": "transit",
  "when": "Jun 1, 09:30",
  "_ts": 1780273800000
}
```

Supported categories are `food`, `stay`, `transit`, `tickets`, `shop`, and `other`.

If you want to start clean, replace `expenses.json` with:

```json
[]
```

The server will create `expenses_log.json` automatically if it is missing.

You can also run `reset_data.bat` to clear local expenses, logs, and uploaded receipt images.

## Receipt Images

Uploaded receipt photos are saved under `dist/uploads/`. They are ignored by Git so private receipts do not get committed accidentally.

## Files To Know

- `start_server.bat`: one-click Windows launcher.
- `stop_server.bat`: stops whatever is listening on the app port.
- `reset_data.bat`: clears local expenses, logs, and uploaded receipt images.
- `server.py`: local static server and JSON API.
- `expenses.json`: current local expense data.
- `expenses.sample.json`: reusable demo data.
- `dist/js/config.js`: people, title, password, currencies, and rates.
- `dist/`: the browser app.

## Before Publishing To GitHub

Run these checks:

```bat
python -m py_compile server.py
python server.py 8282
```

Then visit:

- <http://localhost:8282>
- <http://localhost:8282/api/health>
- <http://localhost:8282/api/expenses>

Make sure you are not committing private local data. This repository ignores uploaded receipt images and runtime logs.

## License

MIT. See `LICENSE`.
