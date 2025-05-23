import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-scroll';
import HeroParticles from './ui/HeroParticles';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative h-screen flex items-center">
      <HeroParticles />
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-xl md:text-2xl font-display text-secondary mb-2">
              <span className="inline-block">
                Hi there
                <motion.span
                  initial={{ rotate: 0 }}
                  animate={{ rotate: [0, 20, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 5,
                    ease: "easeInOut"
                  }}
                  className="inline-block ml-2"
                >
                  👋
                </motion.span>
              </span>
            </h2>
          </motion.div>

          <motion.h1 
            className="text-5xl md:text-7xl font-display font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            I'm <span className="neon-text">Dashpreet Singh</span>
          </motion.h1>

          <motion.p 
            className="text-xl md:text-2xl text-text-secondary mb-8 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            A <span className="text-primary">Full Stack Developer</span> and <span className="text-secondary">Deep Learning Engineer</span> building innovative solutions to complex problems.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link to="projects" smooth duration={500}>
              <button className="cyberpunk-button">
                View Projects
              </button>
            </Link>
            <Link to="contact" smooth duration={500}>
              <button className="cyberpunk-button border-secondary hover:bg-secondary/20 hover:shadow-[0_0_15px_rgba(0,255,255,0.5)]">
                Contact Me
              </button>
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <Link to="skills" smooth duration={500} className="cursor-pointer">
          <ChevronDown className="h-8 w-8 text-primary" />
        </Link>
      </div>
    </section>
  );
};

export default Hero;