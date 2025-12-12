'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // エラーログをコンソールに出力（本番環境では外部サービスに送信）
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-6xl font-bold text-red-600 mb-4">エラー</h1>
        <p className="text-xl text-gray-700 mb-4">
          申し訳ございません。エラーが発生しました。
        </p>
        <p className="text-gray-500 mb-8">
          問題が解決しない場合は、しばらく時間をおいてからお試しください。
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          もう一度試す
        </button>
      </div>
    </div>
  )
}