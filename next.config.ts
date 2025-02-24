import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allows all hostnames (use with caution)
        port: "",
        pathname: "/**", // Allows any pathname
      },
      {
        protocol: "http", // Optionally allow HTTP for local development or specific cases
        hostname: "**",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
