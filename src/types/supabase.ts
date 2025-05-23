export interface Activity {
  id: string;
  date: string;
  title: string;
  description: string;
  category: string;
  icon: string;
  created_at: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image_url: string;
  demo_link?: string;
  code_link?: string;
  featured: boolean;
  created_at: string;
}

export interface Message {
  id: string;
  name: string;
  message: string;
  created_at: string;
}