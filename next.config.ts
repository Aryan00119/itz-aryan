import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  async redirects() {
    return [
      {
        source: "/color-volor",
        destination: "https://aryan00119.github.io/Color_volor/",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
