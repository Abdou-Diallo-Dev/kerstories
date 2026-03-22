-- ═══════════════════════════════════════════════════════════════
--  KërStories — Script SQL Supabase COMPLET v3
--  Supabase Dashboard → SQL Editor → New query → Run
-- ═══════════════════════════════════════════════════════════════

-- ── 1. Profiles utilisateurs (extension de auth.users) ──────────
CREATE TABLE IF NOT EXISTS profiles (
  id           UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name    TEXT,
  avatar_url   TEXT,
  role         TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  plan         TEXT NOT NULL DEFAULT 'free' CHECK (plan IN ('free', 'premium')),
  stories_today INT NOT NULL DEFAULT 0,
  last_story_date DATE,
  total_stories INT NOT NULL DEFAULT 0,
  created_at   TIMESTAMPTZ DEFAULT now(),
  updated_at   TIMESTAMPTZ DEFAULT now()
);

-- ── 2. Profils enfants ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS child_profiles (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  prenom     TEXT NOT NULL,
  genre      TEXT DEFAULT 'garçon',
  age        TEXT NOT NULL,
  pays       TEXT NOT NULL DEFAULT 'Sénégal',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ── 3. Histoires sauvegardées ───────────────────────────────────
CREATE TABLE IF NOT EXISTS saved_stories (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  child_id   UUID REFERENCES child_profiles(id) ON DELETE SET NULL,
  title      TEXT NOT NULL,
  content    JSONB NOT NULL,
  shared     BOOLEAN DEFAULT false,
  share_token TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ── 4. Logs d'usage IA (monitoring admin) ──────────────────────
CREATE TABLE IF NOT EXISTS ai_usage_logs (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action        TEXT NOT NULL,
  model         TEXT,
  tokens_used   INT DEFAULT 0,
  duration_ms   INT DEFAULT 0,
  success       BOOLEAN DEFAULT true,
  error_msg     TEXT,
  created_at    TIMESTAMPTZ DEFAULT now()
);

-- ── 5. Row Level Security ───────────────────────────────────────
ALTER TABLE profiles        ENABLE ROW LEVEL SECURITY;
ALTER TABLE child_profiles  ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_stories   ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_usage_logs   ENABLE ROW LEVEL SECURITY;

-- profiles
CREATE POLICY "Users view own profile"   ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admin view all profiles"  ON profiles FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- child_profiles
CREATE POLICY "Users CRUD own children" ON child_profiles FOR ALL USING (auth.uid() = user_id);

-- saved_stories
CREATE POLICY "Users CRUD own stories"    ON saved_stories FOR ALL    USING (auth.uid() = user_id);
CREATE POLICY "Anyone view shared story"  ON saved_stories FOR SELECT USING (shared = true);

-- ai_usage_logs
CREATE POLICY "Users view own logs" ON ai_usage_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Service insert logs" ON ai_usage_logs FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin view all logs" ON ai_usage_logs FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- ── 6. Trigger : créer profil auto à l'inscription ─────────────
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- ── 7. Trigger : updated_at auto ───────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at();

-- ── 8. Fonction : incrémenter compteur histoires ────────────────
CREATE OR REPLACE FUNCTION increment_story_count(p_user_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE profiles SET
    stories_today = CASE
      WHEN last_story_date = CURRENT_DATE THEN stories_today + 1
      ELSE 1
    END,
    last_story_date = CURRENT_DATE,
    total_stories   = total_stories + 1
  WHERE id = p_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ── 9. Vue admin : stats globales ──────────────────────────────
CREATE OR REPLACE VIEW admin_stats AS
SELECT
  (SELECT COUNT(*) FROM profiles)                          AS total_users,
  (SELECT COUNT(*) FROM profiles WHERE plan = 'premium')   AS premium_users,
  (SELECT COUNT(*) FROM saved_stories)                     AS total_stories,
  (SELECT COUNT(*) FROM saved_stories WHERE created_at > NOW() - INTERVAL '24 hours') AS stories_today,
  (SELECT COUNT(*) FROM saved_stories WHERE created_at > NOW() - INTERVAL '7 days')   AS stories_week,
  (SELECT COUNT(*) FROM ai_usage_logs WHERE success = false AND created_at > NOW() - INTERVAL '24 hours') AS errors_today;

-- ✅ Setup terminé !
