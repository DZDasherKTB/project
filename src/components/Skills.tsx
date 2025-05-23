import React from 'react';
import { motion } from 'framer-motion';
import { skills } from '../constants';
import FadeInSection from './ui/FadeInSection';
import { Brain, Code, Cloud, BarChart, Shield, GitMerge } from 'lucide-react';
import { Cpu, Wrench, Puzzle, Settings2, Box, Zap, MessageCircle, Camera, Server, CreditCard, Link2, Repeat } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Code: <Code className="h-10 w-10" />,
  Shield: <Shield className="h-10 w-10" />,
  Brain: <Brain className="h-10 w-10" />,
  BarChart: <BarChart className="h-10 w-10" />,
  Cloud: <Cloud className="h-10 w-10" />,
  GitMerge: <GitMerge className="h-10 w-10" />,
  Cpu: <Cpu className="h-10 w-10" />,              // Full Stack Automation
  Wrench: <Wrench className="h-10 w-10" />,        // Applied Software Engineering
  Puzzle: <Puzzle className="h-10 w-10" />,        // System Integration
  Settings2: <Settings2 className="h-10 w-10" />,  // Automation Engineering
  Box: <Box className="h-10 w-10" />,              // Product Engineering
  Zap: <Zap className="h-10 w-10" />,              // AI Automation
  MessageCircle: <MessageCircle className="h-10 w-10" />, // Bot Development
  Camera: <Camera className="h-10 w-10" />,        // Computer Vision
  Server: <Server className="h-10 w-10" />,        // Backend Dev
  CreditCard: <CreditCard className="h-10 w-10" />,// Payment Integration
  Link2: <Link2 className="h-10 w-10" />,          // API Integration
  Repeat: <Repeat className="h-10 w-10" />         // Automation Flows
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