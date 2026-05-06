#!/bin/bash
# Stop 이벤트: 작업 완료 Slack 알림 전송

INPUT=$(cat)

ENV_FILE="$CLAUDE_PROJECT_DIR/.claude/.env.slack"
if [ -f "$ENV_FILE" ]; then
    source "$ENV_FILE"
fi

if [ -z "$SLACK_WEBHOOK_URL" ]; then
    exit 0
fi

# 기본 필드 추출
# cwd는 Windows 경로이므로 마지막 경로 구성요소를 추출
PROJECT_NAME=$(echo "$INPUT" | jq -r '.cwd // "unknown"' | sed 's/.*[/\\]//')
SESSION_ID=$(echo "$INPUT" | jq -r '(.session_id // "")[:8]')
SESSION_ID_FULL=$(echo "$INPUT" | jq -r '.session_id // ""')
# Stop 훅 INPUT에는 stop_reason이 없고 stop_hook_active가 있음
# stop_hook_active=false → 정상 종료, true → 훅에 의한 중단
STOP_HOOK_ACTIVE=$(echo "$INPUT" | jq -r '.stop_hook_active // false')
TRANSCRIPT_PATH=$(echo "$INPUT" | jq -r '.transcript_path // ""')
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

# Windows 경로를 Git Bash POSIX 경로로 변환 (C:\foo\bar → /c/foo/bar)
TRANSCRIPT_PATH_POSIX=$(echo "$TRANSCRIPT_PATH" | sed 's|\\|/|g' | sed 's|^\([A-Za-z]\):|/\L\1|')

# 성공/실패 판단: stop_hook_active=false이면 정상 종료
if [ "$STOP_HOOK_ACTIVE" = "false" ]; then
    STATUS="✅ 성공"
    IS_ERROR=false
else
    STATUS="❌ 중단 (훅에 의해)"
    IS_ERROR=true
fi

# 작업 내용: 현재 세션의 첫 번째 실제 user 메시지 추출
# transcript 필드명: sessionId (camelCase), message.role
LAST_PROMPT=""
if [ -f "$TRANSCRIPT_PATH_POSIX" ]; then
    LAST_PROMPT=$(jq -rR \
        --arg sid "$SESSION_ID_FULL" \
        '. as $line | try fromjson |
         select(.sessionId == $sid) |
         select(.type == "user") |
         select(.isMeta != true) |
         .message.content |
         if type == "array" then .[]? | select(.type == "text") | .text
         elif type == "string" then .
         else empty end' \
        "$TRANSCRIPT_PATH_POSIX" 2>/dev/null \
        | grep -v "^<" | head -1 | sed 's/^[[:space:]]*//' | cut -c1-200)
fi
if [ -z "$LAST_PROMPT" ]; then
    LAST_PROMPT="(작업 내용 없음)"
fi

# 실행 시간: 마지막 user 메시지 ~ 마지막 레코드 타임스탬프 차이 (Node.js로 계산)
ELAPSED="측정 불가"
if [ -f "$TRANSCRIPT_PATH_POSIX" ] && [ -n "$SESSION_ID_FULL" ]; then
    ELAPSED=$(node -e "
const fs = require('fs');
const sid = '$SESSION_ID_FULL';
let lastUserTs = null;
let lastTs = null;
try {
  const lines = fs.readFileSync('$TRANSCRIPT_PATH_POSIX', 'utf8').split('\n').filter(Boolean);
  for (const line of lines) {
    try {
      const obj = JSON.parse(line);
      if (obj.sessionId !== sid) continue;
      if (!obj.timestamp) continue;
      const t = new Date(obj.timestamp).getTime();
      if (isNaN(t)) continue;
      lastTs = t;
      if (obj.type === 'user' && !obj.isMeta) {
        lastUserTs = t;
      }
    } catch(e) {}
  }
} catch(e) {}
if (lastUserTs !== null && lastTs !== null && lastTs > lastUserTs) {
  console.log(Math.round((lastTs - lastUserTs) / 1000) + '초');
} else {
  console.log('측정 불가');
}
" 2>/dev/null || echo "측정 불가")
fi

# Slack payload 생성
PAYLOAD=$(jq -n \
  --arg project "$PROJECT_NAME" \
  --arg session "$SESSION_ID" \
  --arg prompt "$LAST_PROMPT" \
  --arg status "$STATUS" \
  --arg elapsed "$ELAPSED" \
  --arg timestamp "$TIMESTAMP" \
  --argjson is_error "$IS_ERROR" \
  '{
    blocks: [
      {
        type: "section",
        fields: [
          { type: "mrkdwn", text: ("*프로젝트*\n`" + $project + "`") },
          { type: "mrkdwn", text: ("*세션*\n`" + $session + "...`") }
        ]
      },
      {
        type: "section",
        text: { type: "mrkdwn", text: ("*작업 내용*\n" + $prompt) }
      },
      {
        type: "section",
        fields: [
          { type: "mrkdwn", text: ("*상태*\n" + $status) },
          { type: "mrkdwn", text: ("*실행 시간*\n" + $elapsed) }
        ]
      }
    ] +
    (if $is_error then [{
      type: "section",
      text: { type: "mrkdwn", text: "*실패 원인*\n훅에 의해 세션이 중단되었습니다." }
    }] else [] end) +
    [{
      type: "context",
      elements: [{ type: "mrkdwn", text: $timestamp }]
    }]
  }')

TMPFILE=$(mktemp)
printf '%s' "$PAYLOAD" > "$TMPFILE"

/mingw64/bin/curl -s -X POST \
    -H 'Content-type: application/json; charset=utf-8' \
    --data "@$TMPFILE" \
    "$SLACK_WEBHOOK_URL" \
    > /dev/null 2>&1

rm -f "$TMPFILE"
exit 0
