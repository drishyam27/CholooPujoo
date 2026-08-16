import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.dicebear.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/DDI",
        destination: "/ddi",
        permanent: true,
      },
      {
        source: "/chatbot",
        destination: "/ddi",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
