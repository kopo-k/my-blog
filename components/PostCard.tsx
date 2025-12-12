import Link from 'next/link'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import type { Post } from '@/types/post'

function formatDate(date: string): string {
  return format(new Date(date), 'yyyy年MM月dd日', { locale: ja })
}

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <Link href={`/posts/${post.slug}`} className="block p-6">
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
          <time dateTime={post.date}>
            {formatDate(post.date)}
          </time>
          <span className="text-gray-300">•</span>
          <span>{post.readingTime}分</span>
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {post.title}
        </h2>

        <p className="text-gray-600 mb-4 line-clamp-3">
          {post.description}
        </p>

        <div className="flex items-center gap-4">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {post.category}
          </span>

          {post.tags?.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-sm text-gray-500"
            >
              #{tag}
            </span>
          ))}

          {post.tags && post.tags.length > 2 && (
            <span className="text-sm text-gray-400">
              +{post.tags.length - 2}
            </span>
          )}
        </div>
      </Link>
    </article>
  )
}