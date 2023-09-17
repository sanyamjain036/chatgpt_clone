/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'lh3.googleusercontent.com',
            port: '',
            pathname: '/a/**',
          },
          {
            protocol: 'https',
            hostname: 'cfj.org',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'brandlogovector.com',
            port: '',
            pathname: '/**',
          },
        ],
      },
}

module.exports = nextConfig
