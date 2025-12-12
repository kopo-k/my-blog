'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import type { Post } from '@/types/post'

interface AdvancedSearchFilterProps {
  posts: Post[]
  categories: string[]
  allTags: string[]
  onFilter: (filteredPosts: Post[]) => void
}

export default function AdvancedSearchFilter({
  posts,
  categories,
  allTags,
  onFilter
}: AdvancedSearchFilterProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [isTagDropdownOpen, setIsTagDropdownOpen] = useState(false)
  const [tagSearchQuery, setTagSearchQuery] = useState('')
  const [showResults, setShowResults] = useState(false)
  const [searchResults, setSearchResults] = useState<Post[]>([])
  const searchRef = useRef<HTMLDivElement>(null)
  const tagDropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // タグのフィルタリング
  const filteredTags = allTags.filter(tag =>
    tag.toLowerCase().includes(tagSearchQuery.toLowerCase())
  )

  // フィルター処理
  useEffect(() => {
    let filtered = [...posts]

    // テキスト検索
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.description.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query)
      )
    }

    // カテゴリフィルター
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(post =>
        selectedCategories.includes(post.category)
      )
    }

    // タグフィルター
    if (selectedTags.length > 0) {
      filtered = filtered.filter(post =>
        post.tags?.some(tag => selectedTags.includes(tag))
      )
    }

    setSearchResults(filtered.slice(0, 5))
    onFilter(filtered)
  }, [searchQuery, selectedCategories, selectedTags, posts, onFilter])

  // クリックアウトサイドで閉じる
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false)
      }
      if (tagDropdownRef.current && !tagDropdownRef.current.contains(event.target as Node)) {
        setIsTagDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  const clearAllFilters = () => {
    setSearchQuery('')
    setSelectedCategories([])
    setSelectedTags([])
    setTagSearchQuery('')
  }

  const hasActiveFilters = searchQuery || selectedCategories.length > 0 || selectedTags.length > 0

  return (
    <div className="space-y-4 mb-8">
      {/* 検索バー */}
      <div ref={searchRef} className="relative">
        <input
          type="text"
          placeholder="記事を検索..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value)
            setShowResults(true)
          }}
          onFocus={() => setShowResults(true)}
          className="w-full px-4 py-3 pr-12 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
        />
        <svg
          className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
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

        {/* リアルタイム検索結果 */}
        {showResults && searchQuery && searchResults.length > 0 && (
          <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-xl">
            <div className="py-2">
              {searchResults.map((post) => (
                <button
                  key={post.slug}
                  onClick={() => {
                    router.push(`/posts/${post.slug}`)
                    setShowResults(false)
                    setSearchQuery('')
                  }}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition-colors"
                >
                  <div className="text-sm font-medium text-gray-900">
                    {post.title}
                  </div>
                  <div className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {post.description}
                  </div>
                  <div className="flex gap-2 mt-2">
                    <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded">
                      {post.category}
                    </span>
                    {post.tags?.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-xs text-gray-400">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* フィルターセクション */}
      <div className="space-y-3">
        {/* カテゴリフィルター */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">カテゴリ</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryToggle(category)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  selectedCategories.includes(category)
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {category}
                {selectedCategories.includes(category) && (
                  <span className="ml-1">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* タグフィルター */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">タグ</h3>
          <div className="space-y-2">
            {/* 選択されたタグ */}
            {selectedTags.length > 0 && (
              <div className="flex flex-wrap gap-2 pb-2 border-b border-gray-200">
                {selectedTags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    #{tag}
                    <button
                      onClick={() => handleTagToggle(tag)}
                      className="ml-1 text-gray-500 hover:text-gray-700"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* タグ選択ドロップダウン */}
            <div ref={tagDropdownRef} className="relative">
              <button
                onClick={() => setIsTagDropdownOpen(!isTagDropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
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
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
                タグを選択
                {selectedTags.length > 0 && (
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs">
                    {selectedTags.length}
                  </span>
                )}
                <svg
                  className={`w-4 h-4 ml-auto transition-transform ${
                    isTagDropdownOpen ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* ドロップダウンメニュー */}
              {isTagDropdownOpen && (
                <div className="absolute z-50 w-64 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl">
                  <div className="p-3 border-b border-gray-200">
                    <input
                      type="text"
                      placeholder="タグを検索..."
                      value={tagSearchQuery}
                      onChange={(e) => setTagSearchQuery(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {filteredTags.length > 0 ? (
                      <div className="py-1">
                        {filteredTags.map((tag) => (
                          <button
                            key={tag}
                            onClick={() => handleTagToggle(tag)}
                            className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-50 transition-colors flex items-center justify-between ${
                              selectedTags.includes(tag) ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                            }`}
                          >
                            <span>#{tag}</span>
                            {selectedTags.includes(tag) && (
                              <svg
                                className="w-4 h-4 text-blue-600"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="px-3 py-4 text-sm text-gray-500 text-center">
                        タグが見つかりません
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* フィルタークリアボタン */}
        {hasActiveFilters && (
          <div className="pt-2">
            <button
              onClick={clearAllFilters}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              すべてのフィルターをクリア
            </button>
          </div>
        )}
      </div>
    </div>
  )
}