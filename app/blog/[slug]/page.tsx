import { notFound } from 'next/navigation'
import Navigation from '@/components/Navigation'
import ChatWidget from '@/components/ChatWidget'
import Image from 'next/image'
import Link from 'next/link'
import { getMdPosts } from '@/lib/mdBlog'
import type { Metadata } from 'next'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkHtml from 'remark-html'

async function getPost(slug: string) {
  const blogDir = path.join(process.cwd(), 'content', 'blog')
  const filePath = path.join(blogDir, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  const processed = await remark().use(remarkHtml).process(content)

  return {
    slug,
    title: data.title ?? 'Untitled',
    description: data.description ?? '',
    date: data.date ?? '',
    author: data.author ?? '',
    image: data.image ?? `/images/blog/${slug}.jpg`,
    html: processed.toString(),
  }
}

export async function generateStaticParams() {
  return getMdPosts().map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return {}
  return {
    title: `${post.title} — deum.video`,
    description: post.description,
    openGraph: { title: post.title, description: post.description, images: [post.image] },
  }
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  const formattedDate = post.date
    ? new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    : ''

  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      <Navigation />

      <div className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">

          <Link href="/blog" className="text-[#3B82F6] text-sm hover:underline mb-8 inline-block">
            &larr; Back to blog
          </Link>

          <div className="mb-8">
            <div className="text-[#3B82F6] text-xs font-semibold uppercase tracking-wider mb-3">
              Video Editing
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              {post.title}
            </h1>
            <p className="text-[#A0A0A0] text-lg mb-4">{post.description}</p>
            <div className="text-gray-500 text-sm">{formattedDate} · {post.author}</div>
          </div>

          <div className="aspect-video relative rounded-xl overflow-hidden mb-10 bg-[#1F1F1F]">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>

          <style>{`
            .blog-content p { color: #C0C0C0; line-height: 1.85; margin-bottom: 1.5rem; font-size: 1.0625rem; }
            .blog-content h2 { color: #fff; font-size: 1.625rem; font-weight: 600; margin-top: 2.75rem; margin-bottom: 1rem; line-height: 1.3; }
            .blog-content h3 { color: #fff; font-size: 1.25rem; font-weight: 600; margin-top: 2rem; margin-bottom: 0.75rem; line-height: 1.35; }
            .blog-content h4 { color: #fff; font-size: 1.1rem; font-weight: 600; margin-top: 1.5rem; margin-bottom: 0.5rem; }
            .blog-content ul, .blog-content ol { color: #C0C0C0; margin: 1.5rem 0; padding-left: 1.75rem; }
            .blog-content ul { list-style-type: disc; }
            .blog-content ol { list-style-type: decimal; }
            .blog-content li { margin-bottom: 0.5rem; line-height: 1.75; }
            .blog-content a { color: #3B82F6; text-decoration: none; }
            .blog-content a:hover { text-decoration: underline; }
            .blog-content strong { color: #fff; font-weight: 600; }
            .blog-content em { color: #A0A0A0; }
            .blog-content blockquote { border-left: 4px solid #3B82F6; padding: 0.75rem 1.5rem; margin: 2rem 0; color: #A0A0A0; font-style: italic; background: #111; border-radius: 0 0.5rem 0.5rem 0; }
            .blog-content blockquote p { margin-bottom: 0; }
            .blog-content code { color: #3B82F6; background: #1F1F1F; padding: 0.15em 0.4em; border-radius: 0.25rem; font-size: 0.9em; }
            .blog-content pre { background: #111; border: 1px solid #1F1F1F; border-radius: 0.5rem; padding: 1.25rem; margin: 1.5rem 0; overflow-x: auto; }
            .blog-content pre code { background: none; padding: 0; color: #C0C0C0; }
            .blog-content hr { border: none; border-top: 1px solid #1F1F1F; margin: 2.5rem 0; }
            .blog-content img { border-radius: 0.5rem; margin: 1.5rem 0; max-width: 100%; }
          `}</style>
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />

          <div className="mt-16 p-8 bg-[#111] border border-[#1F1F1F] rounded-xl text-center">
            <h3 className="text-xl font-bold text-white mb-3">Remove filler words automatically</h3>
            <p className="text-[#A0A0A0] mb-6">deum processes your video in real-time — no timeline, no editing. Try it free.</p>
            <Link
              href="https://app.deum.video"
              className="inline-block bg-[#3B82F6] text-white font-semibold px-8 py-3 rounded-lg hover:bg-[#2563EB] transition-colors"
            >
              Try deum free →
            </Link>
          </div>

        </div>
      </div>

      <ChatWidget />
    </main>
  )
}
