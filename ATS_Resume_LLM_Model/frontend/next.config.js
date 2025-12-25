/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async rewrites() {
        return [
            {
                source: '/api/ml/:path*',
                destination: 'http://localhost:8000/api/:path*'
            },
            {
                source: '/api/backend/:path*',
                destination: 'http://localhost:3001/api/:path*'
            }
        ]
    }
}

module.exports = nextConfig
