/**
 * DESIGN: "Dark Authority" — Cinematic Impact
 * About / Our Story page — alternating dark/white/gold sections
 */

import { Link } from "wouter";
import { ArrowRight, Quote } from "lucide-react";
import SectionReveal from "@/components/SectionReveal";

const FOUNDER_IMG = "https://private-us-east-1.manuscdn.com/sessionFile/Tl0cdcrJhuXUKXtl4z7ePw/sandbox/aWOv8CFwd5NZqyPIUBcdgf-img-2_1770386059000_na1fn_Zm91bmRlci1zdG9yeQ.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvVGwwY2RjckpodVhVS1h0bDR6N2VQdy9zYW5kYm94L2FXT3Y4Q0Z3ZDVOWnF5UElVQmNkZ2YtaW1nLTJfMTc3MDM4NjA1OTAwMF9uYTFmbl9abTkxYm1SbGNpMXpkRzl5ZVEuanBnP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=hAXmlFC-zOP0kvhgEb1Adrgh4-gBuO-nWfkhgZIFyMf7WHZh04SgH82ZQGi3b1KJdu-gBn-hPgw7Pj1b~7FplhrMpDxk64qQxr8G1D0kF6ydq2g5Y79ZJCS79BQ-tsEElIn2NItEcyzxEphwo1ijRWPSw2jGYO~6ooXObo1ZiArsa18nfd5LmzNjrnxjYykSKEBoqwijC8F3dwccBhjZAr-~VC3ERYomeYtCYNjBbTfzlavDOin2YeNYX5fItrKXfsGXuJYCEYuDLCdPKM1p3Cx7qh2y6IIPzsKYiP~-ujlY9Up1fSvKSnZH14L1fwM5nSS7bG5d9P5SJ2efjsA6fQ__";

export default function About() {
  return (
    <div className="min-h-screen pt-20 lg:pt-24">
      {/* Page Hero — DARK */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <SectionReveal>
            <span
              className="text-xs uppercase tracking-[0.3em] text-gold-dim mb-6 block"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Our Story
            </span>
            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-tight mb-8 max-w-4xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              We didn't set out to build a <span className="text-gold">finance company.</span>
            </h1>
            <p className="text-xl text-warm-white/60 max-w-2xl leading-relaxed">
              We set out to solve a problem we lived through ourselves.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* The Full Story — WHITE */}
      <section className="section-light py-20 lg:py-28">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-24">
            {/* Narrative */}
            <div className="lg:col-span-3">
              <SectionReveal>
                <div className="space-y-6 text-dark/70 leading-relaxed text-lg">
                  <p>
                    A few years ago, we were running a profitable business. Revenue was growing.
                    The team was expanding. We had a clear plan for the next stage of growth and
                    needed funding to get there.
                  </p>
                  <p>
                    We went to our bank first — the obvious choice. We'd been customers for years.
                    We had clean accounts, strong margins, and a straightforward ask. We expected a
                    conversation. What we got was a form, a wait, and eventually, a no.
                  </p>
                  <p>
                    No explanation. No alternative. No "here's what you could do differently." Just
                    a flat rejection and a suggestion to "try again in six months."
                  </p>
                </div>
              </SectionReveal>

              <SectionReveal className="mt-12">
                <div className="border-l-2 border-gold/50 pl-8 py-4">
                  <Quote size={24} className="text-gold-dim mb-4" />
                  <p className="text-2xl text-dark leading-relaxed italic" style={{ fontFamily: "var(--font-body)" }}>
                    "We sat in that meeting room wondering — if we can't get funded with a profitable
                    business and a solid plan, what chance does anyone else have?"
                  </p>
                </div>
              </SectionReveal>

              <SectionReveal className="mt-12">
                <div className="space-y-6 text-dark/70 leading-relaxed text-lg">
                  <p>
                    So we started digging. We spoke to other founders. We spoke to brokers. We spoke
                    to lenders directly. And we discovered something that changed everything: the
                    system isn't designed to help you succeed. It's designed to process you.
                  </p>
                  <p>
                    Most founders apply to the wrong lender, for the wrong product, at the wrong time.
                    Not because they're doing anything wrong — but because nobody tells them what right
                    looks like.
                  </p>
                  <p className="text-dark text-xl font-medium" style={{ fontFamily: "var(--font-display)" }}>
                    That's the gap we decided to fill.
                  </p>
                  <p>
                    Funding Clarity exists to answer the questions that nobody else will answer before
                    you apply. What funding fits your business. When the timing is right. How much you
                    can realistically get. And who is most likely to say yes.
                  </p>
                  <p>
                    We're not a bank. We're not a broker trying to earn commission on volume. We're
                    founders who've been exactly where you are — and we built the service we wished
                    had existed when we needed it.
                  </p>
                </div>
              </SectionReveal>
            </div>

            {/* Sidebar image + values */}
            <div className="lg:col-span-2">
              <SectionReveal delay={0.2}>
                <div className="sticky top-28">
                  <div className="aspect-[3/4] overflow-hidden rounded-sm mb-8 shadow-xl">
                    <img
                      src={FOUNDER_IMG}
                      alt="Founders of Funding Clarity"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-6">
                    <h3
                      className="text-sm uppercase tracking-[0.2em] text-gold-dim"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      What We Stand For
                    </h3>
                    {[
                      { title: "Honesty", desc: "We tell you what you need to hear, not what you want to hear." },
                      { title: "Clarity", desc: "Plain English. No jargon. No small print." },
                      { title: "Respect", desc: "Your time matters. We don't waste it." },
                    ].map((value, i) => (
                      <div key={i} className="border-l border-gold/30 pl-4">
                        <h4 className="text-dark font-semibold text-sm mb-1" style={{ fontFamily: "var(--font-display)" }}>
                          {value.title}
                        </h4>
                        <p className="text-dark/60 text-sm">{value.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </SectionReveal>
            </div>
          </div>
        </div>
      </section>

      {/* CTA — GOLD */}
      <section className="section-gold py-20 lg:py-28">
        <div className="container">
          <SectionReveal>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-dark" style={{ fontFamily: "var(--font-display)" }}>
                Sound familiar?
              </h2>
              <p className="text-lg text-dark/70 mb-10">
                If our story resonates, let's talk. We built this for founders like you.
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
