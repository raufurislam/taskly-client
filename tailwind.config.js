/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#E63946",
          secondary: "#FFB703",
          accent: "#22232D",
          neutral: "#252631",
          "base-100": "#1C1D27",
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",
          text1: "#F1F1F1",
          text2: "#AAB8C5",
          text3: "#44444D",
          text4: "#44444D",
        },
      },
    ],
  },
};
