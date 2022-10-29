/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        container: {
            center: true,
            padding: {
                DEFAULT: '0',
                sm: '0',
                lg: '0',
                xl: '9rem',
                '2xl': '12rem'
            }
        },
    },
    plugins: [require("daisyui")],
  }