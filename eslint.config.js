import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';

export default tseslint.config(
  { ignores: ['dist', 'coverage', 'node_modules'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier: prettier,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'no-unused-vars': 'off', // Disable base ESLint rule
      '@typescript-eslint/no-unused-vars': [
        'warn', // Warn for unused variables
        {
          argsIgnorePattern: '^_', // Ignore args starting with _
          varsIgnorePattern: '^_', // Ignore vars starting with _
          caughtErrorsIgnorePattern: '^_', // Ignore caught errors starting with _
        },
      ],
      'no-console': ['warn', { allow: ['warn', 'error'] }], // Warn on console.log
      'prettier/prettier': [
        'error',
        {
          trailingComma: 'es5',
          useTabs: false,
          endOfLine: 'lf',
          semi: true,
          tabWidth: 2,
          printWidth: 140,
          arrowParens: 'avoid',
          singleQuote: true,
        },
      ],
    },
  },
  // Configuración específica para tests
  {
    files: ['tests/**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-var-requires': 'off', // Permitir requires en tests
    },
  }
);
