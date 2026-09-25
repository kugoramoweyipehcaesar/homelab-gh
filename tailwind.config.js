/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0D6EFD',
        teal: '#0E9F9A',
        dark: '#0A1931',
      }
    },
  },
  plugins: [],
}