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

          <div
            className="prose prose-invert prose-lg max-w-none
              prose-headings:text-white prose-headings:font-semibold prose-headings:mt-10 prose-headings:mb-4
              prose-h2:text-2xl prose-h2:md:text-3xl
              prose-h3:text-xl
              prose-p:text-[#C0C0C0] prose-p:leading-[1.85] prose-p:mb-6
              prose-a:text-[#3B82F6] prose-a:no-underline hover:prose-a:underline
              prose-strong:text-white
              prose-blockquote:border-l-4 prose-blockquote:border-[#3B82F6] prose-blockquote:text-[#A0A0A0] prose-blockquote:pl-6 prose-blockquote:my-8 prose-blockquote:italic
              prose-code:text-[#3B82F6] prose-code:bg-[#1F1F1F] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
              prose-li:text-[#C0C0C0] prose-li:mb-2 prose-li:leading-relaxed
              prose-ul:my-6 prose-ol:my-6
              prose-hr:border-[#1F1F1F] prose-hr:my-10"
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
