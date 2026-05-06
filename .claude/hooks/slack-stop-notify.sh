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
PROJECT_NAME=$(echo "$INPUT" | jq -r '.cwd // "" | split("/") | last | if . == "" then "unknown" else . end')
SESSION_ID=$(echo "$INPUT" | jq -r '(.session_id // "")[:8]')
STOP_REASON=$(echo "$INPUT" | jq -r '.stop_reason // "unknown"')
TRANSCRIPT_PATH=$(echo "$INPUT" | jq -r '.transcript_path // ""')
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

# 성공/실패 판단
if [ "$STOP_REASON" = "end_turn" ]; then
    STATUS="✅ 성공"
    IS_ERROR=false
else
    STATUS="❌ 실패 ($STOP_REASON)"
    IS_ERROR=true
fi

# 작업 내용: assistant 첫 응답 첫 줄(목표 요약)을 추출
LAST_PROMPT=""
if [ -f "$TRANSCRIPT_PATH" ]; then
    LAST_PROMPT=$(jq -r 'select(.message.role == "assistant") | .message.content[]? | select(.type == "text") | .text' "$TRANSCRIPT_PATH" 2>/dev/null \
        | head -1 | sed 's/^[[:space:]]*//' | cut -c1-200)
fi
if [ -z "$LAST_PROMPT" ]; then
    LAST_PROMPT="(작업 내용 없음)"
fi

# 실행 시간: transcript 첫/마지막 타임스탬프 차이
ELAPSED="측정 불가"
if [ -f "$TRANSCRIPT_PATH" ]; then
    FIRST_TS=$(jq -r '.timestamp // empty' "$TRANSCRIPT_PATH" 2>/dev/null | head -1)
    LAST_TS=$(jq -r '.timestamp // empty' "$TRANSCRIPT_PATH" 2>/dev/null | tail -1)
    if [ -n "$FIRST_TS" ] && [ -n "$LAST_TS" ]; then
        T1=$(date -d "$FIRST_TS" +%s 2>/dev/null)
        T2=$(date -d "$LAST_TS" +%s 2>/dev/null)
        if [ -n "$T1" ] && [ -n "$T2" ]; then
            DIFF=$((T2 - T1))
            ELAPSED="${DIFF}초"
        fi
    fi
fi

# 실패 원인 분석 (3분 제한)
FAILURE_REASON=""
if [ "$IS_ERROR" = true ] && [ -f "$TRANSCRIPT_PATH" ]; then
    FAILURE_REASON=$(timeout 180 bash -c "
        jq -r 'select(.message.role == \"assistant\") | .message.content[]? | select(.type == \"text\") | .text' \"$TRANSCRIPT_PATH\" 2>/dev/null \
        | tail -1 | cut -c1-200
    " 2>/dev/null)
    EXIT_CODE=$?
    if [ $EXIT_CODE -eq 124 ] || [ -z "$FAILURE_REASON" ]; then
        FAILURE_REASON="3분안에 원인을 규명하지 못했습니다!"
    fi
fi

# Slack payload 생성
PAYLOAD=$(jq -n \
  --arg project "$PROJECT_NAME" \
  --arg session "$SESSION_ID" \
  --arg prompt "$LAST_PROMPT" \
  --arg status "$STATUS" \
  --arg elapsed "$ELAPSED" \
  --arg failure "$FAILURE_REASON" \
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
    (if $is_error and ($failure != "") then [{
      type: "section",
      text: { type: "mrkdwn", text: ("*실패 원인*\n" + $failure) }
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
