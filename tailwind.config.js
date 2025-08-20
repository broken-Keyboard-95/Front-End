/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode:"class",
  content: [ "./src/**/*.{js,ts,jsx,tsx,mdx}"],

  theme: {
    extend: {
        colors:{
          myBlack:{
            "900":"#111",
            "800":"#222",
            "700":"#333",
          }
        }
    },


    // container
    container: {
      center:true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
  },

  plugins: [],
}

