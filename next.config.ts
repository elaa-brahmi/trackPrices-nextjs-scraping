import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   experimental: {
    serverActions: {}
  },
  serverExternalPackages: ['mongoose'],
  //serverExternalPackages is the current valid config for external packages in server components.
  images: {
    domains: ['m.media-amazon.com']
  }
};

export default nextConfig;
