/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './Layout/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  daisyui: {
    themes: [
      {
        light: {
        
"primary": "#641ae6",
        
"secondary": "#d9534f",
        
"accent": "#333",
        
"neutral": "#3273dc",
        
"base-100": "#dcdee3",

"base-200": "#f4f4f4",
        
"info": "#0000ff",
        
"success": "#36d399",
        
"warning": "#ff3860",
        
"error": "#ff2f2f",
        },
      },
    ],
  },
  plugins: [require("daisyui")],

}
