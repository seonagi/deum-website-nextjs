import Link from 'next/link'
import ChatWidget from '@/components/ChatWidget'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-[#0A0A0A]/80 backdrop-blur-sm z-40 border-b border-[#1F1F1F]">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-lg md:text-2xl font-bold text-white">deum</Link>
            <div className="flex items-center gap-8">
              <Link href="/#how" className="text-[#A0A0A0] hover:text-white transition-colors">How it works</Link>
              <Link href="/#pricing" className="text-[#A0A0A0] hover:text-white transition-colors">Pricing</Link>
              <a href="https://app.deum.video/sign-in" className="px-4 py-2 border border-[#1F1F1F] rounded-lg text-[#A0A0A0] hover:border-gray-400 transition-colors">
                Sign in
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* About Content */}
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-xl md:text-3xl md:text-5xl font-bold text-white mb-6">About Deum</h1>
          <p className="text-xl text-[#A0A0A0] mb-12">
            We built Deum because video editing shouldn't be complicated.
          </p>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-xl md:text-3xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-[#A0A0A0] mb-8">
              Deum makes professional video editing accessible to everyone through AI-powered automation. 
              No timeline. No learning curve. Just upload, process, and download.
            </p>

            <h2 className="text-xl md:text-3xl font-bold text-white mb-4">Why We're Different</h2>
            <p className="text-[#A0A0A0] mb-4">
              Most video editors are complex tools that require weeks to learn. Deum is different:
            </p>
            <ul className="list-disc list-inside text-[#A0A0A0] mb-8 space-y-2">
              <li>10x faster than manual editing</li>
              <li>97% accuracy in filler word detection</li>
              <li>No software to install or learn</li>
              <li>Professional audio polish included</li>
              <li>Your videos stay private and secure</li>
            </ul>

            <h2 className="text-xl md:text-3xl font-bold text-white mb-4">Built for Creators</h2>
            <p className="text-[#A0A0A0] mb-8">
              Whether you're a YouTuber, podcaster, course creator, or business owner making marketing videos, 
              Deum saves you hours every week. Focus on creating great content, not editing it.
            </p>

            <div className="bg-[#111111] p-8 rounded-2xl">
              <h3 className="text-lg md:text-2xl font-bold text-white mb-4">Get in Touch</h3>
              <p className="text-[#A0A0A0] mb-4">
                Questions? Feedback? We'd love to hear from you.
              </p>
              <a 
                href="mailto:hello@deum.video" 
                className="inline-block px-6 py-3 bg-[#3B82F6] text-white rounded-lg font-medium hover:bg-[#2563EB] transition-colors"
              >
                Email us: hello@deum.video
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 px-6 bg-[#3B82F6] text-white">
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
