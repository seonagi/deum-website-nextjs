-- Create chat_logs table for website chat widget logging
-- Run this in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS chat_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  agent TEXT NOT NULL,
  question TEXT NOT NULL,
  response TEXT NOT NULL,
  response_length INT NOT NULL,
  session_id TEXT,
  user_agent TEXT,
  ip_address INET
);

-- Index for faster queries by date
CREATE INDEX idx_chat_logs_created_at ON chat_logs(created_at DESC);

-- Index for agent performance analysis
CREATE INDEX idx_chat_logs_agent ON chat_logs(agent);

-- Enable Row Level Security (optional - disable public access)
ALTER TABLE chat_logs ENABLE ROW LEVEL SECURITY;

-- Policy: Only service role can insert/read (chat API uses service role key)
CREATE POLICY "Service role full access" ON chat_logs
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- View for analytics (optional)
CREATE OR REPLACE VIEW chat_analytics AS
SELECT 
  DATE(created_at) as date,
  agent,
  COUNT(*) as total_chats,
  AVG(response_length) as avg_response_length,
  COUNT(DISTINCT session_id) as unique_sessions
FROM chat_logs
GROUP BY DATE(created_at), agent
ORDER BY date DESC, total_chats DESC;

COMMENT ON TABLE chat_logs IS 'Website chat widget conversation logs';
COMMENT ON VIEW chat_analytics IS 'Daily chat metrics by agent';
