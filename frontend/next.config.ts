import type { NextConfig } from "next";

const assetPrefix = process.env.NEXT_PUBLIC_ASSET_PREFIX || undefined;

const nextConfig: NextConfig = {
  assetPrefix,
};

export default nextConfig;
