/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: '#050505',
        electric: '#0047FF',
      },
      fontFamily: {
        human: ['Playfair Display', 'serif'],
        machine: ['Space Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
