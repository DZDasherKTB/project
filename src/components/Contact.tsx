import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FadeInSection from './ui/FadeInSection';
import { socials } from '../constants';
import { Github, Instagram, Linkedin, Mail, Terminal, Twitter } from 'lucide-react';
import { supabase } from '../lib/supabase';

const iconMap: Record<string, React.ReactNode> = {
  Linkedin: <Linkedin className="h-6 w-6" />,
  Github: <Github className="h-6 w-6" />,
  Twitter: <Twitter className="h-6 w-6" />,
  Instagram: <Instagram className="h-6 w-6" />,
  Mail: <Mail className="h-6 w-6" />,
};

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    message: '',
    honeypot: '', // Honeypot field for spam protection
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (formData.honeypot) {
      setError('Invalid submission');
      return;
    }
  
    setLoading(true);
    setError(null);
  
    try {
      // 🔐 Check login
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        const { error: signInError } = await supabase.auth.signInWithOAuth({
          provider: 'google',
        });
        if (signInError) throw signInError;
  
        setError("Please log in with Google to continue.");
        setLoading(false);
        return;
      }
  
      const user = session.user;
  
      // ✅ Save to Supabase
      const { error: dbError } = await supabase.from('messages').insert([
        {
          name: formData.name,
          message: formData.message,
          email: user.email, // optionally log sender email
        }
      ]);
      if (dbError) throw dbError;
  
      // 📧 Trigger Edge Function to send email
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-contact-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`, // 🧠 secure email trigger
        },
        body: JSON.stringify({
          name: formData.name,
          message: formData.message,
          email: user.email,
        }),
      });
  
      if (!response.ok) throw new Error('Failed to send email notification');
  
      setSubmitted(true);
      setFormData({ name: '', message: '', honeypot: '' });
    } catch (err) {
      console.error('Error:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <section id="contact" className="section-container">
      <FadeInSection>
        <h2 className="section-title neon-text">Contact Me</h2>
      </FadeInSection>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
        <FadeInSection direction="right">
          <div className="h-full flex flex-col">
            <h3 className="text-2xl font-display font-bold mb-6">Let's create something amazing together</h3>
            <p className="text-text-secondary mb-8">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="bg-primary/20 p-2 rounded-lg text-primary">
                  <Mail className="h-5 w-5" />
                </div>
                <a href="mailto:dashpreetsinghhanda@gmail.com" className="text-text-secondary hover:text-primary transition-colors">
                  dashpreetsinghhanda@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-primary/20 p-2 rounded-lg text-primary">
                  <Terminal className="h-5 w-5" />
                </div>
                <span className="text-text-secondary">
                  Based in Jammu, Jammu and Kashmir, India
                </span>
              </div>
            </div>
            
            <h4 className="text-xl font-display font-bold mb-4">Connect with me</h4>
            <div className="flex gap-4 flex-wrap">
              {socials.map((social) => (
                <motion.a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-surface p-3 rounded-full text-text-secondary hover:text-primary hover:bg-primary/20 transition-all"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {iconMap[social.icon]}
                </motion.a>
              ))}
            </div>
          </div>
        </FadeInSection>
        
        <FadeInSection direction="left">
          <div className="bg-surface rounded-lg p-6 border-l-4 border-primary shadow-[0_4px_20px_rgba(176,38,255,0.2)]">
            <h3 className="text-2xl font-display font-bold mb-6">Send me a message</h3>
            
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 mx-auto bg-success/20 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-success" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="text-xl font-display font-bold mb-2">Thank you!</h4>
                <p className="text-text-secondary">Your message has been sent successfully. I'll get back to you soon!</p>
                <button 
                  className="cyberpunk-button mt-6"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', message: '', honeypot: '' });
                  }}
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-surface-light rounded-lg px-4 py-3 text-text-primary border border-surface-light focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                  />
                </div>
                
                {/* Honeypot field */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleChange}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  aria-hidden="true"
                />
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-text-secondary mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full bg-surface-light rounded-lg px-4 py-3 text-text-primary border border-surface-light focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                  />
                </div>
                
                {error && (
                  <div className="mb-4 p-3 bg-error/20 border border-error/50 rounded-lg text-error text-sm">
                    {error}
                  </div>
                )}
                
                <button
                  type="submit"
                  disabled={loading}
                  className="cyberpunk-button w-full relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10">{loading ? 'Sending...' : 'Send Message'}</span>
                  <span className="absolute inset-0 bg-neon-gradient bg-[length:200%_auto] group-hover:animate-text-shimmer opacity-0 group-hover:opacity-30 transition-opacity" />
                </button>
              </form>
            )}
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

export default Contact;