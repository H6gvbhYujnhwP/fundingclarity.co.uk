import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface GoldLineProps {
  className?: string;
}

export default function GoldLine({ className = "" }: GoldLineProps) {
  const { ref, isVisible } = useScrollAnimation(0.5);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isVisible ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="gold-line w-full origin-left"
      />
    </div>
  );
}
