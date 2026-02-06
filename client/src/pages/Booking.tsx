/**
 * Book a Clarity Call — Simple booking form
 * Sends booking request to the backend which notifies via email
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock, CheckCircle, Loader2 } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import SectionReveal from "@/components/SectionReveal";
import GoldLine from "@/components/GoldLine";

const TIME_SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00",
];

export default function Booking() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    preferredDate: "",
    preferredTime: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const bookingMutation = trpc.booking.submit.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast.error("Please enter your name and email.");
      return;
    }

    try {
      await bookingMutation.mutateAsync({
        name: formData.name,
        email: formData.email,
        company: formData.company || undefined,
        phone: formData.phone || undefined,
        preferredDate: formData.preferredDate || undefined,
        preferredTime: formData.preferredTime || undefined,
        message: formData.message || undefined,
      });
      setSubmitted(true);
    } catch {
      toast.error("Something went wrong. Please try again or email us directly.");
    }
  };

  // Generate next 14 business days
  const getBusinessDays = () => {
    const days: string[] = [];
    const today = new Date();
    let current = new Date(today);
    current.setDate(current.getDate() + 1); // Start from tomorrow

    while (days.length < 14) {
      const day = current.getDay();
      if (day !== 0 && day !== 6) {
        days.push(current.toISOString().split("T")[0]);
      }
      current.setDate(current.getDate() + 1);
    }
    return days;
  };

  const businessDays = getBusinessDays();

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + "T00:00:00");
    return date.toLocaleDateString("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen pt-20 lg:pt-24">
        <section className="py-24 lg:py-36">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl mx-auto text-center"
            >
              <CheckCircle size={56} className="text-gold mx-auto mb-6" />
              <h1
                className="text-4xl sm:text-5xl font-bold mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Booking <span className="text-gold">confirmed.</span>
              </h1>
              <p className="text-lg text-warm-white/60 leading-relaxed mb-8">
                We've received your request for a clarity call. We'll confirm the
                exact time by email within 24 hours. If you need to reach us
                sooner, email{" "}
                <a href="mailto:hello@fundingclarity.co.uk" className="text-gold hover:text-gold-bright transition-colors">
                  hello@fundingclarity.co.uk
                </a>
              </p>
              <a
                href="/"
                className="inline-flex items-center gap-2 text-gold hover:text-gold-bright transition-colors font-medium"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Back to home <ArrowRight size={14} />
              </a>
            </motion.div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 lg:pt-24">
      {/* Header */}
      <section className="py-16 lg:py-20">
        <div className="container">
          <SectionReveal>
            <span
              className="text-xs uppercase tracking-[0.3em] text-gold-dim mb-6 block"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Book a Call
            </span>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Book a free <span className="text-gold">clarity call.</span>
            </h1>
            <p className="text-lg text-warm-white/60 max-w-2xl leading-relaxed">
              15 minutes. No sales pitch. Just a straightforward conversation
              about your funding situation and what your realistic options are.
            </p>
          </SectionReveal>
        </div>
      </section>

      <GoldLine className="container" />

      {/* Booking form */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact details */}
              <div>
                <h3
                  className="text-lg font-semibold mb-4 text-warm-white flex items-center gap-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Your Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-warm-white/60 mb-1 block">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-dark-card border border-white/10 rounded-sm px-4 py-3 text-warm-white placeholder:text-warm-white/30 focus:border-gold/40 focus:outline-none transition-colors"
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
                      className="w-full bg-dark-card border border-white/10 rounded-sm px-4 py-3 text-warm-white placeholder:text-warm-white/30 focus:border-gold/40 focus:outline-none transition-colors"
                      placeholder="you@company.co.uk"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-warm-white/60 mb-1 block">Company</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full bg-dark-card border border-white/10 rounded-sm px-4 py-3 text-warm-white placeholder:text-warm-white/30 focus:border-gold/40 focus:outline-none transition-colors"
                      placeholder="Your company"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-warm-white/60 mb-1 block">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-dark-card border border-white/10 rounded-sm px-4 py-3 text-warm-white placeholder:text-warm-white/30 focus:border-gold/40 focus:outline-none transition-colors"
                      placeholder="07xxx xxxxxx"
                    />
                  </div>
                </div>
              </div>

              {/* Date selection */}
              <div>
                <h3
                  className="text-lg font-semibold mb-4 text-warm-white flex items-center gap-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  <Calendar size={18} className="text-gold" />
                  Preferred Date
                </h3>
                <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-7 gap-2">
                  {businessDays.map((day) => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => setFormData({ ...formData, preferredDate: day })}
                      className={`p-3 rounded-sm text-center text-sm transition-all duration-200 ${
                        formData.preferredDate === day
                          ? "bg-gold/20 border border-gold/40 text-gold"
                          : "glass-card hover:border-gold/20 text-warm-white/60 hover:text-warm-white"
                      }`}
                    >
                      {formatDate(day)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time selection */}
              <div>
                <h3
                  className="text-lg font-semibold mb-4 text-warm-white flex items-center gap-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  <Clock size={18} className="text-gold" />
                  Preferred Time
                </h3>
                <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-9 gap-2">
                  {TIME_SLOTS.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setFormData({ ...formData, preferredTime: time })}
                      className={`p-2.5 rounded-sm text-center text-sm transition-all duration-200 ${
                        formData.preferredTime === time
                          ? "bg-gold/20 border border-gold/40 text-gold"
                          : "glass-card hover:border-gold/20 text-warm-white/60 hover:text-warm-white"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="text-sm text-warm-white/60 mb-1 block">
                  Anything you'd like us to know beforehand? (optional)
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={3}
                  className="w-full bg-dark-card border border-white/10 rounded-sm px-4 py-3 text-warm-white placeholder:text-warm-white/30 focus:border-gold/40 focus:outline-none transition-colors resize-none"
                  placeholder="Brief context about your funding needs..."
                />
              </div>

              {/* Submit */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button
                  type="submit"
                  disabled={bookingMutation.isPending}
                  className="flex-1 px-8 py-4 bg-gold text-dark font-semibold rounded-sm gold-glow hover:bg-gold-bright transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {bookingMutation.isPending ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <>
                      Book My Clarity Call
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </div>

              <p className="text-xs text-warm-white/30">
                We'll confirm your booking by email within 24 hours. If the time
                you've chosen isn't available, we'll suggest the nearest
                alternative.
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
