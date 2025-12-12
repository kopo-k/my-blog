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