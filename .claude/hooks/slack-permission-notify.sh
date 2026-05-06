#!/bin/bash
# PermissionRequest 이벤트: Slack 알림 전송 후 exit 0 (차단하지 않음)

INPUT=$(cat)

ENV_FILE="$CLAUDE_PROJECT_DIR/.claude/.env.slack"
if [ -f "$ENV_FILE" ]; then
    source "$ENV_FILE"
fi

if [ -z "$SLACK_WEBHOOK_URL" ]; then
    exit 0
fi

TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name // "unknown"')
CWD=$(echo "$INPUT" | jq -r '.cwd // ""')
SESSION_ID=$(echo "$INPUT" | jq -r '(.session_id // "")[:8]')
MESSAGE=$(echo "$INPUT" | jq -r '.message // ""')

TOOL_INPUT=$(echo "$INPUT" | jq -r '
  .tool_input |
  if .command then .command[:300]
  elif .path then .path[:300]
  elif .file_path then .file_path[:300]
  else (. | tojson)[:300]
  end
')

TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

PAYLOAD=$(jq -n \
  --arg tool_name "$TOOL_NAME" \
  --arg tool_input "$TOOL_INPUT" \
  --arg cwd "$CWD" \
  --arg session_id "$SESSION_ID" \
  --arg message "$MESSAGE" \
  --arg timestamp "$TIMESTAMP" \
  '{
    blocks: [
      {
        type: "header",
        text: { type: "plain_text", text: "[Claude] 권한 요청", emoji: true }
      },
      {
        type: "section",
        fields: [
          { type: "mrkdwn", text: ("*도구*\n`" + $tool_name + "`") },
          { type: "mrkdwn", text: ("*세션*\n`" + $session_id + "...`") }
        ]
      },
      {
        type: "section",
        text: { type: "mrkdwn", text: ("*명령/입력*\n```" + $tool_input + "```") }
      }
    ] +
    (if $message != "" then [{
      type: "section",
      text: { type: "mrkdwn", text: ("*메시지*\n" + $message) }
    }] else [] end) +
    [{
      type: "context",
      elements: [{ type: "mrkdwn", text: ($cwd + "  |  " + $timestamp) }]
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
