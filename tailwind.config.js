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
      screens: {
        mp: { min: "360px", max: "768px" }, // Mobile portrait custom
        md: { min: "768px", max: "1023px" }, // Tablet custom
        ls: { min:"1024px"}
      },
    },
  },
  variants: {},
  plugins: [],
};
