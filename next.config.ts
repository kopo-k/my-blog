import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images: {
    formats: ['image/avif', 'image/webp'],
    // 外部画像を使用する場合のドメイン設定
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      // 必要に応じて他のドメインを追加
    ],
  },
};

export default nextConfig;
