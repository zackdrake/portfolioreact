/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config')
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
    ...nextConfig,
    i18n: {
        defaultLocale: 'en',
        locales: ['en', 'fr'],
    },
}
