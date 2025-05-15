// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      screens: {
        'mp': { min: '360px', max: '768px' },
        'md': '1024px',
        'lg': '1280px',
        'xxxl': '1920px',
        '2xl': '2140px',
      },
      animation: {
        'pulse-glow': 'pulseGlow 1.5s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: 0.2, transform: 'scale(1)' },
          '50%': { opacity: 0.7, transform: 'scale(1.4)' },
        },
      },
      
     
    },
  },
  variants: {},
  plugins: [],
};
