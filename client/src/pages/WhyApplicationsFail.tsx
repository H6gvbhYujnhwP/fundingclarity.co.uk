/**
 * DESIGN: "Dark Authority" — Why Applications Fail page
 * Alternating dark/white/gold sections
 */

import { Link } from "wouter";
import { ArrowRight, AlertTriangle, Lightbulb } from "lucide-react";
import SectionReveal from "@/components/SectionReveal";

const reasons = [
  {
    title: "Wrong lender for your business type",
    explanation: "Every lender has a specific appetite. A tech startup and a construction firm need entirely different funders. Applying to the wrong one is an automatic no — regardless of how strong your business is.",
  },
  {
    title: "Poor timing",
    explanation: "Applying during your weakest trading months, right after a dip in revenue, or too close to year-end can sink an otherwise strong application. Timing isn't everything — but it's close.",
  },
  {
    title: "Asking for the wrong amount",
    explanation: "Too much and you look unrealistic. Too little and lenders question whether you understand your own needs. The right number has to be justified, realistic, and aligned with your financials.",
  },
  {
    title: "Incomplete or unclear financials",
    explanation: "Lenders make decisions based on data. If your accounts are messy, your projections are vague, or your management information is missing, you're making it easy for them to say no.",
  },
  {
    title: "No clear use of funds",
    explanation: "\"Growth\" isn't a plan. Lenders want to see exactly how the money will be used, what return it will generate, and how it will be repaid. Specificity wins.",
  },
  {
    title: "Applying for the wrong product",
    explanation: "A term loan when you need invoice finance. An overdraft when you need asset finance. Choosing the wrong product is one of the most common — and most avoidable — mistakes.",
  },
];

export default function WhyApplicationsFail() {
  return (
    <div className="min-h-screen pt-20 lg:pt-24">
      {/* Page Hero — DARK */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <SectionReveal>
            <span className="text-xs uppercase tracking-[0.3em] text-gold-dim mb-6 block" style={{ fontFamily: "var(--font-mono)" }}>
              The Truth About Funding
            </span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-tight mb-8 max-w-4xl" style={{ fontFamily: "var(--font-display)" }}>
              It's not you. <span className="text-gold">It's the system.</span>
            </h1>
            <p className="text-xl text-warm-white/60 max-w-2xl leading-relaxed">
              Most funding applications fail for structural reasons — not because your
              business isn't good enough. Understanding why changes everything.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Context — WHITE */}
      <section className="section-light py-20 lg:py-28">
        <div className="container">
          <div className="max-w-3xl">
            <SectionReveal>
              <div className="space-y-6 text-dark/70 leading-relaxed text-lg">
                <p>
                  If you've been rejected for funding, the first thing to know is this: you're
                  not alone. Nearly half of all SME funding applications in the UK are declined.
                  And the vast majority of those rejections have nothing to do with the quality
                  of the business.
                </p>
                <p>
                  Lenders operate within rigid criteria. They use automated scoring systems.
                  They have very little time — or incentive — to understand the full story
                  behind the numbers. A strong business can be declined simply because it
                  applied to the wrong lender, at the wrong time, for the wrong product.
                </p>
                <p>
                  That's not a failure on your part. That's a failure of the system. And it's
                  exactly the problem we exist to solve.
                </p>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Reasons — DARK */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <SectionReveal>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-display)" }}>
              The six most common reasons applications fail.
            </h2>
            <p className="text-warm-white/50 mb-16 max-w-2xl">
              None of these are about your business being bad. All of them are avoidable
              with the right guidance.
            </p>
          </SectionReveal>

          <div className="space-y-6">
            {reasons.map((reason, i) => (
              <SectionReveal key={i} delay={i * 0.1}>
                <div className="glass-card p-8 lg:p-10 rounded-sm group hover:border-gold/20 transition-all duration-500">
                  <div className="flex items-start gap-5">
                    <div className="shrink-0 w-10 h-10 rounded-sm bg-red-500/10 flex items-center justify-center group-hover:bg-gold/10 transition-colors duration-500">
                      <AlertTriangle size={18} className="text-red-400/60 group-hover:text-gold transition-colors duration-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-warm-white mb-3" style={{ fontFamily: "var(--font-display)" }}>
                        {reason.title}
                      </h3>
                      <p className="text-warm-white/60 leading-relaxed">
                        {reason.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* The Better Way — GOLD */}
      <section className="section-gold py-20 lg:py-28">
        <div className="container">
          <SectionReveal>
            <div className="bg-white/80 backdrop-blur-md border border-dark/10 p-10 lg:p-16 rounded-sm max-w-4xl mx-auto shadow-lg">
              <div className="flex items-start gap-5">
                <div className="shrink-0 w-12 h-12 rounded-sm bg-gold/20 flex items-center justify-center">
                  <Lightbulb size={22} className="text-dark" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-dark mb-4" style={{ fontFamily: "var(--font-display)" }}>
                    There's a better way.
                  </h3>
                  <div className="space-y-4 text-dark/70 leading-relaxed">
                    <p>
                      Every single one of these failure points is avoidable — if you have the
                      right information before you apply. That's exactly what we provide.
                    </p>
                    <p>
                      We don't just tell you if you'll be approved. We explain the why behind
                      the decision, so you can build a stronger case — whether that's now or
                      in three months' time.
                    </p>
                  </div>
                  <div className="mt-8">
                    <Link href="/contact">
                      <span className="inline-flex items-center gap-3 px-8 py-4 bg-dark text-warm-white font-semibold rounded-sm hover:bg-dark-elevated transition-all duration-300 shadow-lg" style={{ fontFamily: "var(--font-display)" }}>
                        Get Your Funding Plan <ArrowRight size={18} />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
