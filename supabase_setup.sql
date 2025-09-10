-- Cauli App Database Setup
-- Chạy script này trong Supabase SQL Editor

-- Tạo bảng profiles
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Tạo bảng chat_messages
CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  message TEXT NOT NULL,
  is_user BOOLEAN NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tạo bảng diary_entries
CREATE TABLE IF NOT EXISTS diary_entries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  mood TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bật Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE diary_entries ENABLE ROW LEVEL SECURITY;

-- Tạo policies cho profiles
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Tạo policies cho chat_messages
DROP POLICY IF EXISTS "Users can view own messages" ON chat_messages;
CREATE POLICY "Users can view own messages" ON chat_messages FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own messages" ON chat_messages;
CREATE POLICY "Users can insert own messages" ON chat_messages FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Tạo policies cho diary_entries
DROP POLICY IF EXISTS "Users can view own entries" ON diary_entries;
CREATE POLICY "Users can view own entries" ON diary_entries FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own entries" ON diary_entries;
CREATE POLICY "Users can insert own entries" ON diary_entries FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own entries" ON diary_entries;
CREATE POLICY "Users can update own entries" ON diary_entries FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own entries" ON diary_entries;
CREATE POLICY "Users can delete own entries" ON diary_entries FOR DELETE USING (auth.uid() = user_id);

-- Tạo function để tự động tạo profile khi user đăng ký
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Tạo trigger để tự động tạo profile
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Tạo indexes để tối ưu performance
CREATE INDEX IF NOT EXISTS idx_chat_messages_user_id ON chat_messages(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at ON chat_messages(created_at);
CREATE INDEX IF NOT EXISTS idx_diary_entries_user_id ON diary_entries(user_id);
CREATE INDEX IF NOT EXISTS idx_diary_entries_created_at ON diary_entries(created_at);

-- Thêm một số dữ liệu mẫu cho testing (tùy chọn)
-- INSERT INTO chat_messages (user_id, message, is_user) VALUES 
-- ('00000000-0000-0000-0000-000000000000', 'Xin chào! Mình là Cauli, người bạn đồng hành tâm lý của bạn.', false);

COMMENT ON TABLE profiles IS 'Thông tin hồ sơ người dùng';
COMMENT ON TABLE chat_messages IS 'Tin nhắn chat với Cauli AI';
COMMENT ON TABLE diary_entries IS 'Nhật ký cá nhân của người dùng';
