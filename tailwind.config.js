/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      'bone': '#ECEBEB',
      'sky': '#ADFDF6',
      'white': '#FFFFFF',
      'midnight': '#0C0D11',
      'metal': '#1E1E1E',
      'grass': '#238636',
      'blood': "#FF0000",
      'night': '#171A25'
    },
    extend: {},
  },
  plugins: [],
}

