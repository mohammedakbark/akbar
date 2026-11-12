/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ["framer-motion", "three"],
  },
  // Enable React strict mode for development
  reactStrictMode: true,
};

module.exports = nextConfig;
