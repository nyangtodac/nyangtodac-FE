const plugin = require('tailwindcss/plugin');
const colors = require('@nyangtodac/tailwind-design-tokens/colors');

// NOTE: Cache must be cleared if any color token values are modified
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      backgroundColor: {
        page: 'var(--bg-page)',
        primary: 'var(--bg-primary)',
        destructive: 'var(--bg-destructive)',
        success: 'var(--bg-success)',
      },
      textColor: {
        body: 'var(--text-body)',
        sub: 'var(--text-sub)',
        destructive: 'var(--text-destructive)',
        success: 'var(--text-success)',
      },
      borderColor: {
        primary: 'var(--border-primary)',
        destructive: 'var(--border-destructive)',
      },
    },
  },
  plugins: [
    plugin(({ addBase }) => {
      addBase({
        ':root': {
          // Background colors - Light mode
          '--bg-page': colors.neutral[100],
          '--bg-primary': colors.primary[500],
          '--bg-destructive': colors.danger[500],
          '--bg-success': colors.success[500],
          
          // Text colors - Light mode
          '--text-body': colors.neutral[800],
          '--text-sub': colors.neutral[600],
          '--text-destructive': colors.danger[500],
          '--text-success': colors.success[500],
          
          // Border colors - Light mode
          '--border-primary': colors.charcoal[300],
          '--border-destructive': colors.danger[500],
        },
        '.dark': {
          // Background colors - Dark mode
          '--bg-page': colors.neutral[900],
          '--bg-primary': colors.primary[900],
          '--bg-destructive': colors.danger[900],
          '--bg-success': colors.success[900],
          
          // Text colors - Dark mode
          '--text-body': colors.neutral[200],
          '--text-sub': colors.neutral[400],
          '--text-destructive': colors.danger[400],
          '--text-success': colors.success[400],
          
          // Border colors - Dark mode
          '--border-primary': colors.charcoal[700],
          '--border-destructive': colors.danger[400],
        },
      });
    }),
  ],
};
