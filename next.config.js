/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'localhost',
        port: '15951',
        pathname: '/media/**',
      },
      {
        protocol: 'https',
        hostname: 'staging.api.wntr.gdn',
        port: '',
        pathname: '/media/**',
      },
      {
        protocol: 'https',
        hostname: 'api.wntr.gdn',
        port: '',
        pathname: '/media/**',
      },
    ],
  }
}

module.exports = nextConfig