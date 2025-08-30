import type { NextConfig } from "next";

const repo = "edu_system";
const isGH = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  output: "export",              // genera HTML estático (para Pages)
  images: { unoptimized: true }, // si usas next/image
  basePath: isGH ? `/${repo}` : undefined,
  assetPrefix: isGH ? `/${repo}/` : undefined,
};

export default nextConfig;
