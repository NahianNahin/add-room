/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  daisyui: {
    themes: [
      {
        tvShopTheme: {
          primary: '#EC2623',
          secondary: "#ED7D07",
          accent: "#ffffff",
          neutral: "#3A4256",
          "base-100": "#ffffff",
        },
      },
    ],
  },
  theme: {
    extend: {},
  },
   plugins: [require("daisyui")],
}