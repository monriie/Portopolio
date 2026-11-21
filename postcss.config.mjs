// Menghubungkan Tailwind CSS ke pemrosesan stylesheet melalui PostCSS.
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}

export default config
