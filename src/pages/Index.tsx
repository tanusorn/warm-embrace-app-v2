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
      case 0: // ประตูใจ
        return (
          <StoryCard variant="door">
            <div className="flex flex-col items-center gap-6 py-4">
              <motion.div
                className="text-6xl"
                animate={{
                  rotate: [-5, 5, -5],
                  x: [-2, 2, -2],
                }}
                transition={{
                  duration: 0.3,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
              >
                🚪
              </motion.div>
              <div className="text-center space-y-2">
                <motion.p
                  className="text-2xl font-medium text-foreground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  ก๊อกๆ
                </motion.p>
                <motion.p
                  className="text-xl text-foreground/80"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  มีใครอยู่อ้ะป่าวเอ่ย 🥺
                </motion.p>
              </div>
              <NextButton onClick={handleFirstPageNext} />
            </div>
          </StoryCard>
        );

      case 1:
        return (
          <StoryCard>
            <div className="flex flex-col items-center gap-6 py-8">
              <motion.div
                className="text-5xl"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                😢
              </motion.div>
              <p className="text-2xl text-center text-foreground font-medium">
                ท้อหรอคับ
              </p>
              <NextButton onClick={nextPage} />
            </div>
          </StoryCard>
        );

      case 2:
        return (
          <StoryCard>
            <div className="flex flex-col items-center gap-6 py-8">
              <motion.div
                className="text-5xl"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                😔
              </motion.div>
              <p className="text-2xl text-center text-foreground font-medium">
                เหนื่อยมากใช่ไหม
              </p>
              <NextButton onClick={nextPage} />
            </div>
          </StoryCard>
        );

      case 3:
        return (
          <StoryCard>
            <div className="flex flex-col items-center gap-6 py-8">
              <motion.div
                className="text-5xl"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                🌱
              </motion.div>
              <div className="text-center space-y-2">
                <p className="text-2xl text-foreground font-medium">
                  ไม่เป็นไรน๊า
                </p>
                <p className="text-xl text-foreground/80">
                  พี่รู้ว่าหนูพยายามเต็มที่เเล้ว
                </p>
              </div>
              <NextButton onClick={nextPage} />
            </div>
          </StoryCard>
        );

      case 4:
        return (
          <StoryCard>
            <div className="flex flex-col items-center gap-6 py-8">
              <motion.div
                className="text-5xl"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ⭐
              </motion.div>
              <p className="text-2xl text-center text-foreground font-medium">
                ทำดีมากเเล้วนะ
              </p>
              <NextButton onClick={nextPage} />
            </div>
          </StoryCard>
        );

      case 5:
        return (
          <StoryCard>
            <div className="flex flex-col items-center gap-6 py-8">
              <motion.div
                className="text-5xl"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                💭
              </motion.div>
              <p className="text-2xl text-center text-foreground font-medium">
                ถึงหนูจะบ่นว่าเหนื่อย
              </p>
              <NextButton onClick={nextPage} />
            </div>
          </StoryCard>
        );

      case 6:
        return (
          <StoryCard>
            <div className="flex flex-col items-center gap-6 py-8">
              <motion.div
                className="text-5xl"
                animate={{ scale: [1, 0.95, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                😣
              </motion.div>
              <p className="text-2xl text-center text-foreground font-medium">
                ถึงหนูจะไม่อยากอ่านเเล้ว
              </p>
              <NextButton onClick={nextPage} />
            </div>
          </StoryCard>
        );

      case 7:
        return (
          <StoryCard>
            <div className="flex flex-col items-center gap-6 py-8">
              <motion.div
                className="text-5xl"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                🌈
              </motion.div>
              <div className="text-center space-y-2">
                <p className="text-xl text-foreground/80">เเต่สุดท้าย</p>
                <p className="text-xl text-foreground/80">หนูก็อดทน</p>
                <p className="text-2xl text-foreground font-medium">
                  เเละหนูจะผ่านมันไปได้
                </p>
              </div>
              <NextButton onClick={nextPage} />
            </div>
          </StoryCard>
        );

      case 8:
        return (
          <StoryCard>
            <div className="flex flex-col items-center gap-6 py-8">
              <motion.div
                className="text-5xl"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                🤔
              </motion.div>
              <p className="text-2xl text-center text-foreground font-medium">
                หนูน่ะ…
              </p>
              <NextButton onClick={nextPage} />
            </div>
          </StoryCard>
        );

      case 9:
        return (
          <StoryCard>
            <div className="flex flex-col items-center gap-6 py-8">
              <motion.div
                className="text-6xl"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                💖
              </motion.div>
              <p className="text-2xl text-center text-foreground font-medium">
                เก่งมากเลยนะคับ
              </p>
              <NextButton onClick={nextPage} />
            </div>
          </StoryCard>
        );

      case 10: // กล่องของขวัญ
        return (
          <StoryCard variant="gift">
            <GiftBox onOpen={handleGiftOpen} />
          </StoryCard>
        );

      case 11: // Secret Gift
        return (
          <StoryCard>
            <div className="flex flex-col items-center gap-6 py-4">
              <motion.div
                className="text-5xl"
                animate={{
                  rotate: [-10, 10, -10],
                  y: [0, -5, 0],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🎀
              </motion.div>
              <div className="text-center space-y-3">
                <p className="text-2xl font-semibold text-foreground">
                  Secret Gift
                </p>
                <p className="text-lg text-foreground/80">อยากเปิดดูไหมเอ่ย</p>
              </div>
              <div className="flex gap-4 mt-4">
                <ChoiceButton
                  onClick={nextPage}
                  label="✔ เปิดเลย"
                  variant="primary"
                />
                <ChoiceButton
                  onClick={() => goToPage(14)}
                  label="✖ แอบเขิน"
                  variant="secondary"
                />
              </div>
            </div>
          </StoryCard>
        );

      case 12: // รหัสลับหัวใจ
        return (
          <StoryCard>
            <PasswordInput correctPassword="12102006" onSuccess={nextPage} />
          </StoryCard>
        );

      case 13: // วิดีโอ (ขนาดต้นฉบับจริง)
        return (
          <StoryCard>
            <div className="flex flex-col items-center gap-6">
              <p className="text-xl text-center text-foreground/80">
                ของขวัญพิเศษ 🎬
              </p>

              <motion.div
                className="rounded-2xl overflow-hidden shadow-card"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <video
                  src={sampleVideo}
                  controls
                  playsInline
                  preload="metadata"
                  className="block max-w-full h-auto"
                />
              </motion.div>

              <NextButton onClick={nextPage} />
            </div>
          </StoryCard>
        );

      case 14: // เช็คหัวใจ
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
                <p className="text-xl text-foreground">โอเคขึ้นรึยังเอ่ย</p>
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

      case 15:
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

      case 16: // หลักฐานรอยยิ้ม
        return (
          <StoryCard>
            <CameraCapture onCapture={handlePhotoCapture} />
          </StoryCard>
        );

      case 17: // การ์ดเกียรติบัติ
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

      case 18: // ปิดท้ายหัวใจ
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
