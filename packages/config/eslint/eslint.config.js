import prettier from 'eslint-config-prettier/flat'
// https://www.npmjs.com/package/eslint-plugin-react-refresh
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'

// https://www.eslint-react.xyz/docs/getting-started/typescript
import reactEslint from '@eslint-react/eslint-plugin'
import js from '@eslint/js'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactEslint.configs['recommended-typescript'],
      reactRefresh.configs.vite,
      prettier,
    ],
    languageOptions: {
      globals: { ...globals.es2026, ...globals.browser, ...globals.node },
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: {
          // enable global strict mode (if ecmaVersion is 5 or greater).
          impliedStrict: true,
          // enable JSX.
          jsx: true,
        },
        // https://typescript-eslint.io/blog/project-service/
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
])
