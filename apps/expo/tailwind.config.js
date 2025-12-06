const tailwindDesignTokens = require('@nyangtodac/tailwind-design-tokens');
const tailwindSemanticTokens = require('@nyangtodac/tailwind-semantic-tokens');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['app/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [
    require('nativewind/preset'),
    tailwindDesignTokens,
    tailwindSemanticTokens,
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [],
};
