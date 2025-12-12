import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'

const postsDirectory = path.join(process.cwd(), 'content', 'posts')

export interface PostMatter {
  title: string
  date: string
  category: string
  tags: string[]
  description: string
  published?: boolean
}

export interface Post extends PostMatter {
  slug: string
  content: string
  readingTime?: number
}

// 全ての記事を取得
export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const allPosts = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      // 読了時間の計算（日本語対応）
      const charCount = content.replace(/\s/g, '').length
      const readingTime = Math.ceil(charCount / 400) // 400文字/分として計算

      return {
        slug,
        content,
        readingTime,
        ...(data as PostMatter),
      }
    })
    .filter((post) => post.published !== false) // 非公開記事を除外
    .sort((a, b) => (a.date > b.date ? -1 : 1))

  return allPosts
}

// 記事をスラッグで取得
export function getPostBySlug(slug: string): Post | null {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`)

  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const charCount = content.replace(/\s/g, '').length
  const readingTime = Math.ceil(charCount / 400)

  return {
    slug,
    content,
    readingTime,
    ...(data as PostMatter),
  }
}

// カテゴリーごとの記事を取得
export function getPostsByCategory(category: string): Post[] {
  const allPosts = getAllPosts()
  return allPosts.filter((post) => post.category === category)
}

// タグごとの記事を取得
export function getPostsByTag(tag: string): Post[] {
  const allPosts = getAllPosts()
  return allPosts.filter((post) => post.tags?.includes(tag))
}

// 全カテゴリーを取得
export function getAllCategories(): string[] {
  const posts = getAllPosts()
  const categories = new Set<string>()
  posts.forEach((post) => {
    if (post.category) {
      categories.add(post.category)
    }
  })
  return Array.from(categories).sort()
}

// 全タグを取得
export function getAllTags(): string[] {
  const posts = getAllPosts()
  const tags = new Set<string>()
  posts.forEach((post) => {
    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach((tag) => tags.add(tag))
    }
  })
  return Array.from(tags).sort()
}

// 日付フォーマット
export function formatDate(date: string): string {
  return format(new Date(date), 'yyyy年MM月dd日', { locale: ja })
}