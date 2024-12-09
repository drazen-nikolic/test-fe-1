import js from '@eslint/js'
import prettierConfig from 'eslint-config-prettier'
import prettier from 'eslint-plugin-prettier'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist', 'node_modules'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      prettierConfig // Ensure Prettier disables conflicting ESLint rules
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier // Add Prettier plugin
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'react/prop-types': 'off',
      'no-debugger': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          trailingComma: 'none',
          tabWidth: 2,
          semi: false,
          quoteProps: 'as-needed',
          jsxSingleQuote: true,
          bracketSpacing: true,
          bracketSameLine: false,
          arrowParens: 'avoid',
          parser: 'typescript',
          htmlWhitespaceSensitivity: 'css',
          endOfLine: 'auto',
          singleAttributePerLine: true,
          printWidth: 100
        }
      ] // Enforce Prettier rules as ESLint errors
    }
  }
)
