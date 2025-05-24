/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0F0B1A',
        surface: '#1A1625',
        'surface-light': '#2A2635',
        primary: '#B026FF',
        secondary: '#00FFFF',
        accent: '#FF00FF',
        success: '#00FF9F',
        warning: '#FFD600',
        error: '#FF3D71',
        'text-primary': '#FFFFFF',
        'text-secondary': '#B9B9C3',
        'text-tertiary': '#6B6B7B',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif']
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'text-shimmer': 'text-shimmer 2.5s ease-out infinite alternate',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 10px 2px rgba(176, 38, 255, 0.3), 0 0 20px 6px rgba(176, 38, 255, 0.2)' 
          },
          '50%': { 
            boxShadow: '0 0 15px 5px rgba(176, 38, 255, 0.5), 0 0 25px 10px rgba(176, 38, 255, 0.3)' 
          },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'text-shimmer': {
          '0%': {
            backgroundPosition: '0% 50%',
            opacity: 0.8,
          },
          '100%': {
            backgroundPosition: '100% 50%',
            opacity: 1,
          },
        },
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
        'glow-primary': 'radial-gradient(circle at center, rgba(176, 38, 255, 0.3) 0%, transparent 70%)',
        'glow-secondary': 'radial-gradient(circle at center, rgba(0, 255, 255, 0.3) 0%, transparent 70%)',
        'neon-gradient': 'linear-gradient(90deg, #B026FF, #00FFFF, #FF00FF)',
      },
      backgroundSize: {
        'grid-lg': '50px 50px',
        'grid-sm': '20px 20px',
      },
    },
  },
  plugins: [],
};