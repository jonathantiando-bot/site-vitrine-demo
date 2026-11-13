/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        ivory: {
          50: '#FAF6F0',
          100: '#F3ECE1',
          200: '#E6DDD0',
          300: '#D5C7B4',
        },
        espresso: {
          950: '#120E0C',
          900: '#191411',
          800: '#241C18',
          700: '#332721',
          600: '#4E3B31',
          500: '#6E5647',
        },
        olive: {
          900: '#1E2A1F',
          800: '#2C3E2D',
          700: '#3B523C',
          600: '#4E6B4F',
          400: '#7E9C7D',
          300: '#A3BDA1',
        },
        ochre: {
          700: '#9A5423',
          600: '#B86B35',
          500: '#CC7E45',
          400: '#DDA06D',
          300: '#ECC39B',
        },
      },
      transitionTimingFunction: {
        'editorial': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
