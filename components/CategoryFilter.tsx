'use client'

import { useState, useEffect } from 'react'
import type { Post } from '@/types/post'

interface CategoryFilterProps {
  categories: string[]
  posts: Post[]
  onFilter: (posts: Post[]) => void
}

export default function CategoryFilter({ categories, posts, onFilter }: CategoryFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  useEffect(() => {
    if (selectedCategory) {
      onFilter(posts.filter(post => post.category === selectedCategory))
    } else {
      onFilter(posts)
    }
  }, [selectedCategory, posts, onFilter])

  return (
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
  )
}