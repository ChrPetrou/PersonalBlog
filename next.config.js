/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(jpe?g|png|svg|gif|ico|eot|ttf|woff|woff2|mp4|pdf|webm|txt|xml)$/,
      type: "asset/resource",
      generator: {
        filename: "static/chunks/[path][name].[hash][ext]",
      },
    });

    return config;
  },
  env: {
    NEXT_ENVIRONMENT_URL: process.env.NEXT_ENVIRONMENT_URL,
    NEXT_BLOG_SANITY_DATASET: process.env.NEXT_BLOG_SANITY_DATASET,
    NEXT_BLOG_SANITY_PROJECT_ID: process.env.NEXT_BLOG_SANITY_PROJECT_ID,
  },
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|png)",
        locale: false,
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=63072000, must-revalidate",
          },
        ],
      },
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization, x-api-key",
          },
        ],
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    domains: [
      "storage.googleapis.com",
      "cdn.sanity.io",
      "via.placeholder.com",
      "i.ytimg.com",
    ],
    dangerouslyAllowSVG: true,
  },
  devIndicators: {
    buildActivity: true,
  },
  compiler: {
    styledComponents: true,
  },
  reactStrictMode: false,
  swcMinify: true,
};

module.exports = nextConfig;
