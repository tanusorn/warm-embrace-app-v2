import { motion } from "framer-motion";
import { ReactNode } from "react";

interface StoryCardProps {
  children: ReactNode;
  variant?: "default" | "door" | "gift" | "certificate";
}

export const StoryCard = ({ children, variant = "default" }: StoryCardProps) => {
  const baseClasses = `
    relative w-[90vw] max-w-md mx-auto p-8 md:p-10
    rounded-3xl bg-card/95 backdrop-blur-sm
    shadow-card border border-blush-pink/30
  `;

  const variantClasses = {
    default: "",
    door: "border-4 border-dashed border-primary/40",
    gift: "border-2 border-warm-orange/50",
    certificate: "border-4 border-double border-primary/50 bg-gradient-to-br from-light-yellow/50 to-card",
  };

  return (
    <motion.div
      className={`${baseClasses} ${variantClasses[variant]}`}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ 
        opacity: 1, 
        y: 0, 
        scale: 1,
      }}
      exit={{ opacity: 0, y: -30, scale: 0.95 }}
      transition={{ 
        duration: 0.6, 
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      {/* Decorative corners */}
      <div className="absolute top-3 left-3 text-xl opacity-60">🌸</div>
      <div className="absolute top-3 right-3 text-xl opacity-60">🌷</div>
      <div className="absolute bottom-3 left-3 text-xl opacity-60">💕</div>
      <div className="absolute bottom-3 right-3 text-xl opacity-60">✨</div>
      
      {/* Floating animation wrapper */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};
