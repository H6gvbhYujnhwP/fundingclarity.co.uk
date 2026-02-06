import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "Our Story" },
  { href: "/what-we-do", label: "What We Do" },
  { href: "/why-applications-fail", label: "Why Apps Fail" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/quiz", label: "Funding Quiz" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-dark/90 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/">
            <span
              className="text-xl lg:text-2xl font-bold tracking-tight text-gold"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Funding<span className="text-warm-white">Clarity</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span
                  className={`px-3 py-2 text-sm tracking-wide transition-colors duration-300 ${
                    location === link.href
                      ? "text-gold"
                      : "text-warm-white/70 hover:text-warm-white"
                  }`}
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {link.label}
                </span>
              </Link>
            ))}
            <Link href="/contact">
              <span className="ml-4 px-5 py-2.5 bg-gold text-dark text-sm font-semibold rounded-sm tracking-wide hover:bg-gold-bright transition-all duration-300 gold-glow" style={{ fontFamily: "var(--font-display)" }}>
                Get Funding Clarity
              </span>
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-warm-white/80 hover:text-warm-white p-2"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-dark/95 backdrop-blur-xl border-t border-white/5 overflow-hidden"
          >
            <nav className="container py-6 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span
                    className={`block px-4 py-3 text-base transition-colors duration-300 ${
                      location === link.href
                        ? "text-gold"
                        : "text-warm-white/70 hover:text-warm-white"
                    }`}
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {link.label}
                  </span>
                </Link>
              ))}
              <Link href="/guide">
                <span
                  className={`block px-4 py-3 text-base transition-colors duration-300 ${
                    location === "/guide"
                      ? "text-gold"
                      : "text-warm-white/70 hover:text-warm-white"
                  }`}
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Free Guide
                </span>
              </Link>
              <Link href="/contact">
                <span className="mt-4 block text-center px-5 py-3 bg-gold text-dark text-sm font-semibold rounded-sm tracking-wide" style={{ fontFamily: "var(--font-display)" }}>
                  Get Funding Clarity
                </span>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
