# Chat Logging Setup Guide

## 1. Create Supabase Table

1. Go to your Supabase project: https://supabase.com/dashboard
2. Click **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy the contents of `supabase-migration-chat-logs.sql`
5. Paste and click **Run**

## 2. Add Environment Variables to Vercel

1. Go to Vercel dashboard: https://vercel.com/dashboard
2. Select `deum-website-nextjs` project
3. Go to **Settings** → **Environment Variables**
4. Add these variables (for all environments: Production, Preview, Development):

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

**Where to find these values:**
- Go to Supabase dashboard → **Settings** → **API**
- `NEXT_PUBLIC_SUPABASE_URL` = "Project URL"
- `SUPABASE_SERVICE_ROLE_KEY` = "service_role" key (secret, NOT anon key!)

## 3. Deploy

```bash
git add -A
git commit -m "feat: add Supabase chat logging"
git push origin main
```

Vercel will auto-deploy with the new environment variables.

## 4. Verify Logging Works

1. Visit https://deum.video
2. Chat with the widget
3. Go to Supabase → **Table Editor** → `chat_logs`
4. You should see your chat logged!

## Viewing Logs

### Supabase Dashboard
- **Table Editor** → `chat_logs` (see all chats)
- **SQL Editor** → Run queries for analytics

### Example Queries

**Today's chats:**
```sql
SELECT * FROM chat_logs 
WHERE created_at >= CURRENT_DATE 
ORDER BY created_at DESC;
```

**Most common questions:**
```sql
SELECT question, COUNT(*) as count
FROM chat_logs
GROUP BY question
ORDER BY count DESC
LIMIT 10;
```

**Agent performance:**
```sql
SELECT agent, COUNT(*) as chats, AVG(response_length) as avg_length
FROM chat_logs
GROUP BY agent
ORDER BY chats DESC;
```

**Daily analytics view:**
```sql
SELECT * FROM chat_analytics 
WHERE date >= CURRENT_DATE - INTERVAL '7 days'
ORDER BY date DESC;
```

## What Gets Logged

- `created_at` - Timestamp (auto)
- `agent` - Agent name (Sarah, Matt, Alex, Jordan)
- `question` - User's message
- `response` - Agent's response
- `response_length` - Character count
- `session_id` - (Optional, for future session tracking)
- `user_agent` - (Optional, for future device tracking)
- `ip_address` - (Optional, for future geo tracking)

## Privacy Notes

- RLS (Row Level Security) is enabled
- Only service role can read/write (API-only access)
- No public access to logs
- Consider GDPR compliance for EU users (anonymize IPs if needed)

## Cost

Supabase Free Tier includes:
- 500 MB database
- Unlimited API requests
- 2 GB bandwidth

Chat logs are tiny (~200 bytes each), so you can log thousands for free!
