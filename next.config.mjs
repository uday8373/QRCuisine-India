import withPWA from "next-pwa";
import runtimeCaching from "next-pwa/cache.js";

const pwaConfig = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  runtimeCaching,
  reloadOnOnline: true,
});

const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["res.cloudinary.com", "dummyimage.com"],
  },
};

export default pwaConfig(nextConfig);
