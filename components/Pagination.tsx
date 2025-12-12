import Link from 'next/link'

interface PaginationProps {
  currentPage: number
  totalPages: number
  basePath?: string
}

export default function Pagination({ currentPage, totalPages, basePath = '' }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
  const maxVisible = 5

  let visiblePages: number[] = []

  if (totalPages <= maxVisible) {
    visiblePages = pages
  } else {
    const start = Math.max(1, currentPage - Math.floor(maxVisible / 2))
    const end = Math.min(totalPages, start + maxVisible - 1)
    visiblePages = pages.slice(start - 1, end)
  }

  return (
    <nav className="flex justify-center items-center space-x-2 mt-8">
      {/* Previous Button */}
      {currentPage > 1 && (
        <Link
          href={`${basePath}?page=${currentPage - 1}`}
          className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          前へ
        </Link>
      )}

      {/* Page Numbers */}
      {visiblePages[0] > 1 && (
        <>
          <Link
            href={`${basePath}?page=1`}
            className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            1
          </Link>
          {visiblePages[0] > 2 && <span className="px-2 text-gray-500">...</span>}
        </>
      )}

      {visiblePages.map(page => (
        <Link
          key={page}
          href={`${basePath}?page=${page}`}
          className={`px-3 py-2 text-sm font-medium rounded-md ${
            currentPage === page
              ? 'bg-blue-600 text-white'
              : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
          }`}
        >
          {page}
        </Link>
      ))}

      {visiblePages[visiblePages.length - 1] < totalPages && (
        <>
          {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
            <span className="px-2 text-gray-500">...</span>
          )}
          <Link
            href={`${basePath}?page=${totalPages}`}
            className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            {totalPages}
          </Link>
        </>
      )}

      {/* Next Button */}
      {currentPage < totalPages && (
        <Link
          href={`${basePath}?page=${currentPage + 1}`}
          className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          次へ
        </Link>
      )}
    </nav>
  )
}