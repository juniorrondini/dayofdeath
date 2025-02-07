/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        lightning: 'lightning 10s infinite',
      },
    },
  },
  plugins: [],
};