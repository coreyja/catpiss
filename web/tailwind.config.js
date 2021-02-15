module.exports = {
  purge: [
     './public/**/*.svg',
     './public/**/*.html',
     './src/**/*.html',
     './src/**/*.tsx',
   ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      'cool': ['Truculenta', 'serif'],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
