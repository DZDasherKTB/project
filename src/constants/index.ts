import { Experience, NavLink, Project, Skill, Social, TechItem, TimelineActivity } from "../types";
import { 
  Braces, Code, Code2, Cog, Database, Flame, 
  Github, Gitlab, Instagram, Languages, Linkedin, 
  Mail, Server, Twitter
} from "lucide-react";

export const navLinks: NavLink[] = [
  { id: "home", title: "Home" },
  { id: "skills", title: "Skills" },
  { id: "about", title: "About" },
  { id: "education", title: "Education" },
  { id: "tech", title: "Tech Stack" },
  { id: "projects", title: "Projects" },
  { id: "experience", title: "Experience" },
  { id: "contact", title: "Contact" },
];

export const skills: Skill[] = [
  {
    id: "web-dev",
    name: "Web Development",
    icon: "Code",
    category: "Development",
    level: 90,
  },
  {
    id: "cyber-security",
    name: "Cyber Security",
    icon: "Shield",
    category: "Security",
    level: 25,
  },
  {
    id: "deep-learning",
    name: "Deep Learning",
    icon: "Brain",
    category: "AI",
    level: 30,
  },
  {
    id: "devops",
    name: "DevOps",
    icon: "Settings",
    category: "Infrastructure",
    level: 50,
  },
];

export const techStack: TechItem[] = [
  { name: "Python", icon: "Python", category: "language" },
  { name: "JavaScript", icon: "JavaScript", category: "language" },
  { name: "TypeScript", icon: "TypeScript", category: "language" },
  { name: "C++", icon: "Cplusplus", category: "language" },
  { name: "React", icon: "React", category: "library" },
  { name: "TensorFlow", icon: "TensorFlow", category: "library" },
  { name: "PyTorch", icon: "PyTorch", category: "library" },
  { name: "Pandas", icon: "Pandas", category: "library" },
  { name: "Node.js", icon: "NodeJs", category: "framework" },
  { name: "Next.js", icon: "Nextjs", category: "framework" },
  { name: "Django", icon: "Django", category: "framework" },
  { name: "Flask", icon: "Flask", category: "framework" },
];

export const projects: Project[] = [
  {
    id: "project-1",
    title: "AI-Powered Image Recognition",
    description: "A deep learning model for real-time image recognition using TensorFlow and React Native for mobile deployment.",
    tags: ["TensorFlow", "React Native", "Python", "JavaScript"],
    imageUrl: "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg",
    demoLink: "https://demo-link.com",
    codeLink: "https://github.com/username/project",
    featured: true,
  },
  {
    id: "project-2",
    title: "Blockchain Voting System",
    description: "A secure voting system built on Ethereum blockchain with smart contracts and a React frontend.",
    tags: ["Blockchain", "Ethereum", "Solidity", "React"],
    imageUrl: "https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg",
    demoLink: "https://demo-link.com",
    codeLink: "https://github.com/username/project",
    featured: true,
  },
  {
    id: "project-3",
    title: "Cybersecurity Threat Detection",
    description: "An ML-based system for detecting network intrusions and potential security threats in real-time.",
    tags: ["Python", "Scikit-learn", "TensorFlow", "Network Security"],
    imageUrl: "https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg",
    demoLink: "https://demo-link.com",
    codeLink: "https://github.com/username/project",
    featured: true,
  },
  {
    id: "project-4",
    title: "Cloud-Based Data Analytics Platform",
    description: "A scalable analytics platform built on AWS with real-time data processing capabilities.",
    tags: ["AWS", "Python", "React", "Apache Kafka"],
    imageUrl: "https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg",
    demoLink: "https://demo-link.com",
    codeLink: "https://github.com/username/project",
    featured: true,
  },
  {
    id: "project-5",
    title: "AR Navigation System",
    description: "An augmented reality navigation system for indoor spaces using mobile camera and sensor fusion.",
    tags: ["AR", "Unity", "C#", "Mobile Development"],
    imageUrl: "https://images.pexels.com/photos/5011647/pexels-photo-5011647.jpeg",
    demoLink: "https://demo-link.com",
    codeLink: "https://github.com/username/project",
    featured: true,
  },
];

export const experiences: Experience[] = [
  {
    id: "exp-1",
    title: "Machine Learning Engineer",
    company: "TechCorp AI",
    location: "San Francisco, CA",
    description: "Developed state-of-the-art ML models for image recognition and natural language processing applications.",
    date: "Jan 2023 - Present",
    icon: "Brain",
    iconBg: "#B026FF",
  },
  {
    id: "exp-2",
    title: "Full Stack Developer",
    company: "WebSolutions Inc.",
    location: "New York, NY",
    description: "Built responsive web applications using React, Node.js, and MongoDB with CI/CD pipeline integration.",
    date: "Jun 2021 - Dec 2022",
    icon: "Code",
    iconBg: "#00FFFF",
  },
  {
    id: "exp-3",
    title: "Cybersecurity Analyst",
    company: "SecureNet",
    location: "Boston, MA",
    description: "Performed security audits, vulnerability assessments, and implemented security measures for enterprise systems.",
    date: "Mar 2020 - May 2021",
    icon: "Shield",
    iconBg: "#FF00FF",
  },
];

export const socials: Social[] = [
  {
    id: "linkedin",
    name: "LinkedIn",
    url: "https://linkedin.com/in/username",
    icon: "Linkedin",
  },
  {
    id: "github",
    name: "GitHub",
    url: "https://github.com/username",
    icon: "Github",
  },
  {
    id: "twitter",
    name: "Twitter",
    url: "https://twitter.com/username",
    icon: "Twitter",
  },
  {
    id: "instagram",
    name: "Instagram",
    url: "https://instagram.com/username",
    icon: "Instagram",
  },
  {
    id: "email",
    name: "Email",
    url: "mailto:email@example.com",
    icon: "Mail",
  },
];

export const timelineActivities: TimelineActivity[] = [
  {
    id: "activity-1",
    date: "2023-05-15",
    title: "Completed ML Report on GANs",
    description: "Finished comprehensive research report on Generative Adversarial Networks and their applications in image synthesis.",
    category: "Research",
    icon: "FileText",
  },
  {
    id: "activity-2",
    date: "2023-05-14",
    title: "Fixed API Integration Bug",
    description: "Resolved critical issue with third-party API integration in the main dashboard application.",
    category: "Development",
    icon: "Code",
  },
  {
    id: "activity-3",
    date: "2023-05-13",
    title: "Cloud Architecture Design",
    description: "Created architecture diagram for new cloud-based microservices infrastructure.",
    category: "Architecture",
    icon: "Cloud",
  },
  {
    id: "activity-4",
    date: "2023-05-12",
    title: "Security Audit",
    description: "Performed comprehensive security audit on authentication system and implemented fixes.",
    category: "Security",
    icon: "Shield",
  },
  {
    id: "activity-5",
    date: "2023-05-11",
    title: "Machine Learning Model Training",
    description: "Trained and optimized new NLP model achieving 94% accuracy on test dataset.",
    category: "AI",
    icon: "Brain",
  },
];