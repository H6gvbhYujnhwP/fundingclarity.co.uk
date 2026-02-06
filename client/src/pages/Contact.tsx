/**
 * DESIGN: "Dark Authority" — Contact / Get Funding Clarity page
 * Calm, confident CTA with a simple form — now connected to backend
 */

import { useState } from "react";
import { ArrowRight, MessageCircle, Mail, Send, Loader2 } from "lucide-react";
import SectionReveal from "@/components/SectionReveal";
import GoldLine from "@/components/GoldLine";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

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
        source: "contact",
      });
      setSubmitted(true);
    } catch {
      toast.error("Something went wrong. Please try again or email us directly at hello@fundingclarity.co.uk");
    }
  };

  return (
    <div className="min-h-screen pt-20 lg:pt-24">
      {/* Page Hero */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <SectionReveal>
            <span className="text-xs uppercase tracking-[0.3em] text-gold-dim mb-6 block" style={{ fontFamily: "var(--font-mono)" }}>
              Get In Touch
            </span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-tight mb-8 max-w-4xl" style={{ fontFamily: "var(--font-display)" }}>
              Ready to stop <span className="text-gold">guessing?</span>
            </h1>
            <p className="text-xl text-warm-white/60 max-w-2xl leading-relaxed">
              No pressure. No sales pitch. Just a straightforward conversation with
              a fellow founder who gets it.
            </p>
          </SectionReveal>
        </div>
      </section>

      <GoldLine className="container" />

      {/* Form + Info */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Form */}
            <SectionReveal>
              {!submitted ? (
                <div>
                  <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>
                    Request a Quote
                  </h2>
                  <p className="text-warm-white/50 mb-8">
                    Tell us a little about your business and we'll come back to you with
                    an honest assessment.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm text-warm-white/60 mb-2" style={{ fontFamily: "var(--font-display)" }}>
                        Your name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-dark-elevated border border-white/10 rounded-sm px-4 py-3 text-warm-white placeholder:text-warm-white/20 focus:border-gold/40 focus:outline-none transition-colors"
                        placeholder="Jane Smith"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-warm-white/60 mb-2" style={{ fontFamily: "var(--font-display)" }}>
                        Email address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-dark-elevated border border-white/10 rounded-sm px-4 py-3 text-warm-white placeholder:text-warm-white/20 focus:border-gold/40 focus:outline-none transition-colors"
                        placeholder="jane@yourcompany.co.uk"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-warm-white/60 mb-2" style={{ fontFamily: "var(--font-display)" }}>
                        Company name
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full bg-dark-elevated border border-white/10 rounded-sm px-4 py-3 text-warm-white placeholder:text-warm-white/20 focus:border-gold/40 focus:outline-none transition-colors"
                        placeholder="Your Company Ltd"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-warm-white/60 mb-2" style={{ fontFamily: "var(--font-display)" }}>
                        Tell us about your funding needs
                      </label>
                      <textarea
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-dark-elevated border border-white/10 rounded-sm px-4 py-3 text-warm-white placeholder:text-warm-white/20 focus:border-gold/40 focus:outline-none transition-colors resize-none"
                        placeholder="What are you looking to fund? How much do you need? Any context that helps us understand your situation."
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={leadMutation.isPending}
                      className="inline-flex items-center gap-3 px-8 py-4 bg-gold text-dark font-semibold rounded-sm gold-glow hover:bg-gold-bright transition-all duration-300 w-full sm:w-auto justify-center disabled:opacity-50"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {leadMutation.isPending ? (
                        <Loader2 size={18} className="animate-spin" />
                      ) : (
                        <>
                          Send Message
                          <Send size={18} />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              ) : (
                <div className="glass-card p-10 lg:p-16 rounded-sm text-center">
                  <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
                    <Mail size={28} className="text-gold" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "var(--font-display)" }}>
                    Message received.
                  </h2>
                  <p className="text-warm-white/60 leading-relaxed max-w-md mx-auto">
                    Thank you for getting in touch. A real person — not a bot — will read
                    your message and respond personally. We typically reply within one
                    working day.
                  </p>
                </div>
              )}
            </SectionReveal>

            {/* Info sidebar */}
            <SectionReveal delay={0.2}>
              <div className="lg:sticky lg:top-28 space-y-10">
                {/* Quick actions */}
                <div className="glass-card p-8 rounded-sm">
                  <h3 className="text-lg font-semibold mb-4" style={{ fontFamily: "var(--font-display)" }}>
                    Other ways to connect
                  </h3>
                  <div className="space-y-3">
                    <a
                      href="/quiz"
                      className="flex items-center gap-3 text-sm text-warm-white/60 hover:text-gold transition-colors p-3 glass-card rounded-sm"
                    >
                      <ArrowRight size={16} className="text-gold shrink-0" />
                      <div>
                        <span className="text-warm-white font-medium block">Take the Funding Quiz</span>
                        <span className="text-warm-white/40 text-xs">2 minutes. Get a personalised assessment.</span>
                      </div>
                    </a>
                    <a
                      href="/booking"
                      className="flex items-center gap-3 text-sm text-warm-white/60 hover:text-gold transition-colors p-3 glass-card rounded-sm"
                    >
                      <ArrowRight size={16} className="text-gold shrink-0" />
                      <div>
                        <span className="text-warm-white font-medium block">Book a Clarity Call</span>
                        <span className="text-warm-white/40 text-xs">15 minutes. Free. No obligation.</span>
                      </div>
                    </a>
                    <a
                      href="/guide"
                      className="flex items-center gap-3 text-sm text-warm-white/60 hover:text-gold transition-colors p-3 glass-card rounded-sm"
                    >
                      <ArrowRight size={16} className="text-gold shrink-0" />
                      <div>
                        <span className="text-warm-white font-medium block">Download the Free Guide</span>
                        <span className="text-warm-white/40 text-xs">The 4 questions every founder should answer.</span>
                      </div>
                    </a>
                  </div>
                </div>

                {/* DM Option */}
                <div className="glass-card p-8 rounded-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <MessageCircle size={20} className="text-gold" />
                    <h3 className="text-lg font-semibold" style={{ fontFamily: "var(--font-display)" }}>
                      Prefer a DM?
                    </h3>
                  </div>
                  <p className="text-warm-white/60 leading-relaxed mb-6">
                    Send us a direct message on social media. Same founders, same honesty, less formal.
                  </p>
                  <div className="space-y-3">
                    <a
                      href="#"
                      onClick={(e) => { e.preventDefault(); toast.info("LinkedIn link coming soon — add your profile URL in settings."); }}
                      className="flex items-center gap-3 text-sm text-warm-white/50 hover:text-gold transition-colors"
                    >
                      <span className="w-8 h-8 rounded-sm bg-dark-elevated flex items-center justify-center">
                        <span className="text-xs font-bold" style={{ fontFamily: "var(--font-mono)" }}>Li</span>
                      </span>
                      LinkedIn
                    </a>
                    <a
                      href="#"
                      onClick={(e) => { e.preventDefault(); toast.info("X link coming soon — add your profile URL in settings."); }}
                      className="flex items-center gap-3 text-sm text-warm-white/50 hover:text-gold transition-colors"
                    >
                      <span className="w-8 h-8 rounded-sm bg-dark-elevated flex items-center justify-center">
                        <span className="text-xs font-bold" style={{ fontFamily: "var(--font-mono)" }}>X</span>
                      </span>
                      X (Twitter)
                    </a>
                  </div>
                </div>

                {/* What to expect */}
                <div>
                  <h3 className="text-sm uppercase tracking-[0.2em] text-gold-dim mb-6" style={{ fontFamily: "var(--font-mono)" }}>
                    What to Expect
                  </h3>
                  <div className="space-y-5">
                    {[
                      { title: "A real response", desc: "From a founder, not a sales team. We read every message personally." },
                      { title: "Within one working day", desc: "Usually much faster. We know you're busy." },
                      { title: "Honest assessment", desc: "We'll tell you where you stand — even if the answer isn't what you hoped." },
                      { title: "No obligation", desc: "The initial conversation is free and carries no commitment whatsoever." },
                    ].map((item, i) => (
                      <div key={i} className="border-l border-gold/20 pl-4">
                        <h4 className="text-warm-white font-semibold text-sm mb-1" style={{ fontFamily: "var(--font-display)" }}>
                          {item.title}
                        </h4>
                        <p className="text-warm-white/50 text-sm">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reassurance */}
                <div className="border-t border-white/5 pt-8">
                  <p className="text-warm-white/30 text-sm italic" style={{ fontFamily: "var(--font-body)" }}>
                    "We built Funding Clarity because we wished it existed when we needed
                    it. Every conversation we have is one we would have wanted someone to
                    have with us."
                  </p>
                  <p className="text-gold-dim text-xs mt-3" style={{ fontFamily: "var(--font-mono)" }}>
                    — The Founders
                  </p>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
