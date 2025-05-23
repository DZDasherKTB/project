import React from 'react';
import { Link } from 'react-scroll';
import { Cpu } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-surface py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-6 md:mb-0">
            <Cpu className="text-primary h-6 w-6" />
            <span className="font-display text-xl font-bold neon-text">
              Cyber<span className="text-secondary">Dev</span>
            </span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 mb-6 md:mb-0">
            <Link to="home" smooth duration={500} className="text-text-secondary hover:text-primary cursor-pointer transition-colors">
              Home
            </Link>
            <Link to="projects" smooth duration={500} className="text-text-secondary hover:text-primary cursor-pointer transition-colors">
              Projects
            </Link>
            <Link to="experience" smooth duration={500} className="text-text-secondary hover:text-primary cursor-pointer transition-colors">
              Experience
            </Link>
            <Link to="contact" smooth duration={500} className="text-text-secondary hover:text-primary cursor-pointer transition-colors">
              Contact
            </Link>
          </div>
          
          <p className="text-text-tertiary text-sm text-center md:text-right">
            &copy; {currentYear} CyberDev. All rights reserved.
          </p>
        </div>
        
        <div className="mt-8 pt-8 border-t border-surface-light text-center">
          <p className="text-text-secondary">
            Happy to collaborate with you! <span className="text-primary">Let's build something amazing.</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;