import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist', 'node_modules', 'scripts/**/*.mjs'] },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      // Allow deliberately-unused bindings when prefixed with `_` (e.g. a param
      // kept for API shape, or a destructured key being discarded).
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' },
      ],
    },
  },
  // Build/tooling files run in Node, not the browser.
  {
    files: ['vite.config.ts', 'scripts/**/*.ts'],
    languageOptions: { globals: globals.node },
  },
  // Supabase Edge Functions run on Deno, whose globals ESLint does not know.
  { ignores: ['supabase/functions/**'] },
)
