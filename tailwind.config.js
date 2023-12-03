/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'nunito': [ 'Nunito', 'sans-serif' ],
        'sans': [ 'Open Sans', 'sans-serif' ],
        'pops': [ 'Poppins', 'sans-serif' ]
      }, 
      colors: {
        'primary': '#5F35F5',
        'secondary': '#808080',
        'tertiary': '#03014C',
      }, 
      spacing: {
        '1/10': '10%',
        '2/10': '20%',
        '8/10': '80%',
        '9/10': '90%',
        '1/12': '8.33%',
        '11/12': '91.67%',
      }
    },
  },
  plugins: [],
}