import withPWA from "next-pwa";

const pwaConfig = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
});

const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["res.cloudinary.com", "dummyimage.com"],
  },
};

export default pwaConfig(nextConfig);
