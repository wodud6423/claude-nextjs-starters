#!/bin/bash
INPUT=$(cat)

TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
LOG_FILE="$CLAUDE_PROJECT_DIR/.claude/hooks/tool-usage.log"

TOOL_NAME=$(echo "$INPUT" | jq -r '.tool.name // "unknown"')

echo "[$TIMESTAMP] $TOOL_NAME" >> "$LOG_FILE"
echo "$INPUT" | jq '.' >> "$LOG_FILE" 2>/dev/null
echo "---" >> "$LOG_FILE"

exit 0
