/** @type {import("next").NextConfig} */
module.exports = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: process.env.GITHUB_ACTIONS ? "/edu_system" : undefined,
  assetPrefix: process.env.GITHUB_ACTIONS ? "/edu_system/" : undefined,
};
