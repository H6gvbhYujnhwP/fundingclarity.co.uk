/**
 * DESIGN: "Dark Authority" — How It Works page
 * Alternating dark/white/gold sections
 */

import { Link } from "wouter";
import { ArrowRight, MessageCircle, Clock, Shield, Target } from "lucide-react";
import SectionReveal from "@/components/SectionReveal";

export default function HowItWorks() {
  return (
    <div className="min-h-screen pt-20 lg:pt-24">
      {/* Page Hero — DARK */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <SectionReveal>
            <span className="text-xs uppercase tracking-[0.3em] text-gold-dim mb-6 block" style={{ fontFamily: "var(--font-mono)" }}>
              How It Works
            </span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-tight mb-8 max-w-4xl" style={{ fontFamily: "var(--font-display)" }}>
              Simple. Honest. <span className="text-gold">Fast.</span>
            </h1>
            <p className="text-xl text-warm-white/60 max-w-2xl leading-relaxed">
              Three steps to funding clarity. No paperwork upfront. No commitment. No pressure.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Step 1 — WHITE */}
      <section className="section-light py-20 lg:py-28">
        <div className="container">
          <SectionReveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
              <div className="lg:col-span-2">
                <span className="text-8xl lg:text-9xl font-bold text-gold/30 block" style={{ fontFamily: "var(--font-mono)" }}>
                  01
                </span>
              </div>
              <div className="lg:col-span-10">
                <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-dark" style={{ fontFamily: "var(--font-display)" }}>
                  Tell us your story.
                </h2>
                <div className="space-y-5 text-dark/70 leading-relaxed text-lg max-w-3xl">
                  <p>
                    Get in touch via our contact form or send us a direct message. Share a few
                    simple details about your business — what you do, how long you've been trading,
                    and what you're looking to fund.
                  </p>
                  <p>
                    This isn't an application. There's no credit check. No paperwork. It's a
                    conversation — founder to founder — to understand where you are and where
                    you want to go.
                  </p>
                </div>
                <div className="mt-8 flex flex-wrap gap-6">
                  {[
                    { icon: Clock, label: "Takes 5 minutes" },
                    { icon: Shield, label: "No credit check" },
                    { icon: MessageCircle, label: "Real person responds" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-dark/50">
                      <item.icon size={16} className="text-gold" />
                      {item.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Step 2 — DARK */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <SectionReveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
              <div className="lg:col-span-2">
                <span className="text-8xl lg:text-9xl font-bold text-gold/15 block" style={{ fontFamily: "var(--font-mono)" }}>
                  02
                </span>
              </div>
              <div className="lg:col-span-10">
                <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{ fontFamily: "var(--font-display)" }}>
                  Get your 4-question funding plan.
                </h2>
                <div className="space-y-5 text-warm-white/70 leading-relaxed text-lg max-w-3xl">
                  <p>
                    We analyse your situation and give you clear, honest answers to the four
                    questions that matter most:
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 max-w-3xl">
                  {[
                    { q: "What funding fits?", a: "The right product for your situation" },
                    { q: "When should you apply?", a: "The optimal timing for success" },
                    { q: "How much is realistic?", a: "An honest, achievable number" },
                    { q: "Who will say yes?", a: "Lenders matched to your profile" },
                  ].map((item, i) => (
                    <div key={i} className="glass-card p-6 rounded-sm">
                      <h4 className="text-gold font-semibold text-sm mb-2" style={{ fontFamily: "var(--font-display)" }}>
                        {item.q}
                      </h4>
                      <p className="text-warm-white/50 text-sm">{item.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Step 3 — WHITE */}
      <section className="section-light py-20 lg:py-28">
        <div className="container">
          <SectionReveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
              <div className="lg:col-span-2">
                <span className="text-8xl lg:text-9xl font-bold text-gold/30 block" style={{ fontFamily: "var(--font-mono)" }}>
                  03
                </span>
              </div>
              <div className="lg:col-span-10">
                <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-dark" style={{ fontFamily: "var(--font-display)" }}>
                  Decide your next move.
                </h2>
                <div className="space-y-5 text-dark/70 leading-relaxed text-lg max-w-3xl">
                  <p>
                    Armed with clarity, you choose the best path forward. That might mean
                    applying to a recommended lender straight away. It might mean strengthening
                    your position first and applying in three months.
                  </p>
                  <p>
                    Either way, you'll know exactly where you stand — and you'll have a clear
                    plan for what to do next. The choice is always yours.
                  </p>
                  <p className="text-dark font-medium" style={{ fontFamily: "var(--font-display)" }}>
                    No pressure. No obligation. Just clarity.
                  </p>
                </div>
                <div className="mt-8 flex items-center gap-3 text-sm text-dark/50">
                  <Target size={16} className="text-gold" />
                  Your decision. Your timeline. Your business.
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* CTA — GOLD */}
      <section className="section-gold py-20 lg:py-28">
        <div className="container">
          <SectionReveal>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-dark" style={{ fontFamily: "var(--font-display)" }}>
                Ready to take the first step?
              </h2>
              <p className="text-lg text-dark/70 mb-10">
                It starts with a simple conversation. No forms, no fees, no commitment.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <span className="inline-flex items-center gap-3 px-8 py-4 bg-dark text-warm-white font-semibold rounded-sm hover:bg-dark-elevated transition-all duration-300 shadow-lg" style={{ fontFamily: "var(--font-display)" }}>
                    Get Funding Clarity <ArrowRight size={18} />
                  </span>
                </Link>
                <Link href="/contact">
                  <span className="inline-flex items-center gap-3 px-8 py-4 border-2 border-dark/30 text-dark font-medium rounded-sm hover:border-dark hover:bg-dark/5 transition-all duration-300" style={{ fontFamily: "var(--font-display)" }}>
                    <MessageCircle size={18} /> Send a DM
                  </span>
                </Link>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
