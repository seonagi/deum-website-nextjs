import Navigation from '@/components/Navigation'
import Link from 'next/link'
import ChatWidget from '@/components/ChatWidget'

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      <Navigation />

      {/* Blog Content */}
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-xl md:text-3xl md:text-5xl font-bold text-white mb-4">Blog</h1>
            <p className="text-xl text-[#A0A0A0]">Tips, guides, and insights for video creators</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[#0A0A0A] p-6 rounded-xl border border-[#1F1F1F] hover:border-[#1F1F1F] transition-colors">
              <h2 className="text-lg md:text-2xl font-bold text-white mb-3">Coming Soon</h2>
              <p className="text-[#A0A0A0] mb-4">
                We're working on bringing you helpful content about video creation, editing tips, and best practices.
              </p>
              <p className="text-sm text-gray-500">Check back soon!</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 px-6 bg-[#0A0A0A] border-t border-[#1F1F1F] text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="text-lg md:text-2xl font-bold mb-4">deum</div>
              <p className="text-gray-400 text-sm">Professional video editing,<br />minus the effort.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <div className="space-y-2 text-sm">
                <Link href="/#how" className="block text-gray-400 hover:text-white transition-colors">Features</Link>
                <Link href="/#pricing" className="block text-gray-400 hover:text-white transition-colors">Pricing</Link>
                <Link href="/faq" className="block text-gray-400 hover:text-white transition-colors">FAQ</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <div className="space-y-2 text-sm">
                <Link href="/about" className="block text-gray-400 hover:text-white transition-colors">About</Link>
                <Link href="/blog" className="block text-gray-400 hover:text-white transition-colors">Blog</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <div className="space-y-2 text-sm">
                <a href="https://app.deum.video/privacy" className="block text-gray-400 hover:text-white transition-colors">Privacy</a>
                <a href="https://app.deum.video/terms" className="block text-gray-400 hover:text-white transition-colors">Terms</a>
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
