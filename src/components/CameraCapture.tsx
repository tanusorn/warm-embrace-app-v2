import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useCallback } from "react";
import { Camera } from "lucide-react";
import { NextButton, ChoiceButton } from "./NextButton";

interface CameraCaptureProps {
  onCapture: (imageData: string) => void;
}

export const CameraCapture = ({ onCapture }: CameraCaptureProps) => {
  const [isCapturing, setIsCapturing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 🔍 Detect Safari iOS / WebView
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  const useFileCapture = isIOS && isSafari;

  // ======================
  // 📷 Desktop / Android
  // ======================
  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "user" } },
        audio: false,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = async () => {
          await videoRef.current?.play();
          setIsCapturing(true);
        };
      }
    } catch (err) {
      console.error("Camera error:", err);
      alert("ไม่สามารถเปิดกล้องได้");
    }
  }, []);

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setIsCapturing(false);
  }, []);

  const capture = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);

    const image = canvas.toDataURL("image/jpeg", 0.8);
    setCapturedImage(image);
    stopCamera();
  }, [stopCamera]);

  // ======================
  // 🍎 Safari iOS
  // ======================
  const openSafariCamera = () => {
    fileInputRef.current?.click();
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setCapturedImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // ======================
  // Common
  // ======================
  const retake = () => {
    setCapturedImage(null);
    if (!useFileCapture) startCamera();
  };

  const confirmPhoto = () => {
    if (!capturedImage) return;
    setIsLoading(true);
    setTimeout(() => onCapture(capturedImage), 2000);
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <motion.div
        className="text-3xl"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        📸
      </motion.div>

      <p className="text-lg text-center text-foreground/80">
        ขอดูรอยยิ้มหน่อยได้ไหม
      </p>

      <AnimatePresence mode="wait">
        {!isCapturing && !capturedImage && !isLoading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <NextButton
              onClick={() =>
                useFileCapture ? openSafariCamera() : startCamera()
              }
              icon={<Camera className="w-6 h-6" />}
              label="เปิดกล้อง 📷"
            />
          </motion.div>
        )}

        {isCapturing && (
          <motion.div
            className="flex flex-col items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="w-48 h-48 rounded-3xl overflow-hidden border-4">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover scale-x-[-1]"
              />
            </div>
            <NextButton onClick={capture} label="ถ่ายเลย! 📸" />
          </motion.div>
        )}

        {capturedImage && !isLoading && (
          <motion.div
            className="flex flex-col items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="w-48 h-48 rounded-3xl overflow-hidden border-4">
              <img
                src={capturedImage}
                className="w-full h-full object-cover scale-x-[-1]"
              />
            </div>
            <div className="flex gap-3">
              <ChoiceButton
                onClick={retake}
                label="ถ่ายใหม่"
                variant="secondary"
              />
              <ChoiceButton
                onClick={confirmPhoto}
                label="น่ารักมาก! 💕"
                variant="primary"
              />
            </div>
          </motion.div>
        )}

        {isLoading && (
          <motion.div animate={{ opacity: [0, 1] }}>
            💗💗💗
            <p>กำลังเตรียมของขวัญ...</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Safari camera */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="user"
        className="hidden"
        onChange={onFileChange}
      />

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};
