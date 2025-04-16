// tailwind.config.js
module.exports = {
    theme: {
      extend: {
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
  };
  