import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface FloatingElement {
  id: number;
  emoji: string;
  x: number;
  delay: number;
  duration: number;
  size: number;
}

const emojis = ["🌸", "💕", "✨", "🌷", "💗", "🌼", "💖", "🌺", "💫", "🌿"];

export const FloatingElements = () => {
  const [elements, setElements] = useState<FloatingElement[]>([]);

  useEffect(() => {
    const generated: FloatingElement[] = [];
    for (let i = 0; i < 15; i++) {
      generated.push({
        id: i,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        x: Math.random() * 100,
        delay: Math.random() * 10,
        duration: 15 + Math.random() * 10,
        size: 16 + Math.random() * 16,
      });
    }
    setElements(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {elements.map((el) => (
        <motion.div
          key={el.id}
          className="absolute"
          style={{
            left: `${el.x}%`,
            fontSize: `${el.size}px`,
          }}
          initial={{ y: "100vh", opacity: 0, rotate: 0 }}
          animate={{
            y: "-100px",
            opacity: [0, 1, 1, 0],
            rotate: 360,
          }}
          transition={{
            duration: el.duration,
            delay: el.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {el.emoji}
        </motion.div>
      ))}
    </div>
  );
};
