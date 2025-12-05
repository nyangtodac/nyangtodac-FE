const js = require('@eslint/js');
const eslintConfigPrettier = require('eslint-config-prettier');
const eslintPluginUnusedImports = require('eslint-plugin-unused-imports');
const eslintPluginPrettier = require('eslint-plugin-prettier');
const typescriptEslint = require('typescript-eslint');

module.exports = [
  js.configs.recommended,
  ...typescriptEslint.configs.recommended,

  {
    plugins: {
      'unused-imports': eslintPluginUnusedImports,
      prettier: eslintPluginPrettier,
    },
    rules: {
      'prettier/prettier': 'error',
      'unused-imports/no-unused-imports': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  },

  eslintConfigPrettier,
];