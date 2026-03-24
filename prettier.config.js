/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  semi: false,
  singleQuote: true,
  importOrder: ['<THIRD_PARTY_MODULES>', '^[@/*]', '^[./]'],
  importOrderSeparation: true,
  cssDeclarationSorterKeepOverrides: true,
  tailwindStylesheet: './app/src/index.css',
  plugins: [
    '@trivago/prettier-plugin-sort-imports',
    'prettier-plugin-css-order',
    'prettier-plugin-tailwindcss',
  ],
}

export default config
