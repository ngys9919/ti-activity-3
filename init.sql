-- Run this in your Supabase SQL Editor

-- 1. Create Rooms Table
CREATE TABLE IF NOT EXISTS rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create Bookings Table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id UUID REFERENCES rooms(id),
  customer_name TEXT NOT NULL,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Seed Rooms (Only if empty)
INSERT INTO rooms (name, description, price, image_url)
SELECT 'Deluxe Ocean View', 'A luxurious room with a stunning view of the Pacific Ocean.', 250, 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=1000'
WHERE NOT EXISTS (SELECT 1 FROM rooms WHERE name = 'Deluxe Ocean View');

INSERT INTO rooms (name, description, price, image_url)
SELECT 'Executive Suite', 'Spacious suite with a private balcony and premium amenities.', 450, 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=1000'
WHERE NOT EXISTS (SELECT 1 FROM rooms WHERE name = 'Executive Suite');

INSERT INTO rooms (name, description, price, image_url)
SELECT 'Presidential Penthouse', 'The ultimate luxury experience with 360-degree city views.', 1200, 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1000'
WHERE NOT EXISTS (SELECT 1 FROM rooms WHERE name = 'Presidential Penthouse');

INSERT INTO rooms (name, description, price, image_url)
SELECT 'Garden Villa', 'Private villa surrounded by lush tropical gardens and a private pool.', 800, 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=1000'
WHERE NOT EXISTS (SELECT 1 FROM rooms WHERE name = 'Garden Villa');

-- 4. Enable RLS (Optional but recommended, for now we keep it simple or enable public access)
-- Note: By default, Supabase tables are protected. You might need to disable RLS or add policies.
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Allow public read access to rooms
CREATE POLICY "Allow public read access to rooms" ON rooms FOR SELECT USING (true);

-- Allow public insert access to bookings
CREATE POLICY "Allow public insert access to bookings" ON bookings FOR INSERT WITH CHECK (true);

-- Allow public read access to bookings (for demo purposes)
CREATE POLICY "Allow public read access to bookings" ON bookings FOR SELECT USING (true);
