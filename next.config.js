const path = require("path");

const withImages = require("next-images");

const withTM = require("next-transpile-modules")(["antd-mobile"]);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    domains: ["cn.bing.com"],
  },
};

module.exports = withTM(withImages(nextConfig));
