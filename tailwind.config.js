/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        flash: "flash 1s linear infinite",
      },
      keyframes: {
        flash: {
          "0%": { color: "#FF0000" },  // Red
          "25%": { color: "#00FF00" },  // Green
          "50%": { color: "#0000FF" },  // Blue
          "75%": { color: "#FFFF00" },  // Yellow
          "100%": { color: "#FF0000" }, // Back to Red
        },
      },
    },
  },
  plugins: [],
};
