/**
 * Interactive Funding Readiness Quiz — 5-step assessment
 * Captures lead data, shows personalised result, syncs to Sendy
 * Alternating dark/white sections
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, CheckCircle, Loader2 } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import SectionReveal from "@/components/SectionReveal";

type QuizStep = {
  id: string;
  question: string;
  subtitle: string;
  options: { label: string; value: string; description?: string }[];
};

const QUIZ_STEPS: QuizStep[] = [
  {
    id: "business_type",
    question: "What type of business do you run?",
    subtitle: "This helps us match you to the right funding products.",
    options: [
      { label: "Limited Company (Ltd)", value: "ltd", description: "Trading as a registered UK limited company" },
      { label: "Sole Trader", value: "sole_trader", description: "Operating as an individual" },
      { label: "Partnership / LLP", value: "partnership", description: "Two or more partners" },
      { label: "Start-up (pre-revenue)", value: "startup", description: "Less than 12 months trading" },
    ],
  },
  {
    id: "annual_revenue",
    question: "What is your approximate annual revenue?",
    subtitle: "This determines which lenders and products are available to you.",
    options: [
      { label: "Under \u00a350k", value: "under_50k" },
      { label: "\u00a350k \u2013 \u00a3250k", value: "50k_250k" },
      { label: "\u00a3250k \u2013 \u00a31m", value: "250k_1m" },
      { label: "\u00a31m \u2013 \u00a35m", value: "1m_5m" },
      { label: "Over \u00a35m", value: "over_5m" },
    ],
  },
  {
    id: "funding_amount",
    question: "How much funding are you looking for?",
    subtitle: "A rough figure is fine. We'll refine this together.",
    options: [
      { label: "Under \u00a325k", value: "under_25k" },
      { label: "\u00a325k \u2013 \u00a3100k", value: "25k_100k" },
      { label: "\u00a3100k \u2013 \u00a3500k", value: "100k_500k" },
      { label: "\u00a3500k \u2013 \u00a32m", value: "500k_2m" },
      { label: "Over \u00a32m", value: "over_2m" },
    ],
  },
  {
    id: "timeline",
    question: "When do you need the funding?",
    subtitle: "Timing affects which options are available and how we approach lenders.",
    options: [
      { label: "Urgently (within 2 weeks)", value: "urgent" },
      { label: "Soon (1\u20133 months)", value: "soon" },
      { label: "Planning ahead (3\u20136 months)", value: "planning" },
      { label: "Just exploring options", value: "exploring" },
    ],
  },
  {
    id: "previous_applications",
    question: "Have you applied for funding before?",
    subtitle: "This helps us understand your experience and any previous barriers.",
    options: [
      { label: "Yes, and I was approved", value: "approved" },
      { label: "Yes, but I was declined", value: "declined" },
      { label: "Yes, but the process stalled", value: "stalled" },
      { label: "No, this is my first time", value: "first_time" },
    ],
  },
];

function getQuizResult(answers: Record<string, string>): { score: string; headline: string; detail: string; recommendation: string } {
  const revenue = answers.annual_revenue;
  const prevApp = answers.previous_applications;
  const timeline = answers.timeline;
  const businessType = answers.business_type;

  let positiveFactors = 0;
  let concerns: string[] = [];

  if (revenue === "over_5m" || revenue === "1m_5m") positiveFactors += 2;
  else if (revenue === "250k_1m") positiveFactors += 1;
  else if (revenue === "under_50k") concerns.push("lower revenue may limit traditional lending options");

  if (businessType === "ltd") positiveFactors += 1;
  if (businessType === "startup") concerns.push("pre-revenue businesses have fewer options but they do exist");

  if (prevApp === "approved") positiveFactors += 1;
  if (prevApp === "declined") concerns.push("a previous decline is common and not a dealbreaker \u2014 we can help you understand why");

  if (timeline === "urgent") concerns.push("tight timelines narrow the field but fast-track options exist");

  if (positiveFactors >= 3) {
    return {
      score: "Strong",
      headline: "You're in a strong position to secure funding.",
      detail: "Based on your answers, you have several factors working in your favour. The right approach and the right lender could make a real difference.",
      recommendation: "We'd recommend a free clarity call to map out your best options and timing.",
    };
  } else if (positiveFactors >= 1) {
    return {
      score: "Good",
      headline: "There are solid options available to you.",
      detail: `Your profile shows genuine potential. ${concerns.length > 0 ? `A few things to be aware of: ${concerns.join("; ")}. ` : ""}With the right guidance, you can approach lenders with confidence.`,
      recommendation: "A short conversation with us would help clarify exactly which products and lenders fit your situation.",
    };
  } else {
    return {
      score: "Needs Clarity",
      headline: "Let's work out the best path forward.",
      detail: `Your situation has some factors that need careful navigation${concerns.length > 0 ? `: ${concerns.join("; ")}` : ""}. This doesn't mean funding isn't possible \u2014 it means the right strategy matters even more.`,
      recommendation: "We'd strongly recommend a clarity call so we can give you honest, specific advice rather than generic guidance.",
    };
  }
}

export default function Quiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showCapture, setShowCapture] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [captureData, setCaptureData] = useState({ name: "", email: "", company: "", phone: "" });

  const leadMutation = trpc.lead.submit.useMutation();

  const step = QUIZ_STEPS[currentStep];
  const progress = ((currentStep + 1) / QUIZ_STEPS.length) * 100;

  const handleSelect = (value: string) => {
    const newAnswers = { ...answers, [step.id]: value };
    setAnswers(newAnswers);

    if (currentStep < QUIZ_STEPS.length - 1) {
      setTimeout(() => setCurrentStep(currentStep + 1), 300);
    } else {
      setShowCapture(true);
    }
  };

  const handleSubmitCapture = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!captureData.name || !captureData.email) {
      toast.error("Please enter your name and email.");
      return;
    }

    const result = getQuizResult(answers);

    try {
      await leadMutation.mutateAsync({
        name: captureData.name,
        email: captureData.email,
        company: captureData.company || undefined,
        phone: captureData.phone || undefined,
        source: "quiz",
        quizAnswers: JSON.stringify(answers),
        quizResult: JSON.stringify(result),
      });
      setShowCapture(false);
      setShowResult(true);
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const result = getQuizResult(answers);

  return (
    <div className="min-h-screen pt-20 lg:pt-24">
      {/* Header — DARK */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <SectionReveal>
            <span
              className="text-xs uppercase tracking-[0.3em] text-gold-dim mb-4 block"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Funding Readiness Quiz
            </span>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Check your <span className="text-gold">funding readiness.</span>
            </h1>
            <p className="text-lg text-warm-white/60 max-w-2xl">
              Answer five quick questions. Get a personalised assessment of where you stand
              and what your best next steps are. Takes under two minutes.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Quiz content — WHITE */}
      <section className="section-light py-12 lg:py-20">
        <div className="container">
          {/* Progress bar */}
          {!showResult && (
            <div className="max-w-3xl mx-auto mb-8">
              <div className="h-1 bg-dark/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gold rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: showCapture ? "100%" : `${progress}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-xs text-dark/40" style={{ fontFamily: "var(--font-mono)" }}>
                  {showCapture ? "Almost done" : `Question ${currentStep + 1} of ${QUIZ_STEPS.length}`}
                </span>
                <span className="text-xs text-dark/40" style={{ fontFamily: "var(--font-mono)" }}>
                  {showCapture ? "100%" : `${Math.round(progress)}%`}
                </span>
              </div>
            </div>
          )}

          <AnimatePresence mode="wait">
            {!showCapture && !showResult && step && (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4 }}
                className="max-w-3xl mx-auto"
              >
                <h2
                  className="text-2xl sm:text-3xl font-bold mb-3 text-dark"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {step.question}
                </h2>
                <p className="text-dark/50 mb-8">{step.subtitle}</p>

                <div className="space-y-3">
                  {step.options.map((option) => (
                    <motion.button
                      key={option.value}
                      whileHover={{ x: 4, borderColor: "oklch(0.82 0.12 85 / 0.6)" }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleSelect(option.value)}
                      className={`w-full text-left p-5 rounded-sm flex items-center gap-4 transition-all duration-300 group border bg-white shadow-sm ${
                        answers[step.id] === option.value
                          ? "border-gold bg-gold/5"
                          : "border-dark/10 hover:border-gold/40"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors ${
                          answers[step.id] === option.value
                            ? "border-gold bg-gold"
                            : "border-dark/20 group-hover:border-gold/40"
                        }`}
                      >
                        {answers[step.id] === option.value && (
                          <div className="w-2 h-2 rounded-full bg-white" />
                        )}
                      </div>
                      <div>
                        <span className="text-dark font-medium block">{option.label}</span>
                        {option.description && (
                          <span className="text-dark/40 text-sm">{option.description}</span>
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>

                {currentStep > 0 && (
                  <button
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="mt-6 inline-flex items-center gap-2 text-dark/40 hover:text-dark/70 transition-colors text-sm"
                  >
                    <ArrowLeft size={14} /> Previous question
                  </button>
                )}
              </motion.div>
            )}

            {showCapture && !showResult && (
              <motion.div
                key="capture"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4 }}
                className="max-w-xl mx-auto"
              >
                <h2
                  className="text-2xl sm:text-3xl font-bold mb-3 text-dark"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Where should we send your results?
                </h2>
                <p className="text-dark/50 mb-8">
                  Enter your details below to see your personalised funding readiness assessment.
                </p>

                <form onSubmit={handleSubmitCapture} className="space-y-4">
                  <div>
                    <label className="text-sm text-dark/70 mb-1 block">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={captureData.name}
                      onChange={(e) => setCaptureData({ ...captureData, name: e.target.value })}
                      className="w-full bg-white border border-dark/15 rounded-sm px-4 py-3 text-dark placeholder:text-dark/30 focus:border-gold focus:outline-none transition-colors shadow-sm"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-dark/70 mb-1 block">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={captureData.email}
                      onChange={(e) => setCaptureData({ ...captureData, email: e.target.value })}
                      className="w-full bg-white border border-dark/15 rounded-sm px-4 py-3 text-dark placeholder:text-dark/30 focus:border-gold focus:outline-none transition-colors shadow-sm"
                      placeholder="you@company.co.uk"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-dark/70 mb-1 block">Company Name</label>
                    <input
                      type="text"
                      value={captureData.company}
                      onChange={(e) => setCaptureData({ ...captureData, company: e.target.value })}
                      className="w-full bg-white border border-dark/15 rounded-sm px-4 py-3 text-dark placeholder:text-dark/30 focus:border-gold focus:outline-none transition-colors shadow-sm"
                      placeholder="Your company"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-dark/70 mb-1 block">Phone Number</label>
                    <input
                      type="tel"
                      value={captureData.phone}
                      onChange={(e) => setCaptureData({ ...captureData, phone: e.target.value })}
                      className="w-full bg-white border border-dark/15 rounded-sm px-4 py-3 text-dark placeholder:text-dark/30 focus:border-gold focus:outline-none transition-colors shadow-sm"
                      placeholder="07xxx xxxxxx"
                    />
                  </div>

                  <p className="text-xs text-dark/30 mt-2">
                    We'll use your details to send your results and may follow up with helpful funding insights.
                    No spam, ever. Unsubscribe anytime.
                  </p>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowCapture(false)}
                      className="px-6 py-3 border border-dark/15 text-dark/60 rounded-sm hover:border-dark/30 transition-colors"
                    >
                      <ArrowLeft size={16} className="inline mr-2" />
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={leadMutation.isPending}
                      className="flex-1 px-6 py-3 bg-gold text-dark font-semibold rounded-sm gold-glow hover:bg-gold-bright transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {leadMutation.isPending ? (
                        <Loader2 size={18} className="animate-spin" />
                      ) : (
                        <>
                          See My Results
                          <ArrowRight size={16} />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {showResult && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-2xl mx-auto"
              >
                {/* Result card */}
                <div className="bg-white border border-dark/10 p-8 lg:p-12 rounded-sm mb-8 shadow-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <CheckCircle size={28} className="text-gold" />
                    <span
                      className="text-xs uppercase tracking-[0.3em] text-gold"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      Your Funding Readiness: {result.score}
                    </span>
                  </div>

                  <h2
                    className="text-3xl sm:text-4xl font-bold mb-4 text-dark"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {result.headline}
                  </h2>

                  <p className="text-dark/70 leading-relaxed mb-6">
                    {result.detail}
                  </p>

                  <div className="border-t border-dark/10 pt-6">
                    <h3
                      className="text-lg font-semibold mb-2 text-gold"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      Our recommendation
                    </h3>
                    <p className="text-dark/70 leading-relaxed">
                      {result.recommendation}
                    </p>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="/booking"
                    className="flex-1 inline-flex items-center justify-center gap-3 px-8 py-4 bg-gold text-dark font-semibold rounded-sm gold-glow hover:bg-gold-bright transition-all duration-300"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Book a Free Clarity Call
                    <ArrowRight size={16} />
                  </a>
                  <a
                    href="/contact"
                    className="flex-1 inline-flex items-center justify-center gap-3 px-8 py-4 border border-dark/20 text-dark font-medium rounded-sm hover:border-gold hover:text-gold transition-all duration-300"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Send Us a Message
                  </a>
                </div>

                <p className="text-center text-xs text-dark/30 mt-6" style={{ fontFamily: "var(--font-mono)" }}>
                  We've sent a copy of your results to {captureData.email}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
