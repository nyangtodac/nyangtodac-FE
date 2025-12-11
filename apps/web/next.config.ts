/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  transpilePackages: [
    '@nyangtodac/ui',
    '@nyangtodac/i18n',
    '@nyangtodac/locales',
    '@nyangtodac/tailwind-design-tokens',
    '@nyangtodac/tailwind-semantic-tokens',
    '@nyangtodac/eslint-config-custom',
  ],

  turbopack: {
    resolveExtensions: [
      '.web.tsx',
      '.web.ts',
      '.web.jsx',
      '.web.js',
      '.tsx',
      '.ts',
      '.jsx',
      '.js',
      '.json',
    ],
  },

  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
