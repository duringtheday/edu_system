/** @type {import("next").NextConfig} */
module.exports = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },

  // GitHub Pages (repo name)
  basePath: process.env.GITHUB_ACTIONS ? "/edu_system" : undefined,
  assetPrefix: process.env.GITHUB_ACTIONS ? "/edu_system/" : undefined,

  // Do not block export while we iterate
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true }
};
