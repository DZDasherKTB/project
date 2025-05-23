import React from 'react';
import { motion } from 'framer-motion';
import FadeInSection from './ui/FadeInSection';

const About: React.FC = () => {
  return (
    <section id="about" className="section-container">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <FadeInSection direction="right">
          <div className="relative">
            <div className="w-full max-w-md aspect-square overflow-hidden rounded-lg border-2 border-primary relative mx-auto lg:mx-0">
              <img 
                src="https://images.pexels.com/photos/7775642/pexels-photo-7775642.jpeg" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-70" />
            </div>
            
            <div className="absolute -bottom-6 -right-6 w-40 h-40 border-2 border-secondary rounded-lg hidden lg:block" />
            <div className="absolute -top-6 -left-6 w-24 h-24 border-2 border-accent rounded-lg hidden lg:block" />
            
            <motion.div 
              className="absolute -top-4 -left-4 p-3 bg-surface border-2 border-primary rounded-md hidden lg:block"
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            >
              <span className="text-primary text-sm font-bold">1 Years Experience</span>
            </motion.div>
            
            <motion.div 
              className="absolute -bottom-4 -right-4 p-3 bg-surface border-2 border-secondary rounded-md hidden lg:block"
              animate={{ 
                y: [0, 10, 0],
                rotate: [0, -5, 0]
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            >
              <span className="text-secondary text-sm font-bold">5+ Realtime Projects</span>
            </motion.div>
          </div>
        </FadeInSection>
        
        <FadeInSection direction="left">
          <h2 className="section-title neon-text">About Me</h2>
          <div className="space-y-4 text-text-secondary">
            <p>
              I'm a passionate developer with expertise in both frontend and backend technologies, as well as machine learning and data science. With a strong foundation in computer science and years of hands-on experience, I bring a unique blend of technical knowledge and creative problem-solving to every project.
            </p>
            <p>
              My journey in tech started when I built my first website at the age of 14. Since then, I've expanded my skills to include modern web frameworks, cloud architecture, cybersecurity, and artificial intelligence. I'm constantly learning and exploring new technologies to stay at the cutting edge of the field.
            </p>
            <p>
              When I'm not coding, you can find me participating in hackathons, contributing to open-source projects, or writing technical articles to share my knowledge with the community.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="cyberpunk-card">
              <h3 className="text-lg font-display font-bold mb-1">Education</h3>
              <p className="text-text-secondary">B.Tech in Computer Science, Indian Institute of Technology, Jammu</p>
            </div>
            <div className="cyberpunk-card">
              <h3 className="text-lg font-display font-bold mb-1">Location</h3>
              <p className="text-text-secondary">Jammu, Jammu and Kashmir, India</p>
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

export default About;