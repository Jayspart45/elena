/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        prompt: ["Prompt"],
        beba: ["Bebas Neue"],
      },
      colors: {
        color1: "#6F61C0",
        color2: "#A084E8",
        color3: "#8BE8E5",
        color4: "#D5FFE4",
      }
    },
  },
  plugins: [],
}