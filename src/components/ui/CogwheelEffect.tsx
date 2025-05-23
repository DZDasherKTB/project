import React, { useEffect, useState } from 'react';
import { Cog } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

const CogwheelEffect: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 720]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  if (isMobile) return null;

  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-10 hidden md:block">
      <div className="relative">
        <motion.div style={{ rotate }} className="text-primary">
          <Cog size={48} className="opacity-80" />
        </motion.div>
        <motion.div 
          style={{ rotate: useTransform(rotate, value => -value) }} 
          className="absolute top-16 left-0 text-secondary"
        >
          <Cog size={36} className="opacity-60" />
        </motion.div>
        <motion.div 
          style={{ rotate }} 
          className="absolute top-32 left-4 text-accent"
        >
          <Cog size={24} className="opacity-40" />
        </motion.div>
      </div>
    </div>
  );
};

export default CogwheelEffect;