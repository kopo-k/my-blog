'use client'

import { useState } from 'react'

interface CodeBlockProps {
  children: string
  className?: string
}

export default function CodeBlock({ children, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const language = className?.replace(/language-/, '') || 'text'

  return (
    <div className="relative group">
      <div className="absolute right-2 top-2 z-10">
        <button
          onClick={handleCopy}
          className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-200"
        >
          {copied ? '✓ コピー済み' : 'コピー'}
        </button>
      </div>
      <div className="absolute left-4 top-2 text-xs text-gray-400 uppercase">
        {language}
      </div>
      <pre className={`${className} pt-10 pb-4 px-4 rounded-lg overflow-x-auto`}>
        <code>{children}</code>
      </pre>
    </div>
  )
}