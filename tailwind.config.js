/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        rotateIn: {
          '0%': {
            opacity: '0',
            transform: 'rotate(-200deg)',
          },
          '100%': {
            opacity: '1',
            transform: 'rotate(0deg)',
          },
        },
        bounceInLeft: {
          '0%': {
            opacity: '0',
            transform: 'translateX(-3000px)',
          },
          '60%': {
            opacity: '1',
            transform: 'translateX(25px)',
          },
          '80%': {
            transform: 'translateX(-10px)',
          },
          '100%': {
            transform: 'translateX(0)',
          },
        },
        slideInUp: {
          '0%': {
            transform: 'translateY(100%)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1',
          },
        },
        borderSpin: {
          '0%': {
            'border-image-source': 'conic-gradient(from 0deg, #37745B, #8B9D77, #37745B)',
          },
          '100%': {
            'border-image-source': 'conic-gradient(from 360deg, #37745B, #8B9D77, #37745B)',
          },
        },
      },
      animation: {
        rotateIn: 'rotateIn 1s ease-out',
        bounceInLeft: 'bounceInLeft 1s ease-out',
        slideInUp: 'slideInUp 1s ease-out',
        borderSpin: 'borderSpin 3s linear infinite',
      },
    },
  },
  plugins: [],
}
