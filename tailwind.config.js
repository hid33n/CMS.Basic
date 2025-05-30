/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // importante: asegura que sea 'class' y no 'media'
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
