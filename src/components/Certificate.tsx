import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface CertificateProps {
  photoUrl: string;
  onAppear?: () => void;
}

export const Certificate = ({ photoUrl, onAppear }: CertificateProps) => {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    // Call onAppear when certificate appears
    onAppear?.();
    
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, [onAppear]);

  return (
    <motion.div
      className="relative w-full max-w-sm mx-auto"
      initial={{ opacity: 0, scale: 0.5, rotateY: 180 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ 
        duration: 1,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
    >
      {/* Confetti */}
      {showConfetti && (
        <>
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl z-20 pointer-events-none"
              style={{
                left: "50%",
                top: "50%",
              }}
              initial={{ 
                x: 0, 
                y: 0, 
                opacity: 1,
                scale: 0
              }}
              animate={{ 
                x: (Math.random() - 0.5) * 300, 
                y: (Math.random() - 0.5) * 300,
                opacity: 0,
                scale: 1,
                rotate: Math.random() * 720
              }}
              transition={{ 
                duration: 2, 
                delay: i * 0.05,
                ease: "easeOut"
              }}
            >
              {["🌸", "💖", "✨", "🎀", "💕", "🌷", "⭐", "🌼"][i % 8]}
            </motion.div>
          ))}
        </>
      )}
      
      {/* Certificate Card */}
      <div className="
        relative p-6 pt-8
        bg-gradient-to-br from-light-yellow/70 via-card to-blush-pink/30
        rounded-3xl shadow-card
        border-4 border-double border-primary/40
      ">
        {/* Decorative ribbon at top */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <motion.div
            className="text-4xl"
            animate={{ 
              rotate: [-5, 5, -5],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🎀
          </motion.div>
        </div>
        
        {/* Corner decorations */}
        <div className="absolute top-2 left-2 text-xl opacity-70">🌸</div>
        <div className="absolute top-2 right-2 text-xl opacity-70">🌷</div>
        <div className="absolute bottom-2 left-2 text-xl opacity-70">💕</div>
        <div className="absolute bottom-2 right-2 text-xl opacity-70">✨</div>
        
        {/* Content */}
        <div className="flex flex-col items-center gap-4 pt-4">
          <motion.p
            className="text-lg font-semibold text-primary"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            รางวัลดีเด่น 💐
          </motion.p>
          
          {/* Photo frame */}
          <motion.div
            className="relative w-32 h-32 rounded-full overflow-hidden shadow-card border-4 border-blush-pink/60"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, type: "spring" }}
          >
            <img
              src={photoUrl}
              alt="Certificate photo"
              className="w-full h-full object-cover scale-x-[-1]"
            />
            {/* Sparkle overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
          
          {/* Certificate text */}
          <motion.div
            className="text-center space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <p className="text-foreground font-medium leading-relaxed">
              เจ้าของความเก่ง<br />
              เเละความพยายาม
            </p>
          </motion.div>
          
          {/* Bottom decoration */}
          <motion.div
            className="flex gap-2 text-2xl mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}>🌸</motion.span>
            <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}>💖</motion.span>
            <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}>🌷</motion.span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
