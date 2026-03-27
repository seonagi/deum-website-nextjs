import Navigation from '@/components/Navigation'
import Link from 'next/link'
import Image from 'next/image'
import ChatWidget from '@/components/ChatWidget'

export default function BlogPage() {
  const articles = [
    {
      title: "Why Filler Words Make You Sound Unprofessional",
      category: "Content Creation",
      description: "The science behind verbal fillers and how they impact viewer retention. Learn what modern audiences expect from video content.",
      slug: "filler-words",
      image: "/images/article-6.jpg",
      date: "March 18, 2026"
    },
    {
      title: "The Content Creator's Guide to Editing Efficiency",
      category: "Productivity",
      description: "Time-saving workflows and AI-powered editing trends that help you focus on content, not timelines.",
      slug: "editing-efficiency",
      image: "/images/article-7.jpg",
      date: "March 18, 2026"
    },
    {
      title: "Common YouTube Mistakes That Kill Your Growth",
      category: "Strategy",
      description: "Avoid pitfalls that thousands of creators fall into. Master the algorithm with proven strategies.",
      slug: "youtube-mistakes",
      image: "/images/article-8.jpg",
      date: "March 10, 2026"
    },
    {
      title: "The Psychology of Watch Time Retention",
      category: "Content Strategy",
      description: "Why the first 30 seconds matter most and how professional-sounding content keeps viewers engaged.",
      slug: "watch-time-psychology",
      image: "/images/article-4.jpg",
      date: "March 8, 2026"
    },
    {
      title: "What Modern Viewers Expect from Video Content",
      category: "Audience",
      description: "Production quality standards are rising. Here's how to meet viewer expectations without breaking the bank.",
      slug: "viewer-expectations",
      image: "/images/article-10.jpg",
      date: "March 5, 2026"
    },
    {
      title: "Creator Mistakes That Sabotage Video Performance",
      category: "Best Practices",
      description: "Common pitfalls in video production and editing that hurt engagement and how to avoid them.",
      slug: "creator-mistakes",
      image: "/images/article-3.jpg",
      date: "March 3, 2026"
    },
    {
      title: "How to Make Professional-Looking Videos Without a Crew",
      category: "Production",
      description: "Solo creator strategies for achieving cinematic quality through smart editing and AI tools.",
      slug: "professional-videos",
      image: "/images/article-9.jpg",
      date: "February 28, 2026"
    },
    {
      title: "Why AI Content Creation Will Replace Traditional Editing",
      category: "Technology",
      description: "The shift from manual timeline editing to AI-powered workflows and what it means for creators.",
      slug: "ai-content-creation",
      image: "/images/article-1.jpg",
      date: "February 25, 2026"
    },
    {
      title: "The Science of Scripting Videos That Go Viral",
      category: "Scripting",
      description: "Hook formulas, retention mechanics, and pacing strategies backed by data from successful creators.",
      slug: "viral-psychology",
      image: "/images/article-5.jpg",
      date: "February 22, 2026"
    },
    {
      title: "Platform-Specific Optimization for Maximum Reach",
      category: "Distribution",
      description: "YouTube vs TikTok vs Instagram: tailoring your content strategy for each platform's algorithm.",
      slug: "platform-optimization",
      image: "/images/article-2.jpg",
      date: "February 20, 2026"
    }
  ]

  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      <Navigation />

      {/* Blog Content */}
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-xl md:text-3xl md:text-5xl font-bold text-white mb-4">Blog</h1>
            <p className="text-xl text-[#A0A0A0]">Tips, insights, and best practices for modern video editing</p>
          </div>

          {/* Blog Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {articles.map((article, index) => (
              <article key={index} className="bg-[#0A0A0A] rounded-xl border border-[#1F1F1F] hover:border-[#3B82F6] transition-all overflow-hidden group">
                <Link href={`/blog/${article.slug}`} className="block">
                  {/* Article Image */}
                  <div className="aspect-video bg-[#1F1F1F] relative overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>

                  {/* Article Content */}
                  <div className="p-6">
                    <div className="text-[#3B82F6] text-xs font-semibold uppercase tracking-wider mb-3">
                      {article.category}
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3 line-clamp-2 group-hover:text-[#3B82F6] transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-[#A0A0A0] text-sm leading-relaxed mb-4 line-clamp-3">
                      {article.description}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">{article.date}</span>
                      <span className="text-[#3B82F6] font-semibold group-hover:translate-x-1 transition-transform inline-block">
                        Read article →
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          {/* Coming Soon Note */}
          <div className="mt-16 text-center">
            <p className="text-[#A0A0A0] text-sm">
              Full articles coming soon. We're migrating our blog content to the new platform.
            </p>
          </div>
        </div>
      </div>

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
