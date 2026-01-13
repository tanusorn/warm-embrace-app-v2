import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import backgroundImage from "@/assets/background-meadow.jpg";
import { FloatingElements } from "@/components/FloatingElements";
import { StoryCard } from "@/components/StoryCard";
import { NextButton, ChoiceButton } from "@/components/NextButton";
import { GiftBox } from "@/components/GiftBox";
import { PasswordInput } from "@/components/PasswordInput";
import { CameraCapture } from "@/components/CameraCapture";
import { Certificate } from "@/components/Certificate";
import { SoundToggle } from "@/components/SoundToggle";
import { useAudio } from "@/hooks/useAudio";
import sampleVideo from "@/assets/gift.mov";

// Sample video placeholder - you can replace with actual video

const Index = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);

  const {
    isMuted,
    hasInteracted,
    toggleMute,
    startMusicOnFirstInteraction,
    playSfx,
    fadeOutForFinal,
  } = useAudio();

  // Fade out music on final page
  useEffect(() => {
    if (currentPage === 18) {
      fadeOutForFinal();
    }
  }, [currentPage, fadeOutForFinal]);

  const handleFirstPageNext = () => {
    startMusicOnFirstInteraction();
    playSfx("knock");
    setCurrentPage(1);
  };

  const nextPage = () => {
    playSfx("pop");
    setCurrentPage((prev) => prev + 1);
  };

  const goToPage = (page: number) => {
    playSfx("pop");
    setCurrentPage(page);
  };

  const handlePhotoCapture = (imageData: string) => {
    setCapturedPhoto(imageData);
    playSfx("chime");
    setCurrentPage((prev) => prev + 1);
  };

  const handleGiftOpen = () => {
    playSfx("sparkle");
    setCurrentPage((prev) => prev + 1);
  };

  // Page content definitions
  const renderPage = () => {
    switch (currentPage) {
      case 0: // เช็คหัวใจ
        return (
          <StoryCard>
            <div className="flex flex-col items-center gap-6 py-4">
              <motion.div
                className="text-5xl"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                🤍
              </motion.div>
              <div className="text-center space-y-2">
                <p className="text-xl text-foreground">
                  เป็นไงบ้างวันนี้ โอเคมั้ยเอ่ย
                </p>
                <p className="text-2xl font-medium text-foreground">
                  คนเก่ง 🤍
                </p>
              </div>
              <div className="flex gap-4 mt-4">
                <ChoiceButton
                  onClick={nextPage}
                  label="YES 💕"
                  variant="primary"
                />
                <ChoiceButton
                  onClick={nextPage}
                  label="NO 🥺"
                  variant="secondary"
                />
              </div>
            </div>
          </StoryCard>
        );

      case 1:
        return (
          <StoryCard>
            <div className="flex flex-col items-center gap-6 py-8">
              <motion.div
                className="text-5xl"
                animate={{
                  scale: [1, 1.15, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                😊
              </motion.div>
              <div className="text-center space-y-2">
                <p className="text-xl text-foreground">เก่งมากเลย</p>
                <p className="text-xl text-foreground">ถ้าโอเคเเล้ว</p>
                <p className="text-2xl font-medium text-foreground">
                  ต้องยิ้มเยอะๆ น๊า 😊
                </p>
              </div>
              <NextButton onClick={nextPage} />
            </div>
          </StoryCard>
        );

      case 2: // หลักฐานรอยยิ้ม
        return (
          <StoryCard>
            <CameraCapture onCapture={handlePhotoCapture} />
          </StoryCard>
        );

      case 3: // การ์ดเกียรติบัติ
        return (
          <StoryCard variant="certificate">
            <Certificate
              photoUrl={capturedPhoto || "/placeholder.svg"}
              onAppear={() => playSfx("chime")}
            />
            <div className="flex justify-center mt-6">
              <NextButton onClick={nextPage} />
            </div>
          </StoryCard>
        );

      case 4: // ปิดท้ายหัวใจ
        return (
          <StoryCard>
            <div className="flex flex-col items-center gap-8 py-6">
              {/* Heart */}
              <motion.div
                className="text-5xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                💌
              </motion.div>

              {/* Message */}
              <div className="text-center space-y-5 max-w-md">
                <p className="text-xl text-foreground/80">แค่นี้แหละ</p>
                <p className="text-xl text-foreground/80">ที่อยากมากวน</p>

                <div className="h-3" />

                <p className="text-lg text-foreground/70">ยังไงก็สู้ๆ นะคับ</p>
                <p className="text-lg text-foreground/70">
                  ขอให้วันนี้เป็นวันที่ใจดีกับหนูน๊า
                </p>
                <p className="text-lg text-foreground/70">
                  ค่อยๆ ผ่านวันนี้ไปในแบบของหนู
                  <br />
                  สมกับที่พยายามมาอย่างหนักแล้ว 🤍
                </p>

                <div className="h-4" />

                {/* Soft affirmation */}
                <motion.p
                  className="text-2xl font-medium text-foreground leading-relaxed"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 1.2,
                    ease: "easeOut",
                  }}
                >
                  “พี่อยู่ข้างๆ หนูนะ ไม่ว่าผลจะเป็นยังไง หนูก็เก่งแล้ว
                  แค่พยายามมาถึงตรงนี้ ก็สุดยอดมากแล้ว 🤍”
                </motion.p>
              </div>

              {/* Final decorative flowers */}
              <motion.div
                className="flex gap-3 mt-2 text-3xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                {["🌸", "💗", "🌷", "💕", "🌺"].map((flower, i) => (
                  <motion.span
                    key={i}
                    animate={{
                      y: [0, -6, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      delay: i * 0.25,
                      ease: "easeInOut",
                    }}
                  >
                    {flower}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </StoryCard>
        );

      default:
        return (
          <StoryCard>
            <div className="flex flex-col items-center gap-6 py-8">
              <p className="text-xl text-center text-foreground">
                จบเเล้วคับ อิอิ🌸
              </p>
              <ChoiceButton
                onClick={() => goToPage(0)}
                label="เริ่มใหม่ 💕"
                variant="primary"
              />
            </div>
          </StoryCard>
        );
    }
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Soft overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-blue/20 via-transparent to-soft-green/30 pointer-events-none" />

      {/* Floating elements */}
      <FloatingElements />

      {/* Sound toggle */}
      <SoundToggle
        isMuted={isMuted}
        onToggle={toggleMute}
        hasInteracted={hasInteracted}
      />

      {/* Main content */}
      <div className="relative z-20 min-h-screen flex items-center justify-center p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Page indicator */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30">
        <div className="flex gap-1.5">
          {[...Array(19)].map((_, i) => (
            <motion.div
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === currentPage ? "bg-primary w-6" : "bg-primary/30"
              }`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.02 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
