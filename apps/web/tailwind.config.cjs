/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  presets: [
    require('@nyangtodac/tailwind-design-tokens'),
    require('@nyangtodac/tailwind-semantic-tokens'),
  ],
  safelist: ['dark'],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [],
};
