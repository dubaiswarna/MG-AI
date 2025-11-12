/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost'],
  },
  env: {
    SERVER_IP: process.env.SERVER_IP || '198.38.83.152',
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
  // Production optimization
  compress: true,
  poweredByHeader: false,
  // API configuration
  async rewrites() {
    return [
      {
        source: '/python-api/:path*',
        destination: 'http://localhost:5000/:path*',
      },
    ]
  },
}

module.exports = nextConfig

