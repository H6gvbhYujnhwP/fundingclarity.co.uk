import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

/**
 * "Funding Clarity Framework" badge — reusable authority marker.
 * Shows the 4-question framework as a compact trust badge.
 */
export default function FrameworkBadge({ className = "" }: { className?: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`inline-flex items-center gap-3 border border-gold/20 bg-dark-card/80 backdrop-blur-sm rounded-sm px-5 py-3 ${className}`}
    >
      <div className="w-8 h-8 rounded-sm bg-gold/10 flex items-center justify-center shrink-0">
        <CheckCircle size={18} className="text-gold" />
      </div>
      <div>
        <p
          className="text-[10px] uppercase tracking-[0.25em] text-gold-dim leading-none mb-1"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Funding Clarity Framework
        </p>
        <p className="text-xs text-warm-white/50 leading-tight">
          4 Questions Answered Before You Apply
        </p>
      </div>
    </motion.div>
  );
}
