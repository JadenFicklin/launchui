/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindFunctions: ['cn', 'clsx', 'twMerge', 'twJoin'],
  trailingComma: 'all',
  tabWidth: 2,
  useTabs: false,
  semi: false,
  singleQuote: true,
  jsxSingleQuote: true,
}

export default config
