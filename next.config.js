/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/socket.io',
        destination: 'https://www.spinach.keyan.dev' // Proxy to Backend
      }
    ]
  }
}

module.exports = nextConfig
