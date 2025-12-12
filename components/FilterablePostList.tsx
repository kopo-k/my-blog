'use client'

import { useState } from 'react'
import AdvancedSearchFilter from '@/components/AdvancedSearchFilter'
import PostCard from '@/components/PostCard'
import type { Post } from '@/types/post'

interface FilterablePostListProps {
  posts: Post[]
  categories: string[]
  tags: string[]
}

export default function FilterablePostList({
  posts,
  categories,
  tags
}: FilterablePostListProps) {
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(posts)

  return (
    <>
      {/* 高度な検索フィルター */}
      <AdvancedSearchFilter
        posts={posts}
        categories={categories}
        allTags={tags}
        onFilter={setFilteredPosts}
      />

      {/* 記事一覧 */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-gray-100 rounded-full">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M12 12h-.01M12 12v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="text-gray-500 text-lg mb-2">記事が見つかりませんでした</p>
            <p className="text-gray-400 text-sm">
              検索条件を変更してもう一度お試しください
            </p>
          </div>
        )}
      </div>

      {/* 検索結果の統計 */}
      {filteredPosts.length > 0 && (
        <div className="mt-8 text-center text-sm text-gray-500">
          {filteredPosts.length}件の記事が見つかりました
        </div>
      )}
    </>
  )
}