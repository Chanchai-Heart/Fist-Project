/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "Pacifico": ['Pacifico', 'cursive'],
        "thai": ['Noto Sans Thai', 'sans-serif'],
        "Inter": ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [
    require("daisyui")
  ],
  daisyui: {
    themes: ["cupcake"],
  },
}