/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        // pathname: "/account123/**",
      },
      {
        protocol: "https",
        hostname: "assets.aceternity.com",
        port: "",
        // pathname: "/account123/**",
      },
    ],
  },
};

export default nextConfig;
