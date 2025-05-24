export interface NavLink {
  id: string;
  title: string;
}

export interface Skill {
  id: string;
  name: string;
  icon: string;
  category: string;
  level: number;
}

export interface TechItem {
  name: string;
  icon: string;
  category: 'language' | 'library' | 'framework' | 'tool' | 'hardware';
  img?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  demoLink?: string;
  codeLink?: string;
  featured: boolean;
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
}

export interface Social {
  id: string;
  name: string;
  url: string;
  icon: string;
}

export interface TimelineActivity {
  id: string;
  date: string;
  title: string;
  description: string;
  category: string;
  icon: string;
}