import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        orange: "#800080",
      },
    },
  },
  plugins: [],
} satisfies Config;
