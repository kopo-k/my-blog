import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-gray-300 py-4 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/">kopo-k’s Dev Blog</Link>
        <nav>
          <Link href="/">ホーム</Link>
          <Link href="/categories">カテゴリ</Link>
          <Link href="/about">About</Link>
        </nav>
      </div>
    </header>
  );
}