/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: process?.env?.NEXT_PUBLIC_BASEPATH || '',
  async redirects() {
    return [
      {
        source: '/index',
        destination: '/',
        permanent: true
      },
    ]
  },
  images: {
    // domains: ['pics0.baidu.com','www.hipo.com','ikzttp.mypinata.cloud'],//方便开发 记得删
  },
  env: {
    NEXT_MODE: process.env.NEXT_MODE
  }
  // productionBrowserSourceMaps: true
}

module.exports = nextConfig
