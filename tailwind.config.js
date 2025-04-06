/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      extend: {
        animation: {
          'fade-up': 'fadeUp 0.5s ease-out',
          'fade-up-delay': 'fadeUp 0.5s ease-out 0.3s forwards',
          'slide-up-delay-1': 'slideUp 0.5s ease-out 0.2s both',
          'slide-up-delay-2': 'slideUp 0.5s ease-out 0.4s both',
          'slide-up-delay-3': 'slideUp 0.5s ease-out 0.6s both',  
          'slide-up-delay-4': 'slideUp 0.5s ease-out 0.8s both',
          'slide-up': 'slideUp 0.2s ease-out',
          'slide-left': 'slideLeft 0.2s ease-out',  
          'slide-right': 'slideRight 0.2s ease-out',
          'slide-down': 'slideDown 0.2s ease-out',
        },
        keyframes: {
          fadeUp: {
            '0%': { 
              opacity: '0',
              
            },
            '100%': { 
              opacity: '1',
              
            },
          },
          slideUp: {
            '0%': { 
              opacity: '0',
              transform: 'translateY(20px)'
            },
            '100%': { 
              opacity: '1',
              transform: 'translateY(0)'
            },
          },
          slideLeft: {
            '0%': { 
              opacity: '0',
              transform: 'translateX(-20px)'
            },
            '100%': { 
              opacity: '1',
              transform: 'translateX(0)'
            },
          },
          slideRight: {
            '0%': { 
              opacity: '0',
              transform: 'translateX(20px)'
            },
            '100%': { 
              opacity: '1',
              transform: 'translateX(0)'
            },
          },
          slideDown: {
            '0%': { 
              opacity: '0',
              transform: 'translateY(-20px)'
            },
            '100%': { 
              opacity: '1',
              transform: 'translateY(0)'
            },
          } 
        }
      },
    },
    plugins: [],
  }