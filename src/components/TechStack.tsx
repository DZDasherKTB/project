import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { techStack } from '../constants';
import FadeInSection from './ui/FadeInSection';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CATEGORY_LABELS = {
  language: 'Languages',
  library: 'Libraries',
  framework: 'Frameworks'
};

const TechStack: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'language' | 'library' | 'framework'>('language');
  const [expanded, setExpanded] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const filteredTech = techStack.filter(tech => tech.category === activeCategory);
  
  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };
  
  return (
    <section id="tech" className="section-container">
      <FadeInSection>
        <h2 className="section-title neon-text">Tech Stack</h2>
      </FadeInSection>
      
      <div className="flex justify-center mt-12 mb-8">
        <div className="inline-flex rounded-md overflow-hidden">
          {Object.entries(CATEGORY_LABELS).map(([category, label]) => (
            <button
              key={category}
              className={`px-6 py-3 font-display font-bold transition-all duration-300 ${
                activeCategory === category 
                  ? 'bg-primary text-text-primary shadow-[0_0_15px_rgba(176,38,255,0.3)]' 
                  : 'bg-surface-light text-text-secondary hover:bg-primary/20'
              }`}
              onClick={() => {
                setActiveCategory(category as 'language' | 'library' | 'framework');
                setExpanded(false);
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="relative"
        >
          {/* Scroll Buttons */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-surface/80 p-2 rounded-full backdrop-blur-sm hover:bg-primary/20 transition-colors"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-surface/80 p-2 rounded-full backdrop-blur-sm hover:bg-primary/20 transition-colors"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          
          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto hide-scrollbar"
            style={{ scrollbarWidth: 'none' }}
          >
            <div className={`flex gap-6 pb-4 ${expanded ? 'flex-wrap' : 'flex-nowrap'}`}>
              {filteredTech.map((tech, index) => (
                <FadeInSection key={tech.name} delay={index * 0.1}>
                  <motion.div
                    className="cyberpunk-card flex flex-col items-center justify-center text-center h-56 min-w-[240px]"
                    whileHover={{ 
                      y: -10,
                      scale: 1.02,
                      boxShadow: '0 15px 30px rgba(176, 38, 255, 0.3)'
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <img 
                        src={`https://raw.githubusercontent.com/devicons/devicon/master/icons/${tech.name.toLowerCase()}/${tech.name.toLowerCase()}-original.svg`}
                        alt={tech.name}
                        className="w-12 h-12"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://via.placeholder.com/48/B026FF/FFFFFF/?text=${tech.name[0]}`;
                        }}
                      />
                    </div>
                    <h3 className="text-xl font-display font-bold">{tech.name}</h3>
                    <p className="text-text-tertiary text-sm">{CATEGORY_LABELS[tech.category]}</p>
                  </motion.div>
                </FadeInSection>
              ))}
            </div>
          </div>
          
          {filteredTech.length > 4 && (
            <div className="flex justify-center mt-8">
              <button
                className="cyberpunk-button"
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? 'Show Less' : 'Show All'}
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default TechStack;