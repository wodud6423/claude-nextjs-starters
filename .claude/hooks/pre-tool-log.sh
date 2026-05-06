#!/bin/bash
INPUT=$(cat)

TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
LOG_FILE="$CLAUDE_PROJECT_DIR/.claude/hooks/tool-usage.log"

TOOL_NAME=$(echo "$INPUT" | python3 -c "
import sys,json
try:
    d=json.load(sys.stdin)
    print(d.get('tool',{}).get('name','unknown'))
except:
    print('parse_error')
")

echo "[$TIMESTAMP] $TOOL_NAME" >> "$LOG_FILE"
echo "$INPUT" | python3 -m json.tool >> "$LOG_FILE" 2>/dev/null
echo "---" >> "$LOG_FILE"

exit 0