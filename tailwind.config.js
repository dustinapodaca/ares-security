/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      'transparent': 'transparent',
      'current': 'currentColor',
      'white': '#ffffff',
      'purple': '#3f3cbb',
      'midnight': '#121063',
      'metal': '#565584',
      'tahiti': '#3ab7bf',
      'silver': '#ecebff',
      'bubble-gum': '#ff77e9',
      'bermuda': '#78dcca',
      'odgreen': '#3d4335',
      'litegreen': '#99a090',
      'black': '#151515',
      'gray': '#6b7280',
      'litegray': '#a0aec0',
      'litegray2': '#cbd5e0',
      'litegray3': '#e2e8f0',
    },
  },
  plugins: [],
}
