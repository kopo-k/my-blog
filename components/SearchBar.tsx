'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Post } from '@/lib/mdx'

interface SearchBarProps {
  posts: Post[]
}

export default function SearchBar({ posts }: SearchBarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Post[]>([])
  const searchRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // 検索処理
  useEffect(() => {
    if (query.length === 0) {
      setResults([])
      return
    }

    const searchResults = posts.filter((post) => {
      const searchString = query.toLowerCase()
      return (
        post.title.toLowerCase().includes(searchString) ||
        post.description.toLowerCase().includes(searchString) ||
        post.content.toLowerCase().includes(searchString) ||
        post.category.toLowerCase().includes(searchString) ||
        post.tags?.some((tag) => tag.toLowerCase().includes(searchString))
      )
    }).slice(0, 5)

    setResults(searchResults)
  }, [query, posts])

  // クリックアウトサイドで閉じる
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`)
      setIsOpen(false)
      setQuery('')
    }
  }

  return (
    <div ref={searchRef} className="relative">
      <form onSubmit={handleSearch}>
        <div className="relative">
          <input
            type="text"
            placeholder="記事を検索..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setIsOpen(true)
            }}
            onFocus={() => setIsOpen(true)}
            className="w-full px-4 py-2 pr-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-gray-600"
            aria-label="検索"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </form>

      {/* 検索結果ドロップダウン */}
      {isOpen && query && results.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
          <div className="py-2">
            {results.map((post) => (
              <button
                key={post.slug}
                onClick={() => {
                  router.push(`/posts/${post.slug}`)
                  setIsOpen(false)
                  setQuery('')
                }}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
              >
                <div className="text-sm font-medium text-gray-900">
                  {post.title}
                </div>
                <div className="text-xs text-gray-500 mt-1 line-clamp-1">
                  {post.description}
                </div>
                <div className="flex gap-2 mt-1">
                  <span className="text-xs text-blue-600">
                    {post.category}
                  </span>
                  {post.tags?.slice(0, 2).map((tag) => (
                    <span key={tag} className="text-xs text-gray-400">
                      #{tag}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>
          <div className="border-t border-gray-200 px-4 py-2">
            <button
              onClick={handleSearch}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              すべての結果を見る →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}