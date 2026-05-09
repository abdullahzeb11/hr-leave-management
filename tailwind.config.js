/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        arabic: ['"Noto Sans Arabic"', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50:  '#eef4ff',
          100: '#dae6ff',
          200: '#bcd1ff',
          300: '#8eb1ff',
          400: '#5a87ff',
          500: '#3563f5',
          600: '#1f47db',
          700: '#1b39b0',
          800: '#1c338c',
          900: '#1c2f6f',
        },
      },
      boxShadow: {
        soft: '0 1px 2px rgba(16,24,40,.04), 0 1px 3px rgba(16,24,40,.06)',
        card: '0 4px 16px rgba(16,24,40,.06)',
      },
    },
  },
  plugins: [],
};
