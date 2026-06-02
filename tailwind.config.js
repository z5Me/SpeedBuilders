/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "minecraft-green": "#55FF55",
        "minecraft-blue": "#5555FF",
        "minecraft-red": "#FF5555",
        "minecraft-yellow": "#FFFF55",
        "minecraft-gold": "#FFAA00",
        "minecraft-aqua": "#55FFFF",
        "minecraft-purple": "#AA00AA",
      },
      fontFamily: {
        minecraft: ['"Press Start 2P"', "cursive"],
      },
      animation: {
        float: "float 3s ease-in-out infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "bounce-slow": "bounce 2s infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
    },
  },
  plugins: [],
};
