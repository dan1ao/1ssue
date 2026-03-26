import { defineConfig } from 'vite'
import dtsPlugin from 'vite-plugin-dts'

export const libraryConfig = defineConfig({
  plugins: [
    dtsPlugin({
      insertTypesEntry: true,
      outDir: 'dist/types',
      include: ['src/**/*.{vue,ts,tsx}'],
    }),
  ],
  build: {
    lib: {
      entry: 'src/index.ts',
      fileName: 'index',
      formats: ['es'],
    },
    emptyOutDir: true,
  },
})
