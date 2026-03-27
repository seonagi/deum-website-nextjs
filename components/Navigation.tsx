import Link from 'next/link'

export default function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-[#0A0A0A]/80 backdrop-blur-sm z-40 border-b border-[#1F1F1F]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl md:text-2xl font-bold text-white">
            deum
          </Link>
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <Link href="/#how" className="text-sm text-[#A0A0A0] hover:text-white transition-colors">
              How it works
            </Link>
            <Link href="/#pricing" className="text-sm text-[#A0A0A0] hover:text-white transition-colors">
              Pricing
            </Link>
            <Link href="/faq" className="text-sm text-[#A0A0A0] hover:text-white transition-colors">
              FAQ
            </Link>
            <Link href="/about" className="text-sm text-[#A0A0A0] hover:text-white transition-colors">
              About
            </Link>
            <a
              href="https://app.deum.video/sign-in"
              className="px-4 py-2 text-sm border border-[#1F1F1F] rounded-lg text-[#A0A0A0] hover:border-[#3B82F6] hover:text-white transition-colors"
            >
              Sign in
            </a>
          </div>
          <a
            href="https://app.deum.video/sign-in"
            className="md:hidden px-3 py-1.5 text-sm border border-[#1F1F1F] rounded-lg text-[#A0A0A0]"
          >
            Sign in
          </a>
        </div>
      </div>
    </nav>
  )
}
