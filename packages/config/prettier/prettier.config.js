/** @type {import('prettier').Config} */
const config = {
  semi: false,
  singleQuote: true,
  importOrder: ['<THIRD_PARTY_MODULES>', '^[@/*]', '^[./]'],
  cssDeclarationSorterKeepOverrides: true,
  plugins: [
    '@trivago/prettier-plugin-sort-imports',
    'prettier-plugin-css-order',
    'prettier-plugin-tailwindcss',
  ],
}

export default config
