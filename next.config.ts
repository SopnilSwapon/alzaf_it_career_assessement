import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "alzaf-frontend-2025.vercel.app",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
