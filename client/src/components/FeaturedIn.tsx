import SectionReveal from "@/components/SectionReveal";

/**
 * "Featured In" / "As Seen In" logo strip with placeholder brand names.
 * Replace with real logos when press coverage is secured.
 */
const PUBLICATIONS = [
  "The Times",
  "Business Insider",
  "Forbes UK",
  "Startups.co.uk",
  "The Telegraph",
  "City AM",
];

export default function FeaturedIn() {
  return (
    <section className="section-gold py-12 lg:py-16">
      <div className="container">
        <SectionReveal>
          <div className="text-center mb-8">
            <span
              className="text-xs uppercase tracking-[0.3em] text-dark/50 block"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              As Featured In
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-14">
            {PUBLICATIONS.map((pub, i) => (
              <div
                key={i}
                className="text-dark/25 hover:text-dark/50 transition-colors duration-300"
              >
                <span
                  className="text-lg sm:text-xl font-bold tracking-tight whitespace-nowrap"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {pub}
                </span>
              </div>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
