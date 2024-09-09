/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  reactStrictMode: false,
  images: {
    domains: ["res.cloudinary.com", "dummyimage.com"],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://qrcuisine.com/api/:path*",
      },
    ];
  },
};

export default nextConfig;
