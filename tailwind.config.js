/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#FAF7F2',
        cream: '#F4ECE1',
        sand: '#EAE0D0',
        champagne: '#DFB771',
        gold: {
          light: '#ECC98C',
          DEFAULT: '#C5A880',
          dark: '#96784D',
          rich: '#B38B3F'
        },
        noir: '#0E0C0A',
        ink: '#141210',
        charcoal: '#211D1A',
        card: '#181614',
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #ECC98C 0%, #C5A880 50%, #96784D 100%)',
        'gold-shimmer': 'linear-gradient(90deg, transparent, rgba(223, 183, 113, 0.2), transparent)',
        'dark-gradient': 'linear-gradient(180deg, #141210 0%, #0E0C0A 100%)',
        'luxury-radial': 'radial-gradient(circle at 50% 0%, rgba(197, 168, 128, 0.15), transparent 70%)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      }
    },
  },
  plugins: [],
}
