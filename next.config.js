/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/cve-count',
        destination: 'http://128.2.99.223/cve-count',
      },
      {
        source: '/api/vulnerability-count',
        destination: 'http://128.2.99.223/vulnerability-count',
      },
      {
        source: '/api/server-count',
        destination: 'http://128.2.99.223/server-count',
      },
      {
        source: '/api/status',
        destination: 'http://128.2.99.223/status',
      },
    ];
  },
};

module.exports = nextConfig;
