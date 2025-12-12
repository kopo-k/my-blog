import { getAllPosts, getAllCategories } from '@/lib/mdx'
import PostList from '@/components/PostList'
import SearchBar from '@/components/SearchBar'

export default function Home() {
  const posts = getAllPosts()
  const categories = getAllCategories()

  return (
    <div className="min-h-screen bg-gray-50">
      <main id="main-content" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* ヒーローセクション */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            プログラミング学習の記録
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            初学者から中級者向けに、基礎知識・学習ログ・技術記事を発信しています。一緒に成長していきましょう。
          </p>

          {/* 検索バー */}
          <div className="max-w-md mx-auto">
            <SearchBar posts={posts} />
          </div>
        </div>

        {/* 記事一覧（カテゴリフィルター付き） */}
        <PostList posts={posts} categories={categories} />
      </main>
    </div>
  )
}