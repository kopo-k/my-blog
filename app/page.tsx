'use client'

import { useState, useEffect } from 'react'
import { getAllPosts, getAllCategories } from '@/lib/mdx'
import PostCard from '@/components/PostCard'
import SearchBar from '@/components/SearchBar'

export default function Home() {
  const [posts] = useState(getAllPosts())
  const [categories] = useState(getAllCategories())
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [filteredPosts, setFilteredPosts] = useState(posts)

  useEffect(() => {
    if (selectedCategory) {
      setFilteredPosts(posts.filter(post => post.category === selectedCategory))
    } else {
      setFilteredPosts(posts)
    }
  }, [selectedCategory, posts])

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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

        {/* カテゴリータグ */}
        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              !selectedCategory
                ? 'bg-gray-900 text-white'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            すべて
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-gray-900 text-white'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* 記事一覧 */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500">まだ記事がありません。</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
