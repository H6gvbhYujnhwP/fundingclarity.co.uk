import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-dark border-t border-white/5">
      <div className="container py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {/* Brand */}
          <div>
            <span
              className="text-xl font-bold tracking-tight text-gold"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Funding<span className="text-warm-white">Clarity</span>
            </span>
            <p className="mt-4 text-warm-white/50 text-sm leading-relaxed max-w-xs">
              Built by founders who were told no. Now helping UK business owners
              get the right funding, with clarity before application.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4
              className="text-xs uppercase tracking-[0.2em] text-gold-dim mb-6"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Navigate
            </h4>
            <nav className="flex flex-col gap-3">
              {[
                { href: "/about", label: "Our Story" },
                { href: "/what-we-do", label: "What We Do" },
                { href: "/why-applications-fail", label: "Why Applications Fail" },
                { href: "/who-is-this-for", label: "Is This For You?" },
                { href: "/how-it-works", label: "How It Works" },
                { href: "/contact", label: "Get In Touch" },
              ].map((link) => (
                <Link key={link.href} href={link.href}>
                  <span className="text-sm text-warm-white/50 hover:text-warm-white transition-colors duration-300">
                    {link.label}
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-xs uppercase tracking-[0.2em] text-gold-dim mb-6"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Get In Touch
            </h4>
            <p className="text-sm text-warm-white/50 leading-relaxed mb-4">
              Ready to talk? We respond to every message personally. No bots, no
              auto-replies.
            </p>
            <Link href="/contact">
              <span className="inline-block px-5 py-2.5 bg-gold/10 border border-gold/30 text-gold text-sm font-medium rounded-sm hover:bg-gold/20 transition-all duration-300" style={{ fontFamily: "var(--font-display)" }}>
                Start a Conversation
              </span>
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            className="text-xs text-warm-white/30"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Funding Clarity Ltd. Registered in England & Wales.
          </p>
          <p
            className="text-xs text-warm-white/30"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Built by founders, for founders.
          </p>
        </div>
      </div>
    </footer>
  );
}
