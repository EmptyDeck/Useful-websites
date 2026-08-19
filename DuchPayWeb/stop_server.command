#!/bin/bash
# DutchPay — stop whatever is listening on the app port (macOS)
PORT="${1:-8282}"
PIDS="$(lsof -ti tcp:"$PORT")"
if [ -z "$PIDS" ]; then
  echo "No server found on port $PORT."
else
  echo "Stopping process(es) on port $PORT: $PIDS"
  kill $PIDS
fi
read -r -p "Press Enter to close..."
