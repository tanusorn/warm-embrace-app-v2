import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useCallback } from "react";
import { Camera, RotateCcw } from "lucide-react";
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

  const startCamera = useCallback(async () => {
    try {
      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: { ideal: "user" }, // Safari friendly
        },
        audio: false,
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;

        // ✅ สำคัญมากสำหรับ Safari
        videoRef.current.onloadedmetadata = async () => {
          try {
            await videoRef.current?.play();
            setIsCapturing(true);
          } catch (err) {
            console.error("Video play failed:", err);
          }
        };
      }
    } catch (err) {
      console.error("Camera access denied:", err);
      alert(
        "ไม่สามารถเปิดกล้องได้ กรุณาใช้ Safari เวอร์ชันล่าสุด หรือเปิดผ่าน HTTPS"
      );
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCapturing(false);
  }, []);

  const capture = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0);
        const imageData = canvas.toDataURL("image/jpeg", 0.8);
        setCapturedImage(imageData);
        stopCamera();
      }
    }
  }, [stopCamera]);

  const retake = () => {
    setCapturedImage(null);
    startCamera();
  };

  const confirmPhoto = () => {
    if (capturedImage) {
      setIsLoading(true);
      setTimeout(() => {
        onCapture(capturedImage);
      }, 2000);
    }
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

      <p className="text-lg text-center text-foreground/80 leading-relaxed">
        ขอดูรอยยิ้มหน่อยได้ไหม
      </p>

      <AnimatePresence mode="wait">
        {!isCapturing && !capturedImage && !isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <NextButton
              onClick={startCamera}
              icon={<Camera className="w-6 h-6" />}
              label="เปิดกล้อง 📷"
            />
          </motion.div>
        )}

        {isCapturing && (
          <motion.div
            className="flex flex-col items-center gap-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <div className="relative w-48 h-48 rounded-3xl overflow-hidden shadow-card border-4 border-blush-pink/50">
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
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <div className="relative w-48 h-48 rounded-3xl overflow-hidden shadow-card border-4 border-primary/50">
              <img
                src={capturedImage}
                alt="Captured smile"
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
          <motion.div
            className="flex flex-col items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="flex gap-2 text-3xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              💗💗💗
            </motion.div>
            <p className="text-muted-foreground">กำลังเตรียมของขวัญ...</p>
          </motion.div>
        )}
      </AnimatePresence>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};
