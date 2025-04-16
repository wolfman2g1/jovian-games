/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "localhost",
      `${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com`,
      process.env.CDN_DOMAIN || "localhost", // Dynamically load from env
    ],
    unoptimized: process.env.NODE_ENV !== "production", // For development
  },
}

module.exports = nextConfig
