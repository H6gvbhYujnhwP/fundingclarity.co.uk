/**
 * DESIGN: "Dark Authority" — Who Is This For page
 * Alternating dark/white/gold sections
 */

import { Link } from "wouter";
import { ArrowRight, CheckCircle, XCircle } from "lucide-react";
import SectionReveal from "@/components/SectionReveal";

const forYou = [
  {
    title: "UK-based SME founders and directors",
    desc: "Whether you're a sole trader, partnership, or limited company — if you're running a real business in the UK, we can help.",
  },
  {
    title: "Founders who've been declined by banks",
    desc: "A bank rejection doesn't mean your business is unfundable. It usually means you applied to the wrong place. We'll find the right one.",
  },
  {
    title: "Time-poor business owners",
    desc: "You don't have weeks to waste on applications that go nowhere. We give you clarity upfront so you only apply when the odds are in your favour.",
  },
  {
    title: "Directors who value honesty over hype",
    desc: "We won't promise you the moon. We'll tell you what's realistic, what's achievable, and what your genuine options are.",
  },
  {
    title: "Businesses at a growth inflection point",
    desc: "You've proven the model. Now you need capital to scale. We help you access it without the guesswork.",
  },
];

const notForYou = [
  {
    title: "Get-rich-quick seekers",
    desc: "If you're looking for a shortcut or a scheme, we're not the right fit. We work with real businesses building real value.",
  },
  {
    title: "Those who can't handle honest feedback",
    desc: "We tell you what you need to hear, not what you want to hear. If your business isn't ready for funding, we'll say so — and explain what to fix.",
  },
  {
    title: "Founders who want reassurance, not reality",
    desc: "If you want someone to tell you everything is fine regardless of the facts, we're not that service.",
  },
];

export default function WhoIsThisFor() {
  return (
    <div className="min-h-screen pt-20 lg:pt-24">
      {/* Page Hero — DARK */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <SectionReveal>
            <span className="text-xs uppercase tracking-[0.3em] text-gold-dim mb-6 block" style={{ fontFamily: "var(--font-mono)" }}>
              Is This Right For You?
            </span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-tight mb-8 max-w-4xl" style={{ fontFamily: "var(--font-display)" }}>
              We're honest about who we <span className="text-gold">can help.</span>
            </h1>
            <p className="text-xl text-warm-white/60 max-w-2xl leading-relaxed">
              We'd rather be upfront now than waste your time later. Here's who
              we work best with — and who might be better served elsewhere.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* For You — WHITE */}
      <section className="section-light py-20 lg:py-28">
        <div className="container">
          <SectionReveal>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 flex items-center gap-4 text-dark" style={{ fontFamily: "var(--font-display)" }}>
              <CheckCircle size={28} className="text-gold" />
              This is for you if...
            </h2>
            <p className="text-dark/60 mb-12 max-w-2xl">
              If any of these describe your situation, we're well-placed to help.
            </p>
          </SectionReveal>

          <div className="space-y-5">
            {forYou.map((item, i) => (
              <SectionReveal key={i} delay={i * 0.1}>
                <div className="bg-white border border-dark/10 shadow-sm p-8 rounded-sm group hover:border-gold/40 transition-all duration-500">
                  <div className="flex items-start gap-5">
                    <span className="shrink-0 w-2 h-2 rounded-full bg-gold mt-3" />
                    <div>
                      <h3 className="text-lg font-semibold text-dark mb-2" style={{ fontFamily: "var(--font-display)" }}>
                        {item.title}
                      </h3>
                      <p className="text-dark/60 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Not For You — DARK */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <SectionReveal>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 flex items-center gap-4 text-warm-white/60" style={{ fontFamily: "var(--font-display)" }}>
              <XCircle size={28} className="text-warm-white/30" />
              Probably not for you if...
            </h2>
            <p className="text-warm-white/40 mb-12 max-w-2xl">
              No hard feelings. We'd rather be honest than waste your time.
            </p>
          </SectionReveal>

          <div className="space-y-5 max-w-3xl">
            {notForYou.map((item, i) => (
              <SectionReveal key={i} delay={i * 0.1}>
                <div className="glass-card p-8 rounded-sm border-white/[0.03]">
                  <div className="flex items-start gap-5">
                    <span className="shrink-0 w-2 h-2 rounded-full bg-warm-white/20 mt-3" />
                    <div>
                      <h3 className="text-lg font-semibold text-warm-white/50 mb-2" style={{ fontFamily: "var(--font-display)" }}>
                        {item.title}
                      </h3>
                      <p className="text-warm-white/40 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — GOLD */}
      <section className="section-gold py-20 lg:py-28">
        <div className="container">
          <SectionReveal>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-dark" style={{ fontFamily: "var(--font-display)" }}>
                See yourself in the first list?
              </h2>
              <p className="text-lg text-dark/70 mb-10">
                Then let's talk. We built Funding Clarity specifically for founders like you.
              </p>
              <Link href="/contact">
                <span className="inline-flex items-center gap-3 px-8 py-4 bg-dark text-warm-white font-semibold rounded-sm hover:bg-dark-elevated transition-all duration-300 shadow-lg" style={{ fontFamily: "var(--font-display)" }}>
                  Start a Conversation <ArrowRight size={18} />
                </span>
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
