import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'

// カスタム画像コンポーネント
const CustomImage = ({ src, alt, ...props }: any) => {
  // 外部URLの場合はそのまま使用、内部画像は/images/postsから読み込み
  const imageSrc = src.startsWith('http') ? src : `/images/posts/${src}`

  return (
    <figure className="my-8">
      <Image
        src={imageSrc}
        alt={alt || ''}
        width={800}
        height={450}
        className="rounded-lg w-full h-auto"
        style={{ maxWidth: '100%', height: 'auto' }}
        {...props}
      />
      {alt && (
        <figcaption className="text-center text-sm text-gray-600 mt-2">
          {alt}
        </figcaption>
      )}
    </figure>
  )
}

// カスタムリンクコンポーネント
const CustomLink = ({ href, children, ...props }: { href: string; children: ReactNode }) => {
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'))

  if (isInternalLink) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    )
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
      <span className="inline-block ml-1">↗</span>
    </a>
  )
}

// コードブロックコンポーネント
const Pre = ({ children, ...props }: any) => {
  return (
    <pre className="overflow-x-auto rounded-lg bg-gray-900 p-4 my-4" {...props}>
      {children}
    </pre>
  )
}

// インラインコード
const InlineCode = ({ children }: { children: ReactNode }) => {
  return (
    <code className="px-1.5 py-0.5 rounded bg-gray-100 text-sm font-mono">
      {children}
    </code>
  )
}

// MDXで使用するコンポーネント
export const MDXComponents = {
  img: CustomImage,
  Image: CustomImage,
  a: CustomLink,
  pre: Pre,
  code: InlineCode,
  // 見出しにアンカーリンク追加
  h1: ({ children, ...props }: any) => (
    <h1 className="text-3xl font-bold mt-8 mb-4" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: any) => (
    <h2 className="text-2xl font-bold mt-6 mb-3" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: any) => (
    <h3 className="text-xl font-bold mt-4 mb-2" {...props}>
      {children}
    </h3>
  ),
  // リスト
  ul: ({ children, ...props }: any) => (
    <ul className="list-disc list-inside my-4 space-y-2" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: any) => (
    <ol className="list-decimal list-inside my-4 space-y-2" {...props}>
      {children}
    </ol>
  ),
  // 引用
  blockquote: ({ children, ...props }: any) => (
    <blockquote className="border-l-4 border-blue-500 pl-4 my-4 italic text-gray-700" {...props}>
      {children}
    </blockquote>
  ),
  // テーブル
  table: ({ children, ...props }: any) => (
    <div className="overflow-x-auto my-4">
      <table className="min-w-full divide-y divide-gray-200" {...props}>
        {children}
      </table>
    </div>
  ),
  th: ({ children, ...props }: any) => (
    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }: any) => (
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900" {...props}>
      {children}
    </td>
  ),
}