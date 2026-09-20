#!/bin/bash

set -u

PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_PORT="3001"
PROJECT_URL="http://localhost:${PROJECT_PORT}/"
LOCK_FILE="${PROJECT_DIR}/.vinext/dev/lock.json"

cd "$PROJECT_DIR" || exit 1

if [ -f "$LOCK_FILE" ]; then
  LOCK_PID="$(sed -n 's/^[[:space:]]*"pid":[[:space:]]*\([0-9][0-9]*\).*/\1/p' "$LOCK_FILE" | head -n 1)"
  if [ -n "$LOCK_PID" ] && ! kill -0 "$LOCK_PID" 2>/dev/null; then
    STALE_LOCK="${PROJECT_DIR}/.vinext/dev/lock.stale-${LOCK_PID}.json"
    if [ -e "$STALE_LOCK" ]; then
      STALE_LOCK="${PROJECT_DIR}/.vinext/dev/lock.stale-${LOCK_PID}-$(date +%Y%m%d-%H%M%S).json"
    fi
    mv "$LOCK_FILE" "$STALE_LOCK" || exit 1
    echo "Служебный замок завершённого процесса сохранён: $STALE_LOCK"
  fi
fi

PORT_PID="$(lsof -tiTCP:${PROJECT_PORT} -sTCP:LISTEN 2>/dev/null | head -n 1)"
if [ -n "$PORT_PID" ]; then
  PORT_DIR="$(lsof -a -p "$PORT_PID" -d cwd -Fn 2>/dev/null | sed -n 's/^n//p' | head -n 1)"
  if [ "$PORT_DIR" = "$PROJECT_DIR" ]; then
    if curl --silent --fail --max-time 5 "$PROJECT_URL" >/dev/null 2>&1; then
      echo "Лендинг ИП уже работает: $PROJECT_URL"
      if [ "${IP_LANDING_NO_OPEN:-0}" != "1" ]; then
        open "$PROJECT_URL"
      fi
      exit 0
    fi

    echo "Процесс лендинга занимает порт ${PROJECT_PORT}, но страница не отвечает."
    echo "Завершите процесс ${PORT_PID} и повторите запуск."
    read -r -p "Нажмите Enter, чтобы закрыть окно."
    exit 1
  fi

  echo "Порт ${PROJECT_PORT} занят другим проектом: ${PORT_DIR:-путь не определён}"
  echo "Лендинг ИП не запущен, чтобы не смешивать сайты."
  read -r -p "Нажмите Enter, чтобы закрыть окно."
  exit 1
fi

if command -v node >/dev/null 2>&1; then
  :
elif [ -x "/opt/homebrew/bin/node" ]; then
  export PATH="/opt/homebrew/bin:$PATH"
elif [ -x "/usr/local/bin/node" ]; then
  export PATH="/usr/local/bin:$PATH"
elif [ -x "/Users/boldyrev/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node" ]; then
  export PATH="/Users/boldyrev/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH"
else
  echo "Не найден Node.js 22 или новее."
  read -r -p "Нажмите Enter, чтобы закрыть окно."
  exit 1
fi

if [ "${IP_LANDING_NO_OPEN:-0}" != "1" ]; then
  (sleep 4; open "$PROJECT_URL") &
fi

export WRANGLER_LOG_PATH=".wrangler/wrangler.log"
export LOCAL_PREVIEW="1"
exec ./node_modules/.bin/vinext dev --host localhost --port "$PROJECT_PORT"
