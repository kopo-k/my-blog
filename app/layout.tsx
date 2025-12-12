import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

// フォントの設定
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// メタデータの設定
export const metadata: Metadata = {
  title: "kopo-k's DevLog - プログラミング学習の記録",
  description: "プログラミング初学者〜中級者向けに、基礎知識・学習ログ・技術記事を体系的に発信する個人ブログ",
  keywords: ["プログラミング", "Web開発", "Next.js", "React", "TypeScript"],
  authors: [{ name: "kopo-k" }],
  openGraph: {
    title: "kopo-k's DevLog - プログラミング学習の記録",
    description: "プログラミング初学者〜中級者向けに、基礎知識・学習ログ・技術記事を体系的に発信する個人ブログ",
    type: "website",
    locale: "ja_JP",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
