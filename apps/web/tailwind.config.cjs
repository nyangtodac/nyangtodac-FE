/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  presets: [
    require('@nyangtodac/tailwind-design-tokens'),
    require('@nyangtodac/tailwind-semantic-tokens'),
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [],
};
