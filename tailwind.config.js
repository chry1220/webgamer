/**
 * @type {import('@types/tailwindcss/tailwind-config').TailwindConfig}
 */

const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./public/**/*.html",
  ],
  plugins: [
    require('flowbite/plugin')
  ],
  theme: {
    fontFamily: {
      'heading': ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "Helvetica", "Arial", "sans-serif", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"]
    },
    screens: {
      'searchbtn': '380px',

      'favbtn': '420px',

      'discordbtn': '286px',

      'logoText': '290px',

      'xsm': '350px',

      'mysm': '540px',

      'mymd': '768px',

      "re-480px": "480px"
      // => @media (min-width: 640px) { ... }
    },
  }
});