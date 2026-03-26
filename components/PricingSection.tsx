'use client'

import { useState } from 'react'

export default function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(true)

  return (
    <section id="pricing" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-sm text-[#A0A0A0] uppercase tracking-wider">Simple pricing</span>
          <h2 className="text-xl md:text-2xl md:text-4xl font-bold text-white mt-2">One price. No surprises.</h2>
        </div>

        {/* Annual/Monthly Toggle */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <button
            onClick={() => setIsAnnual(true)}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              isAnnual
                ? 'bg-[#3B82F6] text-white'
                : 'bg-[#111111] text-[#A0A0A0] hover:text-white'
            }`}
          >
            Annual
          </button>
          <button
            onClick={() => setIsAnnual(false)}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              !isAnnual
                ? 'bg-[#3B82F6] text-white'
                : 'bg-[#111111] text-[#A0A0A0] hover:text-white'
            }`}
          >
            Monthly
          </button>
        </div>
        
        <div className="grid md:grid-cols-4 gap-6">
          {/* Free */}
          <div className="bg-[#111111] p-8 rounded-2xl border border-[#1F1F1F]">
            <h3 className="text-xl md:text-2xl font-bold text-white">Free</h3>
            <div className="text-xl md:text-2xl md:text-4xl font-bold text-white my-4">$0</div>
            <ul className="space-y-3 mb-8">
              <li className="text-sm text-[#A0A0A0]">1 hour per month</li>
              <li className="text-sm text-[#A0A0A0]">Up to 4K quality</li>
              <li className="text-sm text-[#A0A0A0]">Email notifications</li>
              <li className="text-sm text-[#A0A0A0]">Email support</li>
            </ul>
            <a href="https://app.deum.video/sign-up" className="block w-full py-3 text-center border border-[#1F1F1F] rounded-lg text-[#A0A0A0] hover:border-[#3B82F6] hover:text-white transition-colors">
              Start free
            </a>
          </div>

          {/* Hobby */}
          <div className="bg-[#111111] p-8 rounded-2xl border border-[#1F1F1F]">
            {isAnnual && (
              <div className="text-xs font-semibold text-[#3B82F6] mb-2">Save 25%</div>
            )}
            <h3 className="text-xl md:text-2xl font-bold text-white">Hobby</h3>
            <div className="text-xl md:text-2xl md:text-4xl font-bold text-white my-4">
              ${isAnnual ? '15' : '20'}
              <span className="text-lg text-[#A0A0A0]">/mo</span>
            </div>
            {isAnnual && (
              <div className="text-xs text-[#A0A0A0] mb-4">billed annually</div>
            )}
            <ul className="space-y-3 mb-8">
              <li className="text-sm text-[#A0A0A0]">10 hours per month</li>
              <li className="text-sm text-[#A0A0A0]">Up to 4K quality</li>
              <li className="text-sm text-[#A0A0A0]">Priority support</li>
            </ul>
            <a href="https://buy.stripe.com/eVq7sD8mFc21bn86Jnebu0d" className="block w-full py-3 text-center bg-[#3B82F6] text-white rounded-lg hover:bg-[#2563EB] transition-colors">
              Start Hobby
            </a>
          </div>

          {/* Creator - Most Popular */}
          <div className="bg-[#111111] p-8 rounded-2xl border-2 border-[#3B82F6] relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#3B82F6] text-white text-xs font-semibold px-3 py-1 rounded-full">
              Most popular
            </div>
            {isAnnual && (
              <div className="text-xs font-semibold text-[#3B82F6] mb-2">Save 28%</div>
            )}
            <h3 className="text-xl md:text-2xl font-bold text-white">Creator</h3>
            <div className="text-xl md:text-2xl md:text-4xl font-bold text-white my-4">
              ${isAnnual ? '23' : '32'}
              <span className="text-lg text-[#A0A0A0]">/mo</span>
            </div>
            {isAnnual && (
              <div className="text-xs text-[#A0A0A0] mb-4">billed annually</div>
            )}
            <ul className="space-y-3 mb-8">
              <li className="text-sm text-[#A0A0A0]">30 hours per month</li>
              <li className="text-sm text-[#A0A0A0]">Up to 4K quality</li>
              <li className="text-sm text-[#A0A0A0]">Priority processing</li>
            </ul>
            <a href="https://buy.stripe.com/5kQfZ95at6HHaj41p3ebu0e" className="block w-full py-3 text-center bg-[#3B82F6] text-white rounded-lg hover:bg-[#2563EB] transition-colors">
              Start Creator
            </a>
          </div>

          {/* Business */}
          <div className="bg-[#111111] p-8 rounded-2xl border border-[#1F1F1F]">
            {isAnnual && (
              <div className="text-xs font-semibold text-[#3B82F6] mb-2">Save 18%</div>
            )}
            <h3 className="text-xl md:text-2xl font-bold text-white">Business</h3>
            <div className="text-xl md:text-2xl md:text-4xl font-bold text-white my-4">
              ${isAnnual ? '49' : '60'}
              <span className="text-lg text-[#A0A0A0]">/mo</span>
            </div>
            {isAnnual && (
              <div className="text-xs text-[#A0A0A0] mb-4">billed annually</div>
            )}
            <ul className="space-y-3 mb-8">
              <li className="text-sm text-[#A0A0A0]">40 hours per month</li>
              <li className="text-sm text-[#A0A0A0]">Up to 4K quality</li>
              <li className="text-sm text-[#A0A0A0]">Dedicated support</li>
            </ul>
            <a href="https://buy.stripe.com/9B6aEPauN4zz2QCgjXebu0f" className="block w-full py-3 text-center bg-[#3B82F6] text-white rounded-lg hover:bg-[#2563EB] transition-colors">
              Start Business
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
