import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FadeInSection from './ui/FadeInSection';
import { ExternalLink, Github } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Project } from '../types/supabase';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <FadeInSection delay={index * 0.1}>
      <motion.div
        className="relative group rounded-xl overflow-hidden h-80"
        whileHover={{ y: -10 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-background via-background/80 to-transparent opacity-80" />
        
        <img 
          src={project.image_url} 
          alt={project.title}
          className="w-full h-full object-cover absolute inset-0 transition-transform duration-500 group-hover:scale-110"
        />
        
        <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end">
          <h3 className="text-2xl font-display font-bold mb-2">{project.title}</h3>
          
          <p className="text-text-secondary mb-4 line-clamp-2 opacity-90">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <span 
                key={tag} 
                className="text-xs bg-primary/20 text-primary px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <motion.div
            className="flex gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.3 }}
          >
            {project.demo_link && (
              <a 
                href={project.demo_link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="cyberpunk-button py-2 flex items-center gap-2"
              >
                <span>Live Demo</span>
                <ExternalLink size={16} />
              </a>
            )}
            
            {project.code_link && (
              <a 
                href={project.code_link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="cyberpunk-button py-2 border-secondary flex items-center gap-2 hover:bg-secondary/20"
              >
                <span>Code</span>
                <Github size={16} />
              </a>
            )}
          </motion.div>
        </div>
      </motion.div>
    </FadeInSection>
  );
};

const Projects: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching projects:', error);
      } else {
        setProjects(data || []);
      }
      setLoading(false);
    };

    fetchProjects();
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  const displayedProjects = showAll
    ? projects
    : projects.filter((p) => p.featured).slice(0, 5);

  return (
    <section id="projects" className="section-container">
      <FadeInSection>
        <h2 className="section-title neon-text">Projects</h2>
      </FadeInSection>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        <AnimatePresence>
          {displayedProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </AnimatePresence>
      </div>

      {!showAll && projects.length > 5 && (
        <div className="flex justify-center mt-12">
          <button className="cyberpunk-button" onClick={() => setShowAll(true)}>
            Show More
          </button>
        </div>
      )}
    </section>
  );
};

export default Projects;
