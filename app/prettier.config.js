import prettierConfig from '@1ssue/prettier-config'

/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  ...prettierConfig,
  tailwindStylesheet: './src/index.css',
}

export default config
