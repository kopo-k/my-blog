'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import PostCard from '@/components/PostCard'
import { Post } from '@/lib/mdx'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [posts, setPosts] = useState<Post[]>([])
  const [results, setResults] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // クライアントサイドで記事データを取得
  useEffect(() => {
    fetch('/api/posts')
      .then((res) => res.json())
      .then((data) => {
        setPosts(data)
        setIsLoading(false)
      })
      .catch(() => setIsLoading(false))
  }, [])

  // 検索処理
  useEffect(() => {
    if (!query || posts.length === 0) {
      setResults([])
      return
    }

    const searchQuery = query.toLowerCase()
    const filtered = posts.filter((post) => {
      return (
        post.title.toLowerCase().includes(searchQuery) ||
        post.description.toLowerCase().includes(searchQuery) ||
        post.content.toLowerCase().includes(searchQuery) ||
        post.category.toLowerCase().includes(searchQuery) ||
        post.tags?.some((tag) => tag.toLowerCase().includes(searchQuery))
      )
    })

    setResults(filtered)
  }, [query, posts])

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">検索結果</h1>
          {query && (
            <p className="text-gray-600">
              「{query}」の検索結果: {results.length} 件
            </p>
          )}
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">読み込み中...</p>
          </div>
        ) : query ? (
          results.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {results.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">
                「{query}」に一致する記事が見つかりませんでした。
              </p>
              <p className="text-gray-400 mt-2">
                他のキーワードで検索してみてください。
              </p>
            </div>
          )
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">
              検索キーワードを入力してください。
            </p>
          </div>
        )}
      </main>
    </div>
  )
}