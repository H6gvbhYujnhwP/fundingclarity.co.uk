import { motion } from "framer-motion";
import SectionReveal from "@/components/SectionReveal";
import { Shield, HandCoins, Scale } from "lucide-react";

/**
 * "How We Get Paid" transparency section — reusable across pages.
 * Explains the business model to build trust.
 */
export default function TransparencySection() {
  return (
    <section className="section-light py-20 lg:py-28">
      <div className="container">
        <SectionReveal>
          <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
            <span
              className="text-xs uppercase tracking-[0.3em] text-gold-dim mb-4 block"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Full Transparency
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 text-dark"
              style={{ fontFamily: "var(--font-display)" }}
            >
              How we <span className="text-gold-dim">get paid</span>
            </h2>
            <p className="text-lg text-dark/70 leading-relaxed">
              We believe you deserve to know exactly how our business works before
              you share a single detail about yours.
            </p>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {[
            {
              icon: HandCoins,
              title: "Commission from lenders",
              desc: "If you secure funding through one of our recommended lenders, we receive a commission from the lender — not from you. This means our advice costs you nothing.",
            },
            {
              icon: Shield,
              title: "No hidden fees",
              desc: "We will never charge you for a conversation, a quiz result, or a recommendation. If we can't help, we'll tell you honestly and point you in the right direction.",
            },
            {
              icon: Scale,
              title: "Aligned incentives",
              desc: "We only earn when you get funded successfully. That means our interests are aligned with yours — we want the best deal for you, not just any deal.",
            },
          ].map((item, i) => (
            <SectionReveal key={i} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                className="bg-white border border-dark/5 rounded-sm p-8 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-sm bg-gold/10 flex items-center justify-center mb-5">
                  <item.icon size={24} className="text-gold-dim" />
                </div>
                <h3
                  className="text-lg font-semibold text-dark mb-3"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {item.title}
                </h3>
                <p className="text-dark/60 leading-relaxed text-sm">{item.desc}</p>
              </motion.div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
