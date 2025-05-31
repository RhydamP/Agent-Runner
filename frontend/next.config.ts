// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/run',
        destination: 'http://localhost:4000/run',
      },
    ];
  },
};

export default nextConfig;
