/**
 * DESIGN: "Dark Authority" — Cinematic Impact / Nano Banana Scroll-Stopper
 * Dark canvas (#09090B), warm gold (#E8B931) accent, massive typography,
 * theatrical scroll animations, floating glass cards, parallax depth.
 * Font: Space Grotesk (display), Source Serif 4 (body), Space Mono (labels)
 */

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "wouter";
import { ArrowRight, MessageCircle, CheckCircle, XCircle, ChevronDown, Play, Download } from "lucide-react";
import { useState } from "react";
import SectionReveal from "@/components/SectionReveal";
import GoldLine from "@/components/GoldLine";
import { useScrollAnimation, useCountUp } from "@/hooks/useScrollAnimation";

const HERO_BG = "https://private-us-east-1.manuscdn.com/sessionFile/Tl0cdcrJhuXUKXtl4z7ePw/sandbox/aWOv8CFwd5NZqyPIUBcdgf-img-1_1770386059000_na1fn_aGVyby1iZw.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvVGwwY2RjckpodVhVS1h0bDR6N2VQdy9zYW5kYm94L2FXT3Y4Q0Z3ZDVOWnF5UElVQmNkZ2YtaW1nLTFfMTc3MDM4NjA1OTAwMF9uYTFmbl9hR1Z5YnkxaVp3LmpwZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=VaqoytSFNMCvrJDsLDDrxLRqreiVSbnVf-CVqjMg6DqFHftvsz-V~DjP-rWyU99fLYrYE0yh6YX153JYIHEhI6-SlJTwWRvMoTEE~FI7cI1hdQwhdpeZxzlyG4i9qI1AcJaGKBLAR~rEkneelyA45Xi-OgoEW6~Irg9CAYptvaZPUSfYcFf2tviUKgMrJNz3~9b16xN-Yh3efUCzrDSXwZHNZ2H67~Nt9-yX61X4L4U2bBnKccjosmX5TSQ7j3XJ89gPBFuNFr6IX2LeGMwNY9jz9DaaLRVaVa71KmkVuBIuayGSCcsJFGbC1dkJiJQV0o5OC4UFiX1qA8K-lWX1BQ__";

const FOUNDER_IMG = "https://private-us-east-1.manuscdn.com/sessionFile/Tl0cdcrJhuXUKXtl4z7ePw/sandbox/aWOv8CFwd5NZqyPIUBcdgf-img-2_1770386059000_na1fn_Zm91bmRlci1zdG9yeQ.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvVGwwY2RjckpodVhVS1h0bDR6N2VQdy9zYW5kYm94L2FXT3Y4Q0Z3ZDVOWnF5UElVQmNkZ2YtaW1nLTJfMTc3MDM4NjA1OTAwMF9uYTFmbl9abTkxYm1SbGNpMXpkRzl5ZVEuanBnP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=hAXmlFC-zOP0kvhgEb1Adrgh4-gBuO-nWfkhgZIFyMf7WHZh04SgH82ZQGi3b1KJdu-gBn-hPgw7Pj1b~7FplhrMpDxk64qQxr8G1D0kF6ydq2g5Y79ZJCS79BQ-tsEElIn2NItEcyzxEphwo1ijRWPSw2jGYO~6ooXObo1ZiArsa18nfd5LmzNjrnxjYykSKEBoqwijC8F3dwccBhjZAr-~VC3ERYomeYtCYNjBbTfzlavDOin2YeNYX5fItrKXfsGXuJYCEYuDLCdPKM1p3Cx7qh2y6IIPzsKYiP~-ujlY9Up1fSvKSnZH14L1fwM5nSS7bG5d9P5SJ2efjsA6fQ__";

const FRAMEWORK_IMG = "https://private-us-east-1.manuscdn.com/sessionFile/Tl0cdcrJhuXUKXtl4z7ePw/sandbox/aWOv8CFwd5NZqyPIUBcdgf-img-3_1770386053000_na1fn_ZnJhbWV3b3JrLWFic3RyYWN0.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvVGwwY2RjckpodVhVS1h0bDR6N2VQdy9zYW5kYm94L2FXT3Y4Q0Z3ZDVOWnF5UElVQmNkZ2YtaW1nLTNfMTc3MDM4NjA1MzAwMF9uYTFmbl9abkpoYldWM2IzSnJMV0ZpYzNSeVlXTjAuanBnP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=NppkdQzXXlvQcqnvqx1I7F-XhFgpqvEkBmbVav80nrlEalC0JVxTfUHi6BKOTne4G3FMbwGPcWoit2J0qa6-5fjACJhHtO8D4k893zukHeGn-z0ljQ4gLcmbwFrj2SEXPZXAclFO3QfagZ1xZnBUDpEPR80D0Kd7zyyR0H6~2hodcCv3fnHFVv1M0muB8nLSqwZz5Jy9D9QxcbSt-zVJm1cxD-kIkpoRzNUHRVqsF4Iza2JjnTOy0Z1fNcul0Eh3K2jef3-whPUNRVkNr8i3HO5L~3E-lN-OmIBCrC00rVVheXxSxhplpn0S~1N5lScoCVNCzhWyXMebf2L7bqclsw__";

const VIDEO_URL = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663048135071/jDKEvsuvOTHRdmlH.mp4";

const CTA_BG = "https://private-us-east-1.manuscdn.com/sessionFile/Tl0cdcrJhuXUKXtl4z7ePw/sandbox/aWOv8CFwd5NZqyPIUBcdgf-img-4_1770386057000_na1fn_Y3RhLWJn.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvVGwwY2RjckpodVhVS1h0bDR6N2VQdy9zYW5kYm94L2FXT3Y4Q0Z3ZDVOWnF5UElVQmNkZ2YtaW1nLTRfMTc3MDM4NjA1NzAwMF9uYTFmbl9ZM1JoTFdKbi5qcGc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=UcnT-KEiezvfQnL2rHt3MrUFQTCpIrmYTmujVgSs45NMfiTN2fBvYDDwTLYEmXg4a2eTUELKI1exXZXoN7K7ak~JaNpvbFFKmcEZvpWliMFmayRWkq-hOHq7xeyln0q~BQzKfjokzk5qZR9aTrxuIqssWSXRRS~-GyXGT~u4X6nY2bkibDe4DZckYTkVX1ePSSzeXnRZ~KLC4jCq8~TjoOAdGpwkpyozfKiYyGPkFtNP3RHqSzUjb~2M73ucm3bXW9ai4dImNa6SB6GDPy3qJiwJYOHdrr3mtOcLFdEqv2BtWu4DyM9ZGAQtKyMOwhKEuMDWwK-PDVLXRjNt6aJ6Ng__";

/* ─── Stagger animation helpers ─── */
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};
const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
};

export default function Home() {
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation(0.3);
  const smeCount = useCountUp(82, 2000, statsVisible);
  const declineRate = useCountUp(47, 2000, statsVisible);

  /* Parallax for hero background */
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(heroProgress, [0, 0.8], [0.4, 0]);

  return (
    <div className="min-h-screen">
      {/* ═══════════════════════════════════════════════════════════
          HERO SECTION — Full viewport, cinematic dark with gold, parallax bg
      ═══════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        {/* Parallax background image */}
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <motion.img
            src={HERO_BG}
            alt=""
            className="w-full h-[120%] object-cover"
            style={{ opacity: heroOpacity }}
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-dark/80 via-dark/60 to-dark" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-transparent to-dark/70" />

        {/* Decorative gold accent line — top */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.4, delay: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/40 to-transparent origin-left"
        />

        <div className="container relative z-10 pt-24 pb-16">
          <div className="max-w-5xl">
            {/* Label */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span
                className="inline-block text-[10px] sm:text-xs uppercase tracking-[0.35em] text-gold-dim mb-8 border border-gold/20 px-4 py-2"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                UK SME Finance — Founded by Founders
              </span>
            </motion.div>

            {/* Headline — split line reveal */}
            <div className="overflow-hidden mb-2">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7rem] font-bold leading-[0.92] tracking-tight text-glow"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Stop guessing.
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-10">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7rem] font-bold leading-[0.92] tracking-tight text-gold text-glow"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Start getting funded.
              </motion.h1>
            </div>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.85 }}
              className="text-lg sm:text-xl text-warm-white/70 max-w-2xl leading-relaxed mb-12"
            >
              We're founders, not bankers. We struggled to get funding ourselves,
              so we built a better way for UK business owners to get the right
              finance — without the nonsense.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/contact">
                <motion.span
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gold text-dark font-semibold text-base rounded-sm gold-glow hover:bg-gold-bright transition-all duration-300"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Get Funding Clarity
                  <ArrowRight size={18} />
                </motion.span>
              </Link>
              <Link href="/contact">
                <motion.span
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-3 px-8 py-4 border border-warm-white/20 text-warm-white font-medium text-base rounded-sm hover:border-gold/40 hover:text-gold transition-all duration-300"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  <MessageCircle size={18} />
                  Talk to a Founder
                </motion.span>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] text-warm-white/30 tracking-[0.3em] uppercase" style={{ fontFamily: "var(--font-mono)" }}>
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" as const }}
          >
            <ChevronDown size={16} className="text-gold/50" />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          STATS BAR — Social proof with count-up
      ═══════════════════════════════════════════════════════════ */}
      <section className="border-y border-white/5 bg-dark-card">
        <div className="container" ref={statsRef}>
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/5">
            {[
              { value: `${smeCount}%`, label: "of UK SMEs struggle to access finance" },
              { value: `${declineRate}%`, label: "of bank applications are declined" },
              { value: "4 Qs", label: "answered before any application" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={statsVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="py-8 sm:py-10 px-6 text-center"
              >
                <span
                  className="block text-3xl sm:text-4xl font-bold text-gold mb-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {stat.value}
                </span>
                <span className="text-sm text-warm-white/50">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          EXPLAINER VIDEO — 30s animated motion graphics
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <SectionReveal>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <span
                  className="text-xs uppercase tracking-[0.3em] text-gold-dim mb-4 block"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  Watch — 30 Seconds
                </span>
                <h2
                  className="text-3xl sm:text-4xl font-bold leading-tight"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  The problem. <span className="text-gold">The solution.</span>
                </h2>
              </div>
              <div className="relative aspect-video rounded-sm overflow-hidden glass-card">
                <video
                  className="w-full h-full object-cover"
                  controls
                  preload="metadata"
                  poster=""
                >
                  <source src={VIDEO_URL} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <p className="text-center text-warm-white/40 text-sm mt-4">
                No sound? Turn on your speakers for the full experience.
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>

      <GoldLine className="container" />

      {/* ═══════════════════════════════════════════════════════════
          FOUNDER STORY — Authentic narrative with asymmetric layout
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 lg:py-36 overflow-hidden">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Image with layered depth */}
            <SectionReveal direction="left">
              <div className="relative">
                <div className="aspect-[4/3] overflow-hidden rounded-sm">
                  <motion.img
                    src={FOUNDER_IMG}
                    alt="Founders of Funding Clarity"
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
                {/* Gold accent border offset */}
                <div className="absolute -bottom-4 -right-4 w-full h-full border border-gold/20 rounded-sm -z-10" />
                {/* Floating label */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="absolute -bottom-6 -left-2 lg:-left-6 bg-dark-card border border-gold/20 px-5 py-3 rounded-sm"
                >
                  <span className="text-[10px] uppercase tracking-[0.2em] text-gold-dim block" style={{ fontFamily: "var(--font-mono)" }}>
                    Est. by founders
                  </span>
                  <span className="text-sm text-warm-white font-semibold" style={{ fontFamily: "var(--font-display)" }}>
                    Who've been there.
                  </span>
                </motion.div>
              </div>
            </SectionReveal>

            {/* Story */}
            <SectionReveal direction="right" delay={0.2}>
              <span
                className="text-xs uppercase tracking-[0.3em] text-gold-dim mb-6 block"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Our Story
              </span>
              <h2
                className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold leading-[1.05] mb-8"
                style={{ fontFamily: "var(--font-display)" }}
              >
                We've been <span className="text-gold">exactly</span> where you are.
              </h2>
              <div className="space-y-5 text-warm-white/70 leading-relaxed">
                <p>
                  We had a profitable business, a solid plan, and a clear need for
                  funding to grow. We thought it would be straightforward.
                </p>
                <p>
                  It wasn't. The banks said no. The application processes were a
                  black box of delays and confusing jargon. No one could tell us
                  why we were rejected — or what to do next.
                </p>
                <p>
                  It was frustrating, demoralising, and a colossal waste of time
                  we didn't have.
                </p>
                <p className="text-warm-white font-medium text-lg" style={{ fontFamily: "var(--font-display)" }}>
                  So we built a better way.
                </p>
              </div>
              <div className="mt-8">
                <Link href="/about">
                  <motion.span
                    whileHover={{ x: 4 }}
                    className="inline-flex items-center gap-2 text-gold hover:text-gold-bright transition-colors text-sm font-medium"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Read our full story <ArrowRight size={14} />
                  </motion.span>
                </Link>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      <GoldLine className="container" />

      {/* ═══════════════════════════════════════════════════════════
          WHAT WE DO — 4-Question Framework with staggered cards
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 lg:py-36 relative">
        {/* Subtle background image */}
        <div className="absolute inset-0 opacity-[0.03]">
          <img src={FRAMEWORK_IMG} alt="" className="w-full h-full object-cover" />
        </div>

        <div className="container relative z-10">
          <SectionReveal>
            <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
              <span
                className="text-xs uppercase tracking-[0.3em] text-gold-dim mb-6 block"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                What We Do
              </span>
              <h2
                className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Clarity <span className="text-gold">before</span> you apply.
              </h2>
              <p className="text-lg text-warm-white/60 leading-relaxed">
                We answer the four critical questions you need to know before you
                apply for funding. This simple, upfront clarity saves you time,
                reduces stress, and dramatically increases your chances.
              </p>
            </div>
          </SectionReveal>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
          >
            {[
              {
                num: "01",
                title: "What funding fits?",
                desc: "We match you to the right type of finance for your specific situation — from invoice finance to growth loans, asset finance to revolving credit.",
              },
              {
                num: "02",
                title: "When should you apply?",
                desc: "Timing is everything. We tell you the right moment to make your move, so you're not wasting applications when the odds are against you.",
              },
              {
                num: "03",
                title: "How much is realistic?",
                desc: "We give you a clear, honest assessment of what you can realistically secure. No inflated promises. No disappointment.",
              },
              {
                num: "04",
                title: "Who is most likely to say yes?",
                desc: "We connect you with the lenders who understand your business and are actively looking to fund companies like yours.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                whileHover={{ y: -4, borderColor: "oklch(0.82 0.12 85 / 0.25)" }}
                className="glass-card p-8 lg:p-10 rounded-sm group transition-all duration-500"
              >
                <span
                  className="text-5xl font-bold text-gold/15 group-hover:text-gold/30 transition-colors duration-500 block mb-4"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {item.num}
                </span>
                <h3
                  className="text-xl font-semibold mb-3 text-warm-white"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {item.title}
                </h3>
                <p className="text-warm-white/60 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <SectionReveal className="text-center mt-12">
            <Link href="/what-we-do">
              <motion.span
                whileHover={{ x: 4 }}
                className="inline-flex items-center gap-2 text-gold hover:text-gold-bright transition-colors font-medium"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Learn more about our approach <ArrowRight size={16} />
              </motion.span>
            </Link>
          </SectionReveal>
        </div>
      </section>

      <GoldLine className="container" />

      {/* ═══════════════════════════════════════════════════════════
          WHY APPLICATIONS FAIL — Reframe rejection
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 lg:py-36">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <SectionReveal>
              <span
                className="text-xs uppercase tracking-[0.3em] text-gold-dim mb-6 block"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                The Truth About Funding
              </span>
              <h2
                className="text-4xl sm:text-5xl font-bold leading-tight mb-8"
                style={{ fontFamily: "var(--font-display)" }}
              >
                It's not you.
                <br />
                <span className="text-gold">It's the system.</span>
              </h2>
              <div className="space-y-5 text-warm-white/70 leading-relaxed">
                <p>
                  If you've been rejected for funding, it's easy to take it
                  personally. But the truth is, most applications fail for
                  structural reasons — not because your business isn't good enough.
                </p>
                <p>
                  Lenders have rigid criteria, automated scoring systems, and very
                  little time to understand the story behind the numbers. A strong
                  business can be declined simply because it applied to the wrong
                  lender, at the wrong time, for the wrong product.
                </p>
                <p>
                  We don't just tell you if you'll be approved. We explain the
                  why behind the decision — helping you build a stronger case,
                  regardless of the outcome.
                </p>
              </div>
              <div className="mt-8">
                <Link href="/why-applications-fail">
                  <motion.span
                    whileHover={{ x: 4 }}
                    className="inline-flex items-center gap-2 text-gold hover:text-gold-bright transition-colors text-sm font-medium"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Understand why applications fail <ArrowRight size={14} />
                  </motion.span>
                </Link>
              </div>
            </SectionReveal>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="space-y-4"
            >
              {[
                "Wrong lender for your business type",
                "Poor timing — applying during weak trading months",
                "Asking for the wrong amount",
                "Incomplete or unclear financials",
                "No explanation of how funds will be used",
                "Applying for the wrong product entirely",
              ].map((reason, i) => (
                <motion.div
                  key={i}
                  variants={staggerItem}
                  whileHover={{ x: 4, borderColor: "oklch(0.82 0.12 85 / 0.2)" }}
                  className="glass-card p-5 rounded-sm flex items-start gap-4 group transition-all duration-300"
                >
                  <XCircle
                    size={20}
                    className="text-red-400/60 mt-0.5 shrink-0 group-hover:text-red-400 transition-colors"
                  />
                  <span className="text-warm-white/70 group-hover:text-warm-white transition-colors">
                    {reason}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <GoldLine className="container" />

      {/* ═══════════════════════════════════════════════════════════
          WHO IS THIS FOR / NOT FOR — Qualify leads
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 lg:py-36">
        <div className="container">
          <SectionReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span
                className="text-xs uppercase tracking-[0.3em] text-gold-dim mb-6 block"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Is This Right For You?
              </span>
              <h2
                className="text-4xl sm:text-5xl font-bold leading-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Honest about who we <span className="text-gold">can</span> help.
              </h2>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <SectionReveal delay={0.1}>
              <motion.div
                whileHover={{ y: -3 }}
                className="glass-card p-8 lg:p-10 rounded-sm h-full transition-all duration-300"
              >
                <h3
                  className="text-lg font-semibold text-gold mb-6 flex items-center gap-3"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  <CheckCircle size={22} />
                  This is for you if...
                </h3>
                <ul className="space-y-4">
                  {[
                    "You're a UK-based SME founder or director",
                    "You've been declined, delayed, or ignored by traditional banks",
                    "You're tired of jargon and want straight answers",
                    "You value honesty and clarity over hype",
                    "You want to know where you stand before you apply",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-warm-white/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </SectionReveal>

            <SectionReveal delay={0.25}>
              <motion.div
                whileHover={{ y: -3 }}
                className="glass-card p-8 lg:p-10 rounded-sm h-full border-white/[0.03] transition-all duration-300"
              >
                <h3
                  className="text-lg font-semibold text-warm-white/50 mb-6 flex items-center gap-3"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  <XCircle size={22} />
                  Probably not for you if...
                </h3>
                <ul className="space-y-4">
                  {[
                    "You're looking for a 'get rich quick' scheme",
                    "You're not open to honest feedback about your funding potential",
                    "You want to be told what you want to hear, not what you need to know",
                    "You're after a magic bullet, not a clear plan",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-warm-white/40">
                      <span className="w-1.5 h-1.5 rounded-full bg-warm-white/20 mt-2.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </SectionReveal>
          </div>
        </div>
      </section>

      <GoldLine className="container" />

      {/* ═══════════════════════════════════════════════════════════
          HOW IT WORKS — 3 Steps with dramatic numbers
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 lg:py-36">
        <div className="container">
          <SectionReveal>
            <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
              <span
                className="text-xs uppercase tracking-[0.3em] text-gold-dim mb-6 block"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                How It Works
              </span>
              <h2
                className="text-4xl sm:text-5xl font-bold leading-tight mb-6"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Your path to <span className="text-gold">funding clarity.</span>
              </h2>
              <p className="text-lg text-warm-white/60">
                Three simple steps. No paperwork upfront. No commitment.
              </p>
            </div>
          </SectionReveal>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
          >
            {[
              {
                step: "01",
                title: "Tell us your story",
                desc: "Share a few simple details about your business and your funding goals. No paperwork, no hassle. Just a straightforward conversation.",
              },
              {
                step: "02",
                title: "Get your funding plan",
                desc: "We analyse your situation and give you clear answers on what fits, when to apply, how much is realistic, and who will say yes.",
              },
              {
                step: "03",
                title: "Decide your next move",
                desc: "Armed with clarity, you choose the best path forward — whether that's applying to a recommended lender or strengthening your position first.",
              },
            ].map((item, i) => (
              <motion.div key={i} variants={staggerItem} className="relative group">
                {/* Step number */}
                <span
                  className="text-[6rem] lg:text-[7rem] font-bold text-gold/8 group-hover:text-gold/15 transition-colors duration-700 block leading-none mb-2"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {item.step}
                </span>
                <h3
                  className="text-xl font-semibold mb-3 text-warm-white"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {item.title}
                </h3>
                <p className="text-warm-white/60 leading-relaxed">
                  {item.desc}
                </p>
                {/* Connecting line for desktop */}
                {i < 2 && (
                  <div className="hidden md:block absolute top-16 -right-6 lg:-right-8 w-12 lg:w-16 h-px bg-gradient-to-r from-gold/20 to-transparent" />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          PRIMARY CTA — Cinematic closing with parallax
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative py-32 lg:py-44 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src={CTA_BG}
            alt=""
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/80 to-dark/60" />
        </div>

        <div className="container relative z-10">
          <SectionReveal>
            <div className="max-w-3xl mx-auto text-center">
              <h2
                className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-8 text-glow"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Ready to stop <span className="text-gold">guessing?</span>
              </h2>
              <p className="text-lg sm:text-xl text-warm-white/60 leading-relaxed mb-12 max-w-2xl mx-auto">
                Let's have a conversation. No pressure, no sales pitch. Just a
                straightforward chat with a fellow founder who gets it. Find out
                where you really stand and what your best next steps are.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/quiz">
                  <motion.span
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-3 px-10 py-5 bg-gold text-dark font-semibold text-lg rounded-sm gold-glow hover:bg-gold-bright transition-all duration-300"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Take the Funding Quiz
                    <ArrowRight size={20} />
                  </motion.span>
                </Link>
                <Link href="/contact">
                  <motion.span
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-3 px-10 py-5 border border-warm-white/20 text-warm-white font-medium text-lg rounded-sm hover:border-gold/40 hover:text-gold transition-all duration-300"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    <MessageCircle size={20} />
                    Request a Quote
                  </motion.span>
                </Link>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
                <Link href="/guide">
                  <motion.span
                    whileHover={{ scale: 1.02 }}
                    className="inline-flex items-center gap-2 text-warm-white/50 hover:text-gold transition-colors text-sm"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    <Download size={14} />
                    Download the free guide
                  </motion.span>
                </Link>
                <Link href="/booking">
                  <motion.span
                    whileHover={{ scale: 1.02 }}
                    className="inline-flex items-center gap-2 text-warm-white/50 hover:text-gold transition-colors text-sm"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    <ArrowRight size={14} />
                    Book a clarity call
                  </motion.span>
                </Link>
              </div>
              <p
                className="mt-8 text-xs text-warm-white/30"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                No commitment. No cost for the initial conversation.
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
