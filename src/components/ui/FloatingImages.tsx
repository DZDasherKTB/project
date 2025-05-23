import React from 'react';
import { motion } from 'framer-motion';

const images = [
  {
    src: "https://images.pexels.com/photos/1292241/pexels-photo-1292241.jpeg",
    alt: "Futuristic tech",
    width: 120,
    height: 120
  },
  {
    src: "https://images.pexels.com/photos/6085318/pexels-photo-6085318.jpeg",
    alt: "Space",
    width: 100,
    height: 100
  },
  {
    src: "https://images.pexels.com/photos/2387793/pexels-photo-2387793.jpeg",
    alt: "Circuit board",
    width: 150,
    height: 150
  },
  {
    src: "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg",
    alt: "Tech interface",
    width: 110,
    height: 110
  }
];

const FloatingImages: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {images.map((image, index) => (
        <motion.div
          key={index}
          className="absolute opacity-20"
          initial={{ 
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            x: [
              Math.random() * window.innerWidth, 
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth
            ],
            y: [
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight
            ],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 60 + Math.random() * 30,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <img 
            src={image.src} 
            alt={image.alt}
            className="rounded-lg object-cover"
            style={{ 
              width: image.width, 
              height: image.height,
              filter: "saturate(0.8) brightness(0.7)"
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingImages;