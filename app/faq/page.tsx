import Link from 'next/link'
import ChatWidget from '@/components/ChatWidget'

export default function FAQPage() {
  const faqs = [
    {
      q: "How long does processing take?",
      a: "Processing time typically matches your video length. A 10-minute video takes about 10 minutes to process, a 5-minute video takes about 5 minutes, and so on. This includes AI transcription, filler detection, and rendering your clean video."
    },
    {
      q: "What file formats are supported?",
      a: "We support all common video formats including MP4, MOV, AVI, MKV, and more. We also support audio-only files (MP3, WAV, M4A) for podcast editing."
    },
    {
      q: "What's the maximum file size?",
      a: "You can upload videos up to 2GB in size. This is enough for about 2 hours of HD video or 4+ hours of standard definition."
    },
    {
      q: "How accurate is the filler detection?",
      a: "Our AI detects fillers like \"um,\" \"uh,\" \"like,\" and \"you know\" with 97% accuracy. We use a two-stage validation system to prevent cutting real words. Most cuts are seamless, but occasionally you might notice a slightly abrupt transition. That's why we recommend adding b-roll clips to cover any imperfect cuts. B-roll not only smooths over transitions, it makes your video more engaging overall."
    },
    {
      q: "Is my video private and secure?",
      a: "Yes. Your videos are processed in isolated cloud environments with enterprise-grade security, stored with encryption at rest and in transit, automatically deleted after 24 hours, and never shared, sold, or used for training AI models."
    },
    {
      q: "What happens to my original video?",
      a: "Your original upload is deleted immediately after processing. We keep your processed (clean) video for 24 hours so you can download it, then it's permanently deleted. You always keep your original file on your device."
    },
    {
      q: "Can I undo changes or preview before downloading?",
      a: "Not yet. Deum automatically removes all detected fillers. This is what makes us so fast and simple to use. Other services require hours of script editing and timeline adjustments. Deum is designed for simplicity and speed: upload, process, download. We recommend trying a short clip first to see if you like the results and the quick turnaround."
    },
    {
      q: "What languages are supported?",
      a: "Deum works best with English videos (US, UK, Australian, and other accents). We auto-detect accents for better filler recognition. Support for other languages is coming soon."
    },
    {
      q: "How does pricing work?",
      a: "We charge by processing hours, not video length. A 10-minute video uses about 10 minutes of your quota. Plans start at $15/year for 15 hours (enough for 90 minutes of video per year)."
    },
    {
      q: "Do unused hours roll over?",
      a: "No. Unused hours reset each month and don't carry over to the next billing period. If you have 5 hours per month and only use 3, the remaining 2 hours expire at month-end."
    },
    {
      q: "Can I use Deum for podcasts?",
      a: "Absolutely! Deum works great for audio-only files. Upload your podcast recording (MP3, WAV, M4A) and we'll remove fillers just like video. Perfect for cleaning up interviews, solo episodes, or voice recordings."
    },
    {
      q: "Can I cancel my subscription?",
      a: "Yes, cancel anytime. Your subscription will remain active until the end of your current billing period. No refunds for unused time. Note: Unused hours reset each month and don't roll over."
    },
    {
      q: "I found a bug!",
      a: "Thanks for helping us improve! Email us at hello@deum.video with details. If we confirm it's a bug, we'll credit you 3 free processing hours as a thank you."
    },
    {
      q: "I have another question!",
      a: "We'd love to help! Email us at hello@deum.video and we'll get back to you within 24 hours."
    }
  ]

  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-[#0A0A0A]/80 backdrop-blur-sm z-40 border-b border-[#1F1F1F]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-lg md:text-2xl font-bold text-white">deum</Link>
            <div className="hidden md:flex items-center gap-6 text-sm">
              <Link href="/#how" className="text-[#A0A0A0] hover:text-white transition-colors">
                How it works
              </Link>
              <Link href="/#pricing" className="text-[#A0A0A0] hover:text-white transition-colors">
                Pricing
              </Link>
              <a
                href="https://app.deum.video/sign-in"
                className="px-4 py-2 border border-[#1F1F1F] rounded-lg text-[#A0A0A0] hover:border-gray-400 transition-colors"
              >
                Sign in
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* FAQ Content */}
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-xl md:text-3xl md:text-5xl font-bold text-white mb-4">Frequently Asked Questions</h1>
            <p className="text-xl text-[#A0A0A0]">Everything you need to know about Deum</p>
          </div>

          <div className="space-y-8">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-8 border-b border-[#1F1F1F] last:border-0">
                <h2 className="text-lg md:text-2xl font-semibold text-white mb-4">{faq.q}</h2>
                <p className="text-lg text-[#A0A0A0] leading-relaxed whitespace-pre-line">{faq.a}</p>
              </div>
            ))}
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
