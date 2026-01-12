import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface GiftBoxProps {
  onOpen: () => void;
}

export const GiftBox = ({ onOpen }: GiftBoxProps) => {
  const [isOpened, setIsOpened] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    if (!isOpened && !isAnimating) {
      setIsAnimating(true);
      // Short delay before opening animation
      setTimeout(() => {
        setIsOpened(true);
        setTimeout(onOpen, 4000);
      }, 300);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <AnimatePresence mode="wait">
        {!isOpened ? (
          <motion.div
            key="closed"
            className="relative cursor-pointer"
            onClick={handleClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            {/* Gift Box */}
            <motion.div
              className="relative"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Box Body */}
              <div className="w-40 h-32 bg-gradient-to-br from-primary to-blush-pink rounded-2xl shadow-card relative overflow-hidden">
                {/* Ribbon Vertical */}
                <div className="absolute left-1/2 -translate-x-1/2 w-8 h-full bg-light-yellow/80" />
                {/* Ribbon Horizontal */}
                <div className="absolute top-1/2 -translate-y-1/2 w-full h-8 bg-light-yellow/80" />
              </div>

              {/* Box Lid */}
              <motion.div
                className="absolute w-40 h-10 
             bg-gradient-to-br from-primary to-blush-pink
             rounded-xl shadow-lg"
                style={{
                  top: "-0.25rem", // แนบกับกล่อง
                  left: 0, // ชิดซ้ายกล่อง
                  transformOrigin: "center bottom",
                }}
                animate={
                  isOpened ? { rotateX: -75, y: -18 } : { rotateX: 0, y: 0 }
                }
                transition={{
                  duration: 0.9,
                  ease: "easeInOut",
                }}
              >
                {/* Ribbon on lid */}
                <div
                  className="absolute left-1/2 -translate-x-1/2 
                  w-8 h-full bg-light-yellow/80 rounded-t-lg"
                />
              </motion.div>

              {/* Bow */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-5xl">
                🎀
              </div>
            </motion.div>

            <p className="mt-6 text-xl text-foreground/80 text-center">
              มีอะไรให้ด้วยนะ 🎁
            </p>
            <p className="mt-2 text-sm text-muted-foreground">(แตะเพื่อเปิด)</p>
          </motion.div>
        ) : (
          <motion.div
            key="opened"
            className="flex flex-col items-center gap-4"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 0.3,
            }}
          >
            {/* Confetti */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl"
                initial={{
                  x: 0,
                  y: 0,
                  opacity: 1,
                  scale: 0,
                }}
                animate={{
                  x: (Math.random() - 0.5) * 200,
                  y: -100 - Math.random() * 100,
                  opacity: 0,
                  scale: 1,
                  rotate: Math.random() * 360,
                }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.05,
                  ease: "easeOut",
                }}
              >
                {["🌸", "💖", "✨", "🌷", "💕"][i % 5]}
              </motion.div>
            ))}

            <motion.div
              className="text-7xl"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 0.8,
                repeat: 2,
                ease: "easeInOut",
              }}
            >
              💐
            </motion.div>

            <motion.p
              className="text-xl text-center text-foreground leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              นี่คับกำลังใจ
              <br />
              สำหรับคนเก่ง
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
