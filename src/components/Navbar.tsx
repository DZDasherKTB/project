import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { navLinks } from '../constants';
import { Menu, X, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [active, setActive] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-background/80 backdrop-blur-md py-2 shadow-lg' : 'py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="home"
            smooth
            duration={500}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => {
              setActive('');
              window.scrollTo(0, 0);
            }}
          >
            <Cpu className="text-primary h-8 w-8" />
            <span className="font-display text-xl font-bold neon-text">
              Dashpreet<span className="text-secondary"> Singh</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.id}>
                <Link
                  to={link.id}
                  smooth
                  duration={500}
                  spy={true}
                  activeClass="text-primary after:scale-x-100"
                  className="font-display text-sm hover:cursor-pointer hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100"
                  onClick={() => setActive(link.title)}
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Navigation Button */}
          <div className="md:hidden">
            <button
              className="text-text-primary hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden bg-surface-light"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.id}
                  to={link.id}
                  smooth
                  duration={500}
                  className="block font-display text-base hover:text-primary transition-colors"
                  onClick={() => {
                    setActive(link.title);
                    setMobileMenuOpen(false);
                  }}
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;