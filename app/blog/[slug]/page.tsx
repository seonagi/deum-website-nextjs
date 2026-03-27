import Navigation from '@/components/Navigation'
import Link from 'next/link'
import Image from 'next/image'
import ChatWidget from '@/components/ChatWidget'
import { getArticleBySlug, getAllArticleSlugs } from '@/lib/articles'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export const revalidate = false // Static generation only

export async function generateStaticParams() {
  return getAllArticleSlugs().map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = getArticleBySlug(params.slug)
  if (!article) return {}
  
  return {
    title: article.title,
    description: article.description,
  }
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug)

  if (!article) {
    notFound()
  }

  // Convert markdown-style content to React elements
  const renderContent = (content: string) => {
    const lines = content.trim().split('\n\n')
    
    return lines.map((block, index) => {
      // Headers
      if (block.startsWith('## ')) {
        return (
          <h2 key={index} className="text-2xl md:text-3xl font-semibold text-white mt-10 mb-6">
            {block.replace('## ', '')}
          </h2>
        )
      }
      
      // Blockquotes
      if (block.startsWith('> ')) {
        return (
          <div key={index} className="bg-[#111] border-l-4 border-[#3B82F6] p-6 my-8 rounded-r-lg">
            <p className="m-0 font-semibold text-white">
              {block.replace('> ', '')}
            </p>
          </div>
        )
      }
      
      // Lists
      if (block.startsWith('- ')) {
        const items = block.split('\n')
        return (
          <ul key={index} className="space-y-3 my-6">
            {items.map((item, i) => (
              <li key={i} className="flex items-start">
                <span className="text-[#3B82F6] mr-3 mt-1.5">•</span>
                <span className="flex-1" dangerouslySetInnerHTML={{ __html: item.replace('- ', '').replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>') }} />
              </li>
            ))}
          </ul>
        )
      }
      
      // Regular paragraphs
      return (
        <p key={index} className="mb-6 leading-relaxed" dangerouslySetInnerHTML={{ 
          __html: block.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>') 
        }} />
      )
    })
  }

  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      <Navigation />

      {/* Article Content */}
      <article className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          
          {/* Back Link */}
          <Link href="/blog" className="inline-flex items-center text-[#A0A0A0] hover:text-white transition-colors mb-8">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>

          {/* Article Header */}
          <header className="mb-12">
            <div className="text-[#3B82F6] text-xs font-semibold uppercase tracking-wider mb-4">
              {article.category}
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              {article.title}
            </h1>
            <div className="flex items-center text-sm text-[#A0A0A0] space-x-4">
              <span>{article.date}</span>
              <span>•</span>
              <span>{article.readTime}</span>
            </div>
          </header>

          {/* Hero Image */}
          <div className="aspect-video relative rounded-2xl overflow-hidden mb-12">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Article Body */}
          <div className="prose prose-invert prose-lg max-w-none text-[#D0D0D0]">
            {renderContent(article.content)}
          </div>

          {/* CTA */}
          <div className="mt-16 p-8 bg-gradient-to-br from-[#3B82F6]/10 to-[#1F1F1F] border border-[#3B82F6]/20 rounded-2xl">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to create professional videos faster?
            </h3>
            <p className="text-[#A0A0A0] mb-6">
              Try deum.video and see how AI-powered editing can transform your content workflow.
            </p>
            <a
              href="https://app.deum.video/sign-up"
              className="inline-block px-8 py-4 bg-[#3B82F6] text-white font-semibold rounded-lg hover:bg-[#2563EB] transition-colors"
            >
              Try 1 video free
            </a>
          </div>

        </div>
      </article>

      {/* Footer */}
      <footer className="py-12 px-6 bg-[#0A0A0A] border-t border-[#1F1F1F] text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="text-lg md:text-2xl font-bold mb-4">deum</div>
              <p className="text-gray-400 text-sm">
                Professional video editing,<br />
                minus the effort.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <div className="space-y-2 text-sm">
                <Link href="/#how" className="block text-gray-400 hover:text-white transition-colors">
                  Features
                </Link>
                <Link href="/#pricing" className="block text-gray-400 hover:text-white transition-colors">
                  Pricing
                </Link>
                <Link href="/faq" className="block text-gray-400 hover:text-white transition-colors">
                  FAQ
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <div className="space-y-2 text-sm">
                <Link href="/about" className="block text-gray-400 hover:text-white transition-colors">
                  About
                </Link>
                <Link href="/blog" className="block text-gray-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <div className="space-y-2 text-sm">
                <a href="https://app.deum.video/privacy" className="block text-gray-400 hover:text-white transition-colors">
                  Privacy
                </a>
                <a href="https://app.deum.video/terms" className="block text-gray-400 hover:text-white transition-colors">
                  Terms
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            © 2026 Deum. All rights reserved.
          </div>
        </div>
      </footer>

      <ChatWidget />
    </main>
  )
}
