import { motion } from "framer-motion";
import SectionReveal from "@/components/SectionReveal";
import { Star, Quote } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Sarah Mitchell",
    role: "Managing Director",
    company: "Greenleaf Interiors Ltd",
    text: "We'd been turned down twice before we found Funding Clarity. They didn't just find us a lender — they helped us understand why we were being declined and what to fix. Secured £180k in three weeks.",
    rating: 5,
  },
  {
    name: "James Okonkwo",
    role: "Founder",
    company: "TechBridge Solutions",
    text: "As a first-time applicant, I had no idea where to start. The quiz gave me instant clarity, and the call with the team was genuinely helpful — no sales pressure, just honest advice. Highly recommend.",
    rating: 5,
  },
  {
    name: "Rachel Patel",
    role: "Operations Director",
    company: "Swift Logistics Group",
    text: "The transparency was refreshing. They explained exactly how they get paid, what our options were, and which lenders would be the best fit. We secured asset finance for our new fleet within a month.",
    rating: 5,
  },
  {
    name: "David Hargreaves",
    role: "Co-Founder",
    company: "Northern Craft Brewery",
    text: "We needed £500k for expansion and had no idea if it was realistic. Funding Clarity gave us a straight answer and a clear plan. The whole process felt like having a knowledgeable friend in your corner.",
    rating: 5,
  },
  {
    name: "Amina Khan",
    role: "CEO",
    company: "Bloom Digital Agency",
    text: "I took the quiz on a whim and was surprised by how useful the result was. Booked a call the same day, and within two weeks we had a revolving credit facility in place. Game-changer for cash flow.",
    rating: 5,
  },
  {
    name: "Tom Brennan",
    role: "Director",
    company: "Brennan Construction Ltd",
    text: "After years of struggling with the banks, Funding Clarity connected us with a specialist lender who actually understood construction. £350k approved in under three weeks. Wish we'd found them sooner.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container">
        <SectionReveal>
          <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
            <span
              className="text-xs uppercase tracking-[0.3em] text-gold-dim mb-4 block"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              What Business Owners Say
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Real results. <span className="text-gold">Real clarity.</span>
            </h2>
            <p className="text-lg text-warm-white/60 leading-relaxed">
              Don't take our word for it — here's what UK business owners have to
              say about working with Funding Clarity.
            </p>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <SectionReveal key={i} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -4, borderColor: "oklch(0.82 0.12 85 / 0.25)" }}
                className="glass-card p-6 lg:p-8 rounded-sm h-full flex flex-col transition-all duration-300"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={14} className="text-gold fill-gold" />
                  ))}
                </div>

                {/* Quote */}
                <div className="relative flex-1 mb-6">
                  <Quote size={20} className="text-gold/20 absolute -top-1 -left-1" />
                  <p className="text-warm-white/70 leading-relaxed text-sm pl-4">
                    "{t.text}"
                  </p>
                </div>

                {/* Attribution */}
                <div className="border-t border-white/5 pt-4">
                  <p
                    className="text-sm font-semibold text-warm-white"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {t.name}
                  </p>
                  <p className="text-xs text-warm-white/40">
                    {t.role}, {t.company}
                  </p>
                </div>
              </motion.div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
