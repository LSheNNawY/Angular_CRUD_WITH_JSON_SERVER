module.exports = {
  purge: ['./src/**/*.html', './src/**/*.ts'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')
    , require('@tailwindcss/typography')
  ],
};
