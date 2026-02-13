import { AlertTriangle } from "lucide-react";

/**
 * "We are not a lender" disclaimer block.
 * Place on quiz, booking, guide, and contact pages.
 */
export default function Disclaimer({ className = "" }: { className?: string }) {
  return (
    <div
      className={`border border-gold/15 bg-dark-card/50 rounded-sm px-6 py-4 flex items-start gap-4 ${className}`}
    >
      <AlertTriangle size={20} className="text-gold-dim shrink-0 mt-0.5" />
      <div>
        <p
          className="text-sm text-warm-white/80 leading-relaxed"
          style={{ fontFamily: "var(--font-body)" }}
        >
          <strong className="text-warm-white">Important:</strong> Funding Clarity
          is not a lender. We do not make lending decisions or guarantee funding
          approval. We provide guidance and connect you with suitable lenders based
          on your circumstances. All funding is subject to the lender's own
          assessment and approval criteria.
        </p>
      </div>
    </div>
  );
}
