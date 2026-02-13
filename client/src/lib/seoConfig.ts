/**
 * Centralised SEO metadata for every route.
 * Import and pass to useSEO() in each page component.
 */
export const SEO_META: Record<string, { title: string; description: string; path: string }> = {
  home: {
    title: "Funding Clarity",
    description:
      "We're founders, not bankers. We help UK business owners get the right finance — answering four critical questions before you apply so you save time, reduce stress, and dramatically increase your chances.",
    path: "/",
  },
  about: {
    title: "Our Story",
    description:
      "We struggled to get funding ourselves, so we built a better way. Learn how Funding Clarity was founded by UK business owners who have been exactly where you are.",
    path: "/about",
  },
  whatWeDo: {
    title: "What We Do",
    description:
      "Clarity before you apply. We answer four critical questions — what funding fits, when to apply, how much is realistic, and who is most likely to say yes.",
    path: "/what-we-do",
  },
  whyApplicationsFail: {
    title: "Why Applications Fail",
    description:
      "82% of UK SMEs struggle to access finance. Discover the three structural reasons most funding applications are declined — and how to avoid them.",
    path: "/why-applications-fail",
  },
  whoIsThisFor: {
    title: "Who Is This For",
    description:
      "Whether you're a growing limited company, a founder who's been declined, or applying for the first time — Funding Clarity is built for you.",
    path: "/who-is-this-for",
  },
  howItWorks: {
    title: "How It Works",
    description:
      "Three simple steps: take our Funding Readiness Quiz, get personalised clarity on your options, then move forward with confidence.",
    path: "/how-it-works",
  },
  contact: {
    title: "Get Funding Clarity",
    description:
      "Ready to get started? Contact us for a free, no-obligation conversation about your funding options. We'll give you honest, specific advice.",
    path: "/contact",
  },
  quiz: {
    title: "Funding Readiness Quiz",
    description:
      "Take our 2-minute quiz to find out how ready your business is for funding. Get a personalised assessment and clear next steps — completely free.",
    path: "/quiz",
  },
  booking: {
    title: "Book a Clarity Call",
    description:
      "Book a free 15-minute clarity call with a Funding Clarity founder. We'll review your situation and give you honest, actionable advice.",
    path: "/booking",
  },
  guide: {
    title: "Free Funding Guide",
    description:
      "Download our free guide: The 4 Questions Every Business Owner Should Answer Before Applying for Funding. Practical, honest, and jargon-free.",
    path: "/guide",
  },
  admin: {
    title: "Admin Dashboard",
    description: "Funding Clarity admin dashboard — manage leads, bookings, and analytics.",
    path: "/admin",
  },
};
