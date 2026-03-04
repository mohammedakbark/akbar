/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ["@react-three/fiber", "@react-three/drei"],
  },
  // Enable React strict mode for development
  reactStrictMode: true,
};

module.exports = nextConfig;
