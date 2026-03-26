import ChatWidget from '@/components/ChatWidget'
import PricingSection from '@/components/PricingSection'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-[#0A0A0A]/80 backdrop-blur-sm z-40 border-b border-[#1F1F1F]">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-white">deum</div>
            <div className="flex items-center gap-8">
              <a href="#how" className="text-[#A0A0A0] hover:text-white transition-colors">
                How it works
              </a>
              <a href="#pricing" className="text-[#A0A0A0] hover:text-white transition-colors">
                Pricing
              </a>
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

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-6xl font-bold text-white mb-6">
            Video editing on autopilot.
          </h1>
          <p className="text-xl text-[#A0A0A0] mb-10 max-w-2xl mx-auto">
            Upload your video. Go grab coffee.<br />
            AI removes every filler. We email when it's ready.
          </p>
          <div className="flex items-center justify-center gap-4 mb-16">
            <a
              href="https://app.deum.video/sign-up"
              className="px-8 py-4 bg-[#3B82F6] text-white rounded-lg font-medium hover:bg-[#2563EB] transition-colors"
            >
              Try 1 video free
            </a>
            <a href="#demo" className="px-8 py-4 text-[#A0A0A0] hover:text-white transition-colors">
              See demo →
            </a>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-12 max-w-3xl mx-auto">
            <div>
              <div className="text-5xl font-bold text-white">10x</div>
              <div className="text-sm text-[#A0A0A0] mt-2">Faster than manual editing</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-white">97%</div>
              <div className="text-sm text-[#A0A0A0] mt-2">Accuracy rate</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-white">10min</div>
              <div className="text-sm text-[#A0A0A0] mt-2">Average render</div>
            </div>
          </div>
        </div>
      </section>

      {/* Before & After */}
      <section id="demo" className="py-20 px-6 bg-[#111111]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-sm text-gray-500 uppercase tracking-wider">See the difference</span>
            <h2 className="text-4xl font-bold text-white mt-2">Before & After</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 items-center">
            {/* Before */}
            <div className="bg-[#0A0A0A] p-8 rounded-2xl shadow-sm">
              <span className="text-sm font-medium text-gray-500">Before</span>
              <div className="flex items-end gap-1 h-24 my-6">
                {[60, 80, 40, 90, 30, 70, 85, 35, 75].map((height, i) => (
                  <div
                    key={i}
                    className={`flex-1 rounded-t ${[2, 4, 7].includes(i) ? 'bg-red-300' : 'bg-gray-300'}`}
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
              <p className="text-[#A0A0A0] italic">&quot;Um... so I think, uh, we should like...&quot;</p>
            </div>

            {/* Arrow */}
            <div className="text-center text-4xl text-gray-400">→</div>

            {/* After */}
            <div className="bg-[#0A0A0A] p-8 rounded-2xl shadow-sm">
              <span className="text-sm font-medium text-gray-500">After</span>
              <div className="flex items-end gap-1 h-24 my-6">
                {[60, 80, 90, 70, 85, 75].map((height, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-green-400 rounded-t"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
              <p className="text-[#A0A0A0] italic">&quot;I think we should proceed with this&quot;</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm text-gray-500 uppercase tracking-wider">Three steps</span>
            <h2 className="text-4xl font-bold text-white mt-2">Simpler than hiring an editor</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <div className="text-5xl font-bold text-gray-200 mb-4">01</div>
              <h3 className="text-2xl font-bold text-white mb-2">Upload</h3>
              <p className="text-[#A0A0A0]">Drag and drop your video. MP4, MOV, or AVI. Up to 4K quality.</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-gray-200 mb-4">02</div>
              <h3 className="text-2xl font-bold text-white mb-2">Process</h3>
              <p className="text-[#A0A0A0]">AI identifies and removes every filler. Audio polish included.</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-gray-200 mb-4">03</div>
              <h3 className="text-2xl font-bold text-white mb-2">Download</h3>
              <p className="text-[#A0A0A0]">Grab your polished video. Original quality. Professional sound.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6 bg-[#111111]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="text-lg font-bold text-white mb-2">Lightning fast</h3>
              <p className="text-sm text-[#A0A0A0]">Most videos render in under 10 minutes. No timeline scrubbing.</p>
            </div>
            <div>
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="text-lg font-bold text-white mb-2">Surgical precision</h3>
              <p className="text-sm text-[#A0A0A0]">97% accuracy. Removes "um", "uh", "er", "like" - keeps everything else.</p>
            </div>
            <div>
              <div className="text-3xl mb-3">🎨</div>
              <h3 className="text-lg font-bold text-white mb-2">Audio polish</h3>
              <p className="text-sm text-[#A0A0A0]">Loudness normalization and compression. Broadcast-ready.</p>
            </div>
            <div>
              <div className="text-3xl mb-3">🔒</div>
              <h3 className="text-lg font-bold text-white mb-2">Private & secure</h3>
              <p className="text-sm text-[#A0A0A0]">Your videos are encrypted and deleted after 24 hours.</p>
            </div>
          </div>
        </div>
      </section>

      <PricingSection />
      {/* CTA */}
      <section className="py-20 px-6 bg-[#111111]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to sound professional?</h2>
          <p className="text-lg text-[#A0A0A0] mb-8">Try your first video free. No credit card required.</p>
          <a
            href="https://app.deum.video/sign-up"
            className="inline-block px-8 py-4 bg-[#3B82F6] text-white rounded-lg font-medium hover:bg-[#2563EB] transition-colors"
          >
            Get started →
          </a>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">What Users Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#0A0A0A] p-6 rounded-xl border border-[#1F1F1F]">
              <div className="flex items-center gap-2 mb-4">
                <div className="font-semibold text-white">Aiva Rose</div>
                <div className="text-yellow-400">⭐⭐⭐⭐⭐</div>
              </div>
              <p className="text-[#A0A0A0]">&quot;Saved me 2 hours on every video. Descript without the confusion. The filler removal is shockingly accurate and the b-roll feature is genius. Worth every penny.&quot;</p>
            </div>
            <div className="bg-[#0A0A0A] p-6 rounded-xl border border-[#1F1F1F]">
              <div className="flex items-center gap-2 mb-4">
                <div className="font-semibold text-white">Jonathan</div>
                <div className="text-yellow-400">⭐⭐⭐⭐⭐</div>
              </div>
              <p className="text-[#A0A0A0]">&quot;A game changer for video editing.&quot;</p>
            </div>
            <div className="bg-[#0A0A0A] p-6 rounded-xl border border-[#1F1F1F]">
              <div className="flex items-center gap-2 mb-4">
                <div className="font-semibold text-white">Ozair Levi</div>
                <div className="text-yellow-400">⭐⭐⭐⭐</div>
              </div>
              <p className="text-[#A0A0A0]">&quot;I was skeptical but the output quality is genuinely impressive and I did not have to do any work myself. Really solid tool for content creators.&quot;</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-[#3B82F6] text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="text-2xl font-bold mb-4">deum</div>
              <p className="text-gray-400 text-sm">Professional video editing,<br />minus the effort.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <div className="space-y-2 text-sm">
                <a href="#how" className="block text-gray-400 hover:text-white transition-colors">Features</a>
                <a href="#pricing" className="block text-gray-400 hover:text-white transition-colors">Pricing</a>
                <Link href="/faq" className="block text-gray-400 hover:text-white transition-colors">FAQ</Link>
                <a href="https://app.deum.video/contact" className="block text-gray-400 hover:text-white transition-colors">API Access</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <div className="space-y-2 text-sm">
                <Link href="/about" className="block text-gray-400 hover:text-white transition-colors">About</Link>
                <Link href="/blog" className="block text-gray-400 hover:text-white transition-colors">Blog</Link>
                <a href="https://app.deum.video/contact" className="block text-gray-400 hover:text-white transition-colors">Contact</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <div className="space-y-2 text-sm">
                <a href="https://app.deum.video/privacy" className="block text-gray-400 hover:text-white transition-colors">Privacy</a>
                <a href="https://app.deum.video/terms" className="block text-gray-400 hover:text-white transition-colors">Terms</a>
                <a href="https://app.deum.video/security" className="block text-gray-400 hover:text-white transition-colors">Security</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            © 2026 Deum. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Chat Widget */}
      <ChatWidget />
    </main>
  )
}
