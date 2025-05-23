/*
  # Initial Schema Setup for Portfolio

  1. New Tables
    - `activities`
      - `id` (uuid, primary key)
      - `date` (date)
      - `title` (text)
      - `description` (text)
      - `category` (text)
      - `icon` (text)
      - `created_at` (timestamp)
    
    - `projects`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `tags` (text[])
      - `image_url` (text)
      - `demo_link` (text)
      - `code_link` (text)
      - `featured` (boolean)
      - `created_at` (timestamp)
    
    - `messages`
      - `id` (uuid, primary key)
      - `name` (text)
      - `message` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Activities Table
CREATE TABLE IF NOT EXISTS activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date NOT NULL,
  title text NOT NULL,
  description text,
  category text,
  icon text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE activities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to activities"
  ON activities
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to manage activities"
  ON activities
  USING (auth.role() = 'authenticated');

-- Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  tags text[],
  image_url text,
  demo_link text,
  code_link text,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to projects"
  ON projects
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to manage projects"
  ON projects
  USING (auth.role() = 'authenticated');

-- Messages Table
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public to create messages"
  ON messages
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to read messages"
  ON messages
  FOR SELECT
  TO authenticated
  USING (true);

-- 