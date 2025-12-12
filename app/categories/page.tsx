import Link from 'next/link'
import { getAllCategories, getPostsByCategory } from '@/lib/mdx'

export const metadata = {
  title: 'カテゴリ | DevLog',
  description: 'プログラミング学習記事のカテゴリ一覧',
}

export default function CategoriesPage() {
  const categories = getAllCategories()

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">カテゴリ</h1>
          <p className="text-gray-600">
            記事をカテゴリ別に探索できます
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const posts = getPostsByCategory(category)
            return (
              <Link
                key={category}
                href={`/categories/${encodeURIComponent(category)}`}
                className="block p-6 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {category}
                </h2>
                <p className="text-gray-600">
                  {posts.length} 件の記事
                </p>

                {/* 最新記事のタイトルを表示 */}
                {posts.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-sm text-gray-500 mb-2">最新の記事:</p>
                    <ul className="space-y-1">
                      {posts.slice(0, 3).map((post) => (
                        <li key={post.slug} className="text-sm text-blue-600 truncate">
                          {post.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </Link>
            )
          })}
        </div>
      </main>
    </div>
  )
}