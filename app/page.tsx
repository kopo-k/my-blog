import { getAllPosts, getAllCategories, getAllTags } from '@/lib/mdx'
import FilterablePostList from '@/components/FilterablePostList'

export default function Home() {
  const posts = getAllPosts()
  const categories = getAllCategories()
  const tags = getAllTags()

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
        </div>

        {/* フィルタリング可能な記事一覧 */}
        <FilterablePostList posts={posts} categories={categories} tags={tags} />
      </main>
    </div>
  )
}