/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}"
  ],
  darkMode: 'selector',
  theme: {
    fontFamily: {
      'robt': ['Roboto', 'sans-serif'],
      'robtMono': ["Roboto Mono", "monospace"],
      'monts': ['Montserrat', 'sans-serif'],      
    },
    screens: {
      'sm': '576px',
      'md': '960px',
      'lg': '1440px',
    },
    extend: {},
  },
  plugins: [
    // require('@tailwindcss/typography'),
  ],
}

