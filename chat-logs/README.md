# Chat Logs

This directory contains chat interaction logs.
Each file is named by date (YYYY-MM-DD.jsonl).

Each line is a JSON object:
- timestamp: ISO timestamp
- agent: Agent name (Sarah, Matt, etc.)
- question: User's question
- response: Agent's response
- responseLength: Character count

View logs with:
```bash
# Today's chats
cat chat-logs/2026-03-26.jsonl | jq .

# Count questions today
wc -l chat-logs/2026-03-26.jsonl

# Most common topics
cat chat-logs/*.jsonl | jq -r .question | sort | uniq -c | sort -rn
```
