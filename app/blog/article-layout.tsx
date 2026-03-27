import Navigation from '@/components/Navigation'
import Link from 'next/link'
import Image from 'next/image'
import ChatWidget from '@/components/ChatWidget'
import { getArticleBySlug } from '@/lib/articles'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export async function ArticlePage({ slug }: { slug: string }) {
  const article = getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  const renderContent = (content: string) => {
    const lines = content.trim().split('\n\n')
    
    return lines.map((block, index) => {
      if (block.startsWith('## ')) {
        return (
          <h2 key={index} className="text-2xl md:text-3xl font-semibold text-white mt-10 mb-6">
            {block.replace('## ', '')}
          </h2>
        )
      }
      
      if (block.startsWith('> ')) {
        return (
          <div key={index} className="bg-[#111] border-l-4 border-[#3B82F6] p-6 my-8 rounded-r-lg">
            <p className="m-0 font-semibold text-white">
              {block.replace('> ', '')}
            </p>
          </div>
        )
      }
      
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

      <article className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <Link href="/blog" className="inline-flex items-center text-[#A0A0A0] hover:text-white transition-colors mb-8">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>

          <Image
            src={article.image}
            alt={article.title}
            width={800}
            height={400}
            className="w-full rounded-lg mb-8 object-cover"
            priority
          />

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{article.title}</h1>
          <p className="text-[#A0A0A0] mb-8">{article.date} • {article.readTime}</p>

          <div className="prose prose-invert max-w-none">
            {renderContent(article.content)}
          </div>

          <div className="mt-16 p-8 bg-[#111] rounded-lg border border-[#222]">
            <h3 className="text-xl font-semibold text-white mb-4">Ready to remove filler words?</h3>
            <p className="text-[#A0A0A0] mb-6">Try deum.video free - no credit card required.</p>
            <Link href="https://app.deum.video/sign-up" className="inline-block px-6 py-3 bg-[#3B82F6] text-white rounded-lg hover:bg-[#2563EB] transition-colors">
              Start Free →
            </Link>
          </div>
        </div>
      </article>

      <ChatWidget />
    </main>
  )
}

export async function generateMetadata({ slug }: { slug: string }): Promise<Metadata> {
  const article = getArticleBySlug(slug)
  if (!article) return {}
  
  return {
    title: article.title,
    description: article.description,
  }
}
