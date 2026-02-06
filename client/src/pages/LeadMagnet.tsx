/**
 * Lead Magnet — Free guide download with email capture
 * "The 4 Questions Every SME Founder Should Answer Before Applying for Funding"
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, CheckCircle, Loader2, BookOpen } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import SectionReveal from "@/components/SectionReveal";
import GoldLine from "@/components/GoldLine";

const GUIDE_PDF_URL = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663048135071/NIHdNuqffjtFiJjV.pdf";

export default function LeadMagnet() {
  const [formData, setFormData] = useState({ name: "", email: "", company: "" });
  const [downloaded, setDownloaded] = useState(false);

  const leadMutation = trpc.lead.submit.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast.error("Please enter your name and email.");
      return;
    }

    try {
      await leadMutation.mutateAsync({
        name: formData.name,
        email: formData.email,
        company: formData.company || undefined,
        source: "lead_magnet",
      });
      setDownloaded(true);
      // Trigger download
      const link = document.createElement("a");
      link.href = GUIDE_PDF_URL;
      link.download = "FundingClarity-4-Questions-Guide.pdf";
      link.click();
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen pt-20 lg:pt-24">
      {/* Header */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <SectionReveal>
            <span
              className="text-xs uppercase tracking-[0.3em] text-gold-dim mb-6 block"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Free Guide
            </span>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              The 4 questions every SME founder should answer{" "}
              <span className="text-gold">before applying for funding.</span>
            </h1>
            <p className="text-lg text-warm-white/60 max-w-2xl leading-relaxed">
              A short, practical guide that saves you time, reduces stress, and
              dramatically improves your chances of getting funded.
            </p>
          </SectionReveal>
        </div>
      </section>

      <GoldLine className="container" />

      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* What's inside */}
            <SectionReveal>
              <h2
                className="text-2xl font-bold mb-6"
                style={{ fontFamily: "var(--font-display)" }}
              >
                What's inside
              </h2>
              <div className="space-y-4">
                {[
                  {
                    title: "Question 1: What funding fits?",
                    desc: "How to match your business to the right type of finance — and why most founders apply for the wrong product.",
                  },
                  {
                    title: "Question 2: When should you apply?",
                    desc: "The timing factors that lenders look at, and how to choose the moment that maximises your chances.",
                  },
                  {
                    title: "Question 3: How much is realistic?",
                    desc: "How to calculate a realistic funding amount that lenders will take seriously.",
                  },
                  {
                    title: "Question 4: Who is most likely to say yes?",
                    desc: "Why different lenders have different appetites, and how to find the ones looking for businesses like yours.",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="glass-card p-5 rounded-sm"
                  >
                    <h3 className="text-warm-white font-semibold mb-1" style={{ fontFamily: "var(--font-display)" }}>
                      {item.title}
                    </h3>
                    <p className="text-warm-white/50 text-sm leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 glass-card p-5 rounded-sm border-gold/10">
                <div className="flex items-start gap-3">
                  <BookOpen size={20} className="text-gold mt-0.5 shrink-0" />
                  <div>
                    <p className="text-warm-white font-medium text-sm">Quick read. Real value.</p>
                    <p className="text-warm-white/50 text-sm">
                      Written in plain English by founders who've been through it.
                      No jargon, no fluff. Just the information you actually need.
                    </p>
                  </div>
                </div>
              </div>
            </SectionReveal>

            {/* Download form */}
            <SectionReveal delay={0.2}>
              {!downloaded ? (
                <div className="glass-card p-8 lg:p-10 rounded-sm sticky top-28">
                  <div className="flex items-center gap-3 mb-6">
                    <Download size={24} className="text-gold" />
                    <h3
                      className="text-xl font-bold"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      Download the free guide
                    </h3>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="text-sm text-warm-white/60 mb-1 block">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-dark border border-white/10 rounded-sm px-4 py-3 text-warm-white placeholder:text-warm-white/30 focus:border-gold/40 focus:outline-none transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-warm-white/60 mb-1 block">Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-dark border border-white/10 rounded-sm px-4 py-3 text-warm-white placeholder:text-warm-white/30 focus:border-gold/40 focus:outline-none transition-colors"
                        placeholder="you@company.co.uk"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-warm-white/60 mb-1 block">Company</label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full bg-dark border border-white/10 rounded-sm px-4 py-3 text-warm-white placeholder:text-warm-white/30 focus:border-gold/40 focus:outline-none transition-colors"
                        placeholder="Your company"
                      />
                    </div>

                    <p className="text-xs text-warm-white/30">
                      We'll send you the guide and may follow up with helpful funding
                      insights. No spam. Unsubscribe anytime.
                    </p>

                    <button
                      type="submit"
                      disabled={leadMutation.isPending}
                      className="w-full px-6 py-4 bg-gold text-dark font-semibold rounded-sm gold-glow hover:bg-gold-bright transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {leadMutation.isPending ? (
                        <Loader2 size={18} className="animate-spin" />
                      ) : (
                        <>
                          <Download size={16} />
                          Download Free Guide
                        </>
                      )}
                    </button>
                  </form>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-card p-8 lg:p-10 rounded-sm text-center"
                >
                  <CheckCircle size={48} className="text-gold mx-auto mb-4" />
                  <h3
                    className="text-2xl font-bold mb-3"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Your guide is downloading.
                  </h3>
                  <p className="text-warm-white/60 mb-6">
                    If the download didn't start automatically,{" "}
                    <a
                      href={GUIDE_PDF_URL}
                      download="FundingClarity-4-Questions-Guide.pdf"
                      className="text-gold hover:text-gold-bright transition-colors underline"
                    >
                      click here
                    </a>
                    .
                  </p>
                  <div className="border-t border-white/10 pt-6">
                    <p className="text-warm-white/50 text-sm mb-4">
                      Want personalised advice based on your specific situation?
                    </p>
                    <a
                      href="/quiz"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-dark font-semibold rounded-sm gold-glow hover:bg-gold-bright transition-all duration-300"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      Take the Funding Quiz
                      <ArrowRight size={14} />
                    </a>
                  </div>
                </motion.div>
              )}
            </SectionReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
