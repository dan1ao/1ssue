import { defineConfig } from 'vite'

export const appConfig = defineConfig({
  build: {
    emptyOutDir: true,
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
})
