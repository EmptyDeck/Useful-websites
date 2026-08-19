#!/bin/bash
# DutchPay — macOS launcher (double-click to start)
cd "$(dirname "$0")"
PORT="${1:-8282}"

PY="$(command -v python3 || command -v python)"
if [ -z "$PY" ]; then
  echo "Python 3 not found. Install it from https://www.python.org/downloads/ or: brew install python3"
  read -r -p "Press Enter to close..."
  exit 1
fi

# Open the browser once the server is up
( sleep 1.2; open "http://localhost:$PORT" ) &

echo "Starting DutchPay on port $PORT (Ctrl+C to stop)..."
"$PY" server.py "$PORT"
