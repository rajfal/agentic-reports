/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'sparkle': 'sparkle 1.5s ease-in-out',
        'glow': 'glow 1.5s ease-in-out',
      },
      keyframes: {
        sparkle: {
          '0%': { transform: 'scale(0.95)', opacity: 0 },
          '25%': { transform: 'scale(1.1)', opacity: 0.9 },
          '50%': { transform: 'scale(1.05)', opacity: 0.5 },
          '75%': { transform: 'scale(1.08)', opacity: 0.8 },
          '100%': { transform: 'scale(1)', opacity: 0 },
        },
        glow: {
          '0%': { 
            'box-shadow': '0 0 0px rgba(96, 165, 250, 0)',
            'border-color': 'rgba(96, 165, 250, 0)'
          },
          '50%': { 
            'box-shadow': '0 0 30px rgba(96, 165, 250, 0.6), 0 0 60px rgba(167, 139, 250, 0.4)',
            'border-color': 'rgba(96, 165, 250, 1)'
          },
          '100%': { 
            'box-shadow': '0 0 0px rgba(96, 165, 250, 0)',
            'border-color': 'rgba(96, 165, 250, 0)'
          },
        },
      },
    },
  },
  plugins: [],
};