import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { NextButton } from "./NextButton";

interface PasswordInputProps {
  onSuccess: () => void;
  correctPassword: string;
}

export const PasswordInput = ({
  onSuccess,
  correctPassword,
}: PasswordInputProps) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = () => {
    if (password === correctPassword) {
      setSuccess(true);
      setError(false);
      setTimeout(onSuccess, 1500);
    } else {
      setError(true);
      setPassword("");
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <motion.div
        className="text-4xl"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        🔐
      </motion.div>

      <p className="text-lg text-center text-foreground/80">รหัสลับอะไรเอ่ย?</p>

      <p className="text-sm text-muted-foreground text-center">
        ใบ้ให้… วันเดือนปีเกิด 💭
      </p>

      <motion.input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="ใส่รหัสลับ..."
        className="
          w-full max-w-[200px] px-6 py-4
          text-center text-xl tracking-widest
          bg-muted/50 border-2 border-blush-pink/40
          rounded-2xl outline-none
          focus:border-primary focus:shadow-glow
          transition-all duration-300
          placeholder:text-muted-foreground/50
        "
        animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
        transition={{ duration: 0.4 }}
      />

      <AnimatePresence mode="wait">
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-destructive text-center"
          >
            อุ้ย… ลองใหม่น้า 💗
          </motion.p>
        )}

        {success && (
          <motion.p
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-soft-green text-center text-lg font-medium"
          >
            ถูกต้องเเล้วคับ 💕
          </motion.p>
        )}
      </AnimatePresence>

      {!success && <NextButton onClick={handleSubmit} label="ยืนยัน 💝" />}
    </div>
  );
};
