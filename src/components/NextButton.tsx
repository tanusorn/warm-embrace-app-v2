import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface NextButtonProps {
  onClick: () => void;
  label?: string;
  icon?: React.ReactNode;
}

export const NextButton = ({ onClick, label, icon }: NextButtonProps) => {
  return (
    <motion.button
      onClick={onClick}
      className="
        mt-8 px-10 py-5 min-w-[100px]
        bg-gradient-to-br from-pink-400 via-rose-400 to-pink-500
        text-white font-bold text-xl
        rounded-full shadow-xl
        flex items-center justify-center gap-2
        border-4 border-white/50
        hover:shadow-2xl hover:from-pink-500 hover:to-rose-500 
        transition-all duration-300
      "
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.4 }}
    >
      {label || (icon || <Check className="w-7 h-7" strokeWidth={3} />)}
    </motion.button>
  );
};

export const ChoiceButton = ({ 
  onClick, 
  label, 
  variant = "primary" 
}: { 
  onClick: () => void; 
  label: string; 
  variant?: "primary" | "secondary";
}) => {
  const variants = {
    primary: "bg-gradient-to-br from-pink-400 via-rose-400 to-pink-500 text-white border-4 border-white/50",
    secondary: "bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700 border-4 border-gray-300",
  };

  return (
    <motion.button
      onClick={onClick}
      className={`
        px-8 py-4 min-w-[140px]
        font-bold text-lg
        rounded-full shadow-lg
        ${variants[variant]}
        hover:shadow-xl hover:brightness-105 transition-all duration-300
      `}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
    >
      {label}
    </motion.button>
  );
};
