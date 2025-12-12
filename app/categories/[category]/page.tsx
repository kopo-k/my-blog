import { notFound } from 'next/navigation'
import { getAllCategories, getPostsByCategory } from '@/lib/mdx'
import PostCard from '@/components/PostCard'
import type { Metadata } from 'next'

interface CategoryPageProps {
  params: {
    category: string
  }
}

export async function generateStaticParams() {
  const categories = getAllCategories()
  return categories.map((category) => ({
    category: encodeURIComponent(category),
  }))
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = decodeURIComponent(params.category)
  return {
    title: `${category} | DevLog`,
    description: `${category}カテゴリの記事一覧`,
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = decodeURIComponent(params.category)
  const posts = getPostsByCategory(category)
  const categories = getAllCategories()

  if (!categories.includes(category)) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <a href="/categories" className="hover:text-gray-700">
              カテゴリ
            </a>
            <span>/</span>
            <span>{category}</span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {category}
          </h1>
          <p className="text-gray-600">
            {posts.length} 件の記事があります
          </p>
        </div>

        {posts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">
              このカテゴリには記事がありません。
            </p>
          </div>
        )}
      </main>
    </div>
  )
}