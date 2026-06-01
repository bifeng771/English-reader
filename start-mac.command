#!/bin/zsh

cd "$(dirname "$0")" || exit 1

PORT=4179
URL="http://127.0.0.1:${PORT}/"

echo "LinguaReader will open at:"
echo "${URL}"
echo
echo "Keep this terminal window open while using the app."
echo "Press Control+C to stop the local web server."
echo

if ! command -v python3 >/dev/null 2>&1; then
  echo "python3 was not found on this Mac."
  echo "Install Python 3 first, or deploy this folder to a public HTTPS host."
  read "unused?Press Enter to close..."
  exit 1
fi

(sleep 1; open "${URL}" >/dev/null 2>&1) &
python3 -m http.server "${PORT}"
