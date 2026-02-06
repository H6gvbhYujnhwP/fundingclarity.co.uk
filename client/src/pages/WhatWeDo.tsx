/**
 * DESIGN: "Dark Authority" — What We Do page
 * Deep dive into the 4-question framework
 */

import { Link } from "wouter";
import { ArrowRight, Search, Clock, PoundSterling, Users } from "lucide-react";
import SectionReveal from "@/components/SectionReveal";
import GoldLine from "@/components/GoldLine";

const FRAMEWORK_IMG = "https://private-us-east-1.manuscdn.com/sessionFile/Tl0cdcrJhuXUKXtl4z7ePw/sandbox/aWOv8CFwd5NZqyPIUBcdgf-img-3_1770386053000_na1fn_ZnJhbWV3b3JrLWFic3RyYWN0.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvVGwwY2RjckpodVhVS1h0bDR6N2VQdy9zYW5kYm94L2FXT3Y4Q0Z3ZDVOWnF5UElVQmNkZ2YtaW1nLTNfMTc3MDM4NjA1MzAwMF9uYTFmbl9abkpoYldWM2IzSnJMV0ZpYzNSeVlXTjAuanBnP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=NppkdQzXXlvQcqnvqx1I7F-XhFgpqvEkBmbVav80nrlEalC0JVxTfUHi6BKOTne4G3FMbwGPcWoit2J0qa6-5fjACJhHtO8D4k893zukHeGn-z0ljQ4gLcmbwFrj2SEXPZXAclFO3QfagZ1xZnBUDpEPR80D0Kd7zyyR0H6~2hodcCv3fnHFVv1M0muB8nLSqwZz5Jy9D9QxcbSt-zVJm1cxD-kIkpoRzNUHRVqsF4Iza2JjnTOy0Z1fNcul0Eh3K2jef3-whPUNRVkNr8i3HO5L~3E-lN-OmIBCrC00rVVheXxSxhplpn0S~1N5lScoCVNCzhWyXMebf2L7bqclsw__";

const questions = [
  {
    icon: Search,
    num: "01",
    question: "What funding fits?",
    answer: "Not all finance is created equal. Invoice finance, term loans, asset finance, revolving credit, merchant cash advances — each has a specific use case, and choosing the wrong one is one of the most common reasons applications fail.",
    detail: "We analyse your business model, cash flow patterns, and growth plans to match you with the exact type of funding that fits your situation. No guesswork. No generic recommendations.",
  },
  {
    icon: Clock,
    num: "02",
    question: "When should you apply?",
    answer: "Timing can make or break a funding application. Apply during a weak trading month and your numbers tell the wrong story. Apply too early in your business lifecycle and you won't meet the criteria.",
    detail: "We assess your financial calendar, trading patterns, and lender timelines to identify the optimal window for your application — when your business looks its strongest on paper.",
  },
  {
    icon: PoundSterling,
    num: "03",
    question: "How much is realistic?",
    answer: "There's a number that's too high (and gets you declined) and a number that's too low (and doesn't solve your problem). The right amount sits in a sweet spot that's justified by your financials and your plan.",
    detail: "We calculate a realistic funding range based on your turnover, profitability, existing commitments, and the specific product you're applying for. You'll know exactly what to ask for — and why.",
  },
  {
    icon: Users,
    num: "04",
    question: "Who is most likely to say yes?",
    answer: "There are hundreds of lenders in the UK market, each with different appetites, criteria, and specialisms. The right lender for a restaurant is not the right lender for a logistics company.",
    detail: "We match your business profile to lenders who are actively funding businesses like yours. Not a scattergun approach — a targeted, informed recommendation based on real market knowledge.",
  },
];

export default function WhatWeDo() {
  return (
    <div className="min-h-screen pt-20 lg:pt-24">
      {/* Page Hero */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]">
          <img src={FRAMEWORK_IMG} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="container relative z-10">
          <SectionReveal>
            <span className="text-xs uppercase tracking-[0.3em] text-gold-dim mb-6 block" style={{ fontFamily: "var(--font-mono)" }}>
              What We Do
            </span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-tight mb-8 max-w-4xl" style={{ fontFamily: "var(--font-display)" }}>
              Four questions. <span className="text-gold">Complete clarity.</span>
            </h1>
            <p className="text-xl text-warm-white/60 max-w-2xl leading-relaxed">
              Before you fill in a single form or run a single credit check, we answer
              the four questions that determine whether your application succeeds or fails.
            </p>
          </SectionReveal>
        </div>
      </section>

      <GoldLine className="container" />

      {/* The Framework */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <SectionReveal>
            <div className="max-w-3xl mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{ fontFamily: "var(--font-display)" }}>
                The 4-question funding framework.
              </h2>
              <p className="text-warm-white/60 leading-relaxed text-lg">
                Most founders go into funding applications blind — hoping for the best,
                preparing for the worst. Our framework replaces hope with knowledge.
              </p>
            </div>
          </SectionReveal>

          <div className="space-y-12 lg:space-y-16">
            {questions.map((q, i) => (
              <SectionReveal key={i} delay={0.1}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
                  <div className="lg:col-span-1">
                    <span className="text-5xl font-bold text-gold/20 block" style={{ fontFamily: "var(--font-mono)" }}>
                      {q.num}
                    </span>
                  </div>
                  <div className="lg:col-span-11">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 rounded-sm bg-gold/10 flex items-center justify-center">
                        <q.icon size={18} className="text-gold" />
                      </div>
                      <h3 className="text-2xl font-bold text-gold" style={{ fontFamily: "var(--font-display)" }}>
                        {q.question}
                      </h3>
                    </div>
                    <div className="space-y-4 text-warm-white/70 leading-relaxed text-lg pl-14">
                      <p>{q.answer}</p>
                      <p className="text-warm-white/50">{q.detail}</p>
                    </div>
                  </div>
                </div>
                {i < questions.length - 1 && <GoldLine className="mt-12 lg:mt-16" />}
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* What This Means */}
      <section className="py-20 lg:py-28 border-t border-white/5">
        <div className="container">
          <SectionReveal>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{ fontFamily: "var(--font-display)" }}>
                What this means for you.
              </h2>
              <p className="text-lg text-warm-white/60 leading-relaxed mb-10">
                You walk into every funding conversation knowing exactly where you stand.
                No surprises. No wasted applications. No guesswork. Just a clear, honest
                plan built around your specific business.
              </p>
              <Link href="/contact">
                <span className="inline-flex items-center gap-3 px-8 py-4 bg-gold text-dark font-semibold rounded-sm gold-glow hover:bg-gold-bright transition-all duration-300" style={{ fontFamily: "var(--font-display)" }}>
                  Get Your Funding Plan <ArrowRight size={18} />
                </span>
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
