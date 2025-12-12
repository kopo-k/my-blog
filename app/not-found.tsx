import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-9xl font-bold text-gray-900">404</h1>
        <p className="text-2xl font-semibold text-gray-700 mt-4">
          ページが見つかりません
        </p>
        <p className="text-gray-500 mt-4 mb-8">
          お探しのページは削除されたか、URLが間違っている可能性があります。
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          ホームに戻る
        </Link>
      </div>
    </div>
  )
}