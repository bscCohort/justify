import type { NextConfig } from "next";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "..", ".env") });

const assetPrefix = process.env.NEXT_PUBLIC_ASSET_PREFIX || undefined;

const nextConfig: NextConfig = {
  assetPrefix,
};

export default nextConfig;
