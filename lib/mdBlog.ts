import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface MdPost {
  slug: string
  title: string
  description: string
  date: string
  author: string
  image: string
  content: string
}

const BLOG_DIR = path.join(process.cwd(), 'app', 'blog')

export function getMdPosts(): Omit<MdPost, 'content'>[] {
  if (!fs.existsSync(BLOG_DIR)) return []

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.md'))

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.md$/, '')
    const raw = fs.readFileSync(path.join(BLOG_DIR, filename), 'utf-8')
    const { data } = matter(raw)
    return {
      slug,
      title: data.title ?? 'Untitled',
      description: data.description ?? '',
      date: data.date ?? '',
      author: data.author ?? '',
      image: data.image ?? `/images/blog/${slug}.jpg`,
    }
  })

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getMdPost(slug: string): MdPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)

  return {
    slug,
    title: data.title ?? 'Untitled',
    description: data.description ?? '',
    date: data.date ?? '',
    author: data.author ?? '',
    image: data.image ?? `/images/blog/${slug}.jpg`,
    content,
  }
}
