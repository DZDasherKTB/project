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
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <FadeInSection delay={index * 0.1}>
      <motion.div
          role="button"
          tabIndex={0}
          onClick={() => setShowModal(true)}
          onKeyDown={(e) => e.key === 'Enter' && setShowModal(true)}
          className="relative group rounded-xl overflow-hidden h-80 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
          whileHover={{ y: -10 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Image & overlay */}
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-background via-background/80 to-transparent opacity-80" />
          <img 
            src={project.image_url} 
            alt={project.title}
            className="w-full h-full object-cover absolute inset-0 transition-transform duration-500 group-hover:scale-110"
          />

          {/* Content */}
          <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end">
            <h3 className="text-2xl font-display font-bold mb-2">{project.title}</h3>

            <p className="text-text-secondary mb-2 line-clamp-2 opacity-90">
              {project.short_description}
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

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.96, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 10 }}
              transition={{ type: 'spring', stiffness: 160, damping: 22 }}
              className="relative max-w-2xl w-full rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(255,0,255,0.05)] border border-white/10"
            >
              {/* Background Image */}
              <img
                src={project.image_url}
                alt="Project background"
                className="absolute inset-0 w-full h-full object-cover opacity-30 blur-sm"
              />
              <div className="relative z-10 p-6 sm:p-8 bg-background/60 backdrop-blur-xl rounded-2xl">

                {/* Close Button */}
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-4 right-4 text-text-secondary hover:text-primary text-lg transition-colors duration-200"
                  aria-label="Close"
                >
                  ✕
                </button>
                {/* Title */}
                <h3
                  className="font-display text-3xl sm:text-4xl font-bold tracking-wide text-primary mb-6 transition-all duration-700 hover:tracking-widest hover:text-accent"
                >
                  {project.title}
                </h3>


                {/* Frosted Description */}
                <div
                  className="bg-white/10 text-text-secondary text-sm leading-relaxed p-4 rounded-lg shadow-inner mb-5 max-h-[300px] overflow-y-auto"
                  dangerouslySetInnerHTML={{ __html: project.description }}
                />

                {/* Tags */}
                {project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-medium bg-white/10 text-text-secondary px-2 py-1 rounded-md transition-transform duration-200 hover:scale-105 hover:bg-primary/20 hover:text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Buttons */}
                <div className="flex justify-end gap-3 mt-6">
                  {project.demo_link && (
                    <a
                      href={project.demo_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2 text-sm rounded-md font-medium bg-primary/90 text-white hover:bg-primary hover:scale-105 transition-all duration-200 shadow-md backdrop-blur-sm"
                    >
                      Live Demo
                    </a>
                  )}

                  {project.code_link && (
                    <a
                      href={project.code_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2 text-sm rounded-md font-medium border border-secondary text-secondary hover:bg-secondary/10 hover:scale-105 transition-all duration-200 shadow-md backdrop-blur-sm"
                    >
                      Code
                    </a>
                  )}
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* End Modal */}
    </>
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
        setProjects(data ?? []);
      }

      setLoading(false);
    };

    fetchProjects();
  }, []);

  const displayedProjects = showAll
    ? projects
    : projects.filter((p) => p.featured).slice(0, 5);

  return (
    <section id="projects" className="section-container">
      <FadeInSection>
        <h2 className="section-title neon-text">Projects</h2>
      </FadeInSection>

      {loading ? (
        <div className="text-center mt-12">Loading...</div>
      ) : (
        <>
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
        </>
      )}
    </section>
  );
};

export default Projects;
