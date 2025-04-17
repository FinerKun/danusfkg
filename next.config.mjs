/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vowfzpppaqiwhccsacdu.supabase.co",
        port: "",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
