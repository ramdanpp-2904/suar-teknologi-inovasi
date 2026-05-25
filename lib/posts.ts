import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const POSTS_DIR = path.join(process.cwd(), 'content', 'blog')

export interface PostMeta {
  slug: string
  title: string
  date: string
  excerpt: string
  tags: string[]
  coverImage?: string
  author: string
  readingTime: string
}

export interface Post {
  meta: PostMeta
  content: string
}

function calcReadingTime(text: string): string {
  const words = text.trim().split(/\s+/).length
  const minutes = Math.max(1, Math.round(words / 200))
  return `${minutes} min read`
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) return []

  return fs
    .readdirSync(POSTS_DIR)
    .filter(f => f.endsWith('.mdx') || f.endsWith('.md'))
    .map(f => {
      const raw = fs.readFileSync(path.join(POSTS_DIR, f), 'utf-8')
      const { data, content } = matter(raw)
      return {
        slug: f.replace(/\.(mdx|md)$/, ''),
        title: data.title ?? 'Untitled',
        date: data.date ?? new Date().toISOString().slice(0, 10),
        excerpt: data.excerpt ?? '',
        tags: data.tags ?? [],
        coverImage: data.coverImage,
        author: data.author ?? 'Suar Teknologi',
        readingTime: calcReadingTime(content),
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPost(slug: string): Post | null {
  const mdxPath = path.join(POSTS_DIR, `${slug}.mdx`)
  const mdPath  = path.join(POSTS_DIR, `${slug}.md`)
  const filePath = fs.existsSync(mdxPath) ? mdxPath : fs.existsSync(mdPath) ? mdPath : null

  if (!filePath) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)

  return {
    meta: {
      slug,
      title: data.title ?? 'Untitled',
      date: data.date ?? new Date().toISOString().slice(0, 10),
      excerpt: data.excerpt ?? '',
      tags: data.tags ?? [],
      coverImage: data.coverImage,
      author: data.author ?? 'Suar Teknologi',
      readingTime: calcReadingTime(content),
    },
    content,
  }
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return []
  return fs
    .readdirSync(POSTS_DIR)
    .filter(f => f.endsWith('.mdx') || f.endsWith('.md'))
    .map(f => f.replace(/\.(mdx|md)$/, ''))
}
