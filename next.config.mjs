/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: ['tipppz-emp-photos.s3.ap-south-1.amazonaws.com'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  env: {
    NEXT_PUBLIC_RAZORPAY_KEY_ID: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  },
};

export default nextConfig;
