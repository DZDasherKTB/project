import React from 'react';
import { motion } from 'framer-motion';
import { skills } from '../constants';
import FadeInSection from './ui/FadeInSection';
import { Brain, Code, Cloud, BarChart, Shield, GitMerge } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Code: <Code className="h-10 w-10" />,
  Shield: <Shield className="h-10 w-10" />,
  Brain: <Brain className="h-10 w-10" />,
  BarChart: <BarChart className="h-10 w-10" />,
  Cloud: <Cloud className="h-10 w-10" />,
  GitMerge: <GitMerge className="h-10 w-10" />,
};

const Skills: React.FC = () => {
  return (
    <section id="skills" className="section-container">
      <FadeInSection>
        <h2 className="section-title neon-text">Skills</h2>
      </FadeInSection>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {skills.map((skill, index) => (
          <FadeInSection key={skill.id} delay={index * 0.1} direction="up">
            <motion.div 
              className="cyberpunk-card h-full flex flex-col"
              whileHover={{ 
                y: -8,
                boxShadow: '0 10px 30px rgba(176, 38, 255, 0.3)'
              }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 20 
              }}
            >
              <div className="text-primary mb-4">
                {iconMap[skill.icon]}
              </div>
              <h3 className="text-xl font-display font-bold mb-2">{skill.name}</h3>
              <p className="text-text-secondary mb-4">{skill.category}</p>
              
              <div className="mt-auto">
                <div className="w-full h-2 bg-surface-light rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-primary"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: 0.3 }}
                  />
                </div>
                <div className="flex justify-between mt-2 text-xs text-text-tertiary">
                  <span>Beginner</span>
                  <span>Advanced</span>
                </div>
              </div>
            </motion.div>
          </FadeInSection>
        ))}
      </div>
    </section>
  );
};

export default Skills;