#!/bin/bash
# DutchPay — clear local data (groups, expenses, uploaded receipts) on macOS
cd "$(dirname "$0")"

echo "This will remove ALL groups, expenses, and uploaded receipt images."
read -r -p "Reset local data? [y/N] " ans
case "$ans" in
  [yY]*) ;;
  *) echo "Cancelled."; exit 0 ;;
esac

echo "[]" > groups.json
rm -f expenses.json expenses_*.json expenses_log.json
find dist/uploads -type f ! -name ".gitkeep" -delete 2>/dev/null

echo "Local data reset."
read -r -p "Press Enter to close..."
