/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  // Enable React strict mode for development
  reactStrictMode: true,
};

module.exports = nextConfig;
