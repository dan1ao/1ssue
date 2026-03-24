import { version as corejsVersion } from 'core-js-pure/package.json'
import postcssPresetEnv from 'postcss-preset-env'
import { defineConfig } from 'vite'

import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'

function containsReactDeps(str: string): boolean {
  return /react|react-dom|@tanstack\/react-router/.test(str)
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({
      presets: [
        reactCompilerPreset(), //https://react.dev/learn/react-compiler/installation
      ],
      plugins: [
        [
          'babel-plugin-polyfill-corejs3',
          {
            method: 'usage-pure',
            version: corejsVersion,
            exclude: ['es.json.stringify', 'es.array.push'],
          },
        ],
      ],
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  build: {
    // target: [],
    rolldownOptions: {
      output: {
        manualChunks: (moduleId) => {
          if (containsReactDeps(moduleId)) {
            return 'react'
          }
          return null
        },
      },
    },
  },
  css: {
    postcss: {
      plugins: [postcssPresetEnv()],
    },
  },
  server: {
    port: 1234,
    open: false,
    proxy: {
      '/abc': {
        target: 'www',
        changeOrigin: true,
      },
    },
  },
})
