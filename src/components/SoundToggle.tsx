import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

interface SoundToggleProps {
  isMuted: boolean;
  onToggle: () => void;
  hasInteracted?: boolean;
}

export const SoundToggle = ({ isMuted, onToggle, hasInteracted = false }: SoundToggleProps) => {
  // Only show toggle after user has interacted
  if (!hasInteracted) return null;
  
  return (
    <motion.button
      onClick={onToggle}
      className="
        fixed top-4 right-4 z-[9999]
        w-14 h-14 rounded-full
        bg-white/95 backdrop-blur-md
        shadow-lg border-2 border-blush-pink
        flex items-center justify-center
        text-primary hover:text-blush-pink
        transition-colors duration-300
      "
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 200 }}
    >
      {isMuted ? (
        <VolumeX className="w-6 h-6" />
      ) : (
        <Volume2 className="w-6 h-6" />
      )}
    </motion.button>
  );
};
