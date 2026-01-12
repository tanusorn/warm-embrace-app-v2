import { useRef, useState, useCallback, useEffect } from "react";

// Royalty-free audio URLs
const AUDIO_SOURCES = {
  //bgMusic: "/bg.mp3",
  knock: "https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3",
  pop: "/pop-402324.mp3",
  sparkle: "https://assets.mixkit.co/active_storage/sfx/1111/1111-preview.mp3",
  chime: "https://assets.mixkit.co/active_storage/sfx/2580/2580-preview.mp3",
};

export const useAudio = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const bgMusicRef = useRef<HTMLAudioElement | null>(null);
  const sfxRefs = useRef<Record<string, HTMLAudioElement>>({});

  // Initialize audio elements
  useEffect(() => {
    // Background music
    //const bgMusic = new Audio(AUDIO_SOURCES.bgMusic);
    //bgMusic.loop = true;
    //bgMusic.volume = 0;
    //bgMusicRef.current = bgMusic;

    // Sound effects (preload)
    Object.entries(AUDIO_SOURCES).forEach(([key, url]) => {
      if (key !== "bgMusic") {
        const sfx = new Audio(url);
        sfx.volume = 0.19;
        sfx.preload = "auto";
        sfxRefs.current[key] = sfx;
      }
    });

    return () => {
      if (bgMusicRef.current) {
        bgMusicRef.current.pause();
        bgMusicRef.current = null;
      }
      Object.values(sfxRefs.current).forEach((audio) => {
        audio.pause();
      });
      sfxRefs.current = {};
    };
  }, []);

  // Fade in music smoothly
  const fadeInMusic = useCallback(
    (audio: HTMLAudioElement, targetVolume: number, duration: number) => {
      audio.volume = 0;
      audio.play().catch(() => {});

      const steps = 20;
      const stepDuration = duration / steps;
      const volumeStep = targetVolume / steps;
      let currentStep = 0;

      const fadeInterval = setInterval(() => {
        currentStep++;
        audio.volume = Math.min(volumeStep * currentStep, targetVolume);

        if (currentStep >= steps) {
          clearInterval(fadeInterval);
        }
      }, stepDuration);
    },
    []
  );

  // Fade out music smoothly
  const fadeOutMusic = useCallback(
    (audio: HTMLAudioElement, duration: number) => {
      const startVolume = audio.volume;
      const steps = 20;
      const stepDuration = duration / steps;
      const volumeStep = startVolume / steps;
      let currentStep = 0;

      const fadeInterval = setInterval(() => {
        currentStep++;
        audio.volume = Math.max(startVolume - volumeStep * currentStep, 0);

        if (currentStep >= steps) {
          clearInterval(fadeInterval);
          audio.pause();
        }
      }, stepDuration);
    },
    []
  );

  // Start music on first interaction
  const startMusicOnFirstInteraction = useCallback(() => {
    if (!hasInteracted && bgMusicRef.current) {
      setHasInteracted(true);
      setIsMuted(false);
      fadeInMusic(bgMusicRef.current, 0.12, 2000);
    }
  }, [hasInteracted, fadeInMusic]);

  // Toggle mute
  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const newMuted = !prev;
      if (bgMusicRef.current && hasInteracted) {
        if (newMuted) {
          fadeOutMusic(bgMusicRef.current, 500);
        } else {
          fadeInMusic(bgMusicRef.current, 0.12, 500);
        }
      }
      return newMuted;
    });
  }, [hasInteracted, fadeInMusic, fadeOutMusic]);

  // Play sound effect
  const playSfx = useCallback(
    (sfxName: "knock" | "pop" | "sparkle" | "chime") => {
      if (isMuted || !hasInteracted) return;

      const sfx = sfxRefs.current[sfxName];
      if (sfx) {
        sfx.currentTime = 0;
        sfx.play().catch(() => {});
      }
    },
    [isMuted, hasInteracted]
  );

  // Fade out on final page
  const fadeOutForFinal = useCallback(() => {
    if (bgMusicRef.current && !isMuted) {
      fadeOutMusic(bgMusicRef.current, 3000);
    }
  }, [isMuted, fadeOutMusic]);

  return {
    isMuted,
    hasInteracted,
    toggleMute,
    startMusicOnFirstInteraction,
    playSfx,
    fadeOutForFinal,
  };
};
