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

export interface TechStack {
  id: string;
  name: string;
  icon: string;
  category: 'language' | 'library' | 'framework' | 'tool';
  img?: string;
  created_at: string;
}
export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  date: string;
  icon: string;
  iconBg: string;
  created_at: string;
}
