/** @type {import('tailwindcss').Config} */
import  DefaultTheme from 'tailwindcss/defaultTheme'
export default {
  content: [ 
    "./src/**/*.{js,ts,jsx,tsx,mdx}", 
  ],
  theme: {
    screens: {
      'xs': '555px',
      ...DefaultTheme.screens,
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};