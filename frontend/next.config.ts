// next.config.ts
import type { NextConfig } from 'next';
import dotenv from 'dotenv';

dotenv.config();

const backendUrl = process.env.BACKEND_URL;

if (!backendUrl) {
  throw new Error('❌ BACKEND_URL is not defined in .env.local');
}
const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/run',
        destination: `${backendUrl}/run`,
      },
      {
        source: '/run/history',
        destination: `${backendUrl}/run/history`,
      },
    ];
  },
};

export default nextConfig;
