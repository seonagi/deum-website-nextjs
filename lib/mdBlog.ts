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

export function getMdPosts(): Omit<MdPost, 'content'>[] {
  const blogDir = path.join(process.cwd(), 'content', 'blog')
  if (!fs.existsSync(blogDir)) return []

  const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'))

  const posts = files.map(filename => {
    const slug = filename.replace(/\.md$/, '')
    const raw = fs.readFileSync(path.join(blogDir, filename), 'utf-8')
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
  const blogDir = path.join(process.cwd(), 'content', 'blog')
  const filePath = path.join(blogDir, `${slug}.md`)
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
