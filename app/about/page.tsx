import Link from 'next/link'
import Image from 'next/image'
import ChatWidget from '@/components/ChatWidget'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-[#0A0A0A]/80 backdrop-blur-sm z-40 border-b border-[#1F1F1F]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-lg md:text-2xl font-bold text-white">deum</Link>
            <div className="hidden md:flex items-center gap-6 text-sm">
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
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-12">The Story Behind Deum</h1>

          {/* Founder Story */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Why I Built Deum</h2>
            
            {/* Newspaper-style layout with image float */}
            <div className="space-y-4 text-lg text-[#A0A0A0] leading-relaxed">
              {/* Founder photo - floats left on desktop, full width on mobile */}
              <div className="w-full md:w-96 md:float-left md:mr-8 mb-6 rounded-2xl overflow-hidden">
                <Image 
                  src="/images/elliot-founder-labeled.jpg" 
                  alt="Founder of Deum" 
                  width={384}
                  height={384}
                  className="object-cover w-full"
                  sizes="(max-width: 768px) 100vw, 384px"
                />
              </div>

              <p>
                Deum started with a simple frustration: editing a short video shouldn't take hours.
              </p>
              <p>
                Between work and family life, I needed something that didn't clash with my ADHD. Something fast, simple, and that didn't demand constant decisions.
              </p>
              <p>
                For me, what starts as a "quick edit" easily turns into hours of tweaking. Small decisions stack up. Before you know it, you're deep in the weeds trying to get everything just right.
              </p>
              <p>
                It's not just the time, it's the mental load. Too many choices. Visual distractions. Second-guessing every cut. Losing track of where you were. It adds up fast.
              </p>
              <p>
                Tools like Descript are powerful, but they come with a learning curve and can be overwhelming when focus and time are already limited.
              </p>
              <p>
                I wanted something simpler. Something that removes the friction instead of adding to it.
              </p>
              <p className="text-white font-medium">
                So I built Deum, a tool that does the work for you, so you can get back to what matters.
              </p>
            </div>

            <div className="bg-[#111111] p-8 rounded-2xl space-y-4 text-lg text-[#A0A0A0]">
              <p>
                Deum was designed for creators who don't have hours to lose in complex software. People balancing work, life, and everything in between. Neurodivergent creators who need tools that work with their brain, not against it.
              </p>
              <p>
                No timelines. No endless decisions. No getting lost in the process. Just upload your video and walk away. Ten minutes later, it's done.
              </p>
              <p className="text-white font-medium">
                That's the whole point: get back to creating, not editing.
              </p>
            </div>
          </div>

          {/* Why We're Different */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Why We're Different</h2>
            <p className="text-lg text-[#A0A0A0] mb-6">
              Most video editors are built for professionals with hours to spare. Deum is built for creators with lives to live.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-[#111111] p-6 rounded-xl">
                <div className="text-2xl mb-3">⚡</div>
                <h3 className="text-xl font-semibold text-white mb-2">10x Faster</h3>
                <p className="text-[#A0A0A0]">
                  What takes 90 minutes in Descript takes 10 minutes in Deum. Automatic processing means zero manual work.
                </p>
              </div>
              
              <div className="bg-[#111111] p-6 rounded-xl">
                <div className="text-2xl mb-3">🎯</div>
                <h3 className="text-xl font-semibold text-white mb-2">97% Accurate</h3>
                <p className="text-[#A0A0A0]">
                  Two-pass validation ensures we remove fillers without cutting real words. Professional results, zero effort.
                </p>
              </div>
              
              <div className="bg-[#111111] p-6 rounded-xl">
                <div className="text-2xl mb-3">🧠</div>
                <h3 className="text-xl font-semibold text-white mb-2">Zero Executive Function Drain</h3>
                <p className="text-[#A0A0A0]">
                  Upload and done. No timeline to navigate. No decisions to make. Perfect for ADHD creators.
                </p>
              </div>
              
              <div className="bg-[#111111] p-6 rounded-xl">
                <div className="text-2xl mb-3">🔒</div>
                <h3 className="text-xl font-semibold text-white mb-2">Your Videos Stay Private</h3>
                <p className="text-[#A0A0A0]">
                  Processed in isolated environments, automatically deleted after 24 hours. Never shared or used for training.
                </p>
              </div>
            </div>
          </div>

          {/* Who It's For */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Who Deum Is For</h2>
            <div className="space-y-4 text-lg text-[#A0A0A0]">
              <p>
                <strong className="text-white">YouTubers & Podcasters:</strong> Spend more time creating, less time clicking through waveforms.
              </p>
              <p>
                <strong className="text-white">Course Creators:</strong> Professional polish without the professional learning curve.
              </p>
              <p>
                <strong className="text-white">Business Owners:</strong> Marketing videos that don't eat your entire afternoon.
              </p>
              <p>
                <strong className="text-white">ADHD/Neurodivergent Creators:</strong> Finally, a tool that doesn't trap you for hours.
              </p>
            </div>
          </div>

          {/* Get in Touch */}
          <div className="bg-[#111111] p-8 rounded-2xl">
            <h3 className="text-2xl font-bold text-white mb-4">Questions? Feedback?</h3>
            <p className="text-lg text-[#A0A0A0] mb-6">
              I read every email. If you're struggling with the tool, have ideas for improvements, or just want to 
              share your experience — I'd genuinely love to hear from you.
            </p>
            <a 
              href="mailto:elliot@deum.video" 
              className="inline-block px-6 py-3 bg-[#3B82F6] text-white rounded-lg font-medium hover:bg-[#2563EB] transition-colors"
            >
              Email me: elliot@deum.video
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 px-6 bg-[#0A0A0A] border-t border-[#1F1F1F] text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="text-2xl font-bold mb-4">deum</div>
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
