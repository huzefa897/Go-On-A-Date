import React, { createContext, useContext, useRef, useState, useEffect } from "react";

// Create Global Context
const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const backgroundImageUrl = "https://i.makeagif.com/media/1-19-2022/pS7gEY.gif";
  const backgroundMusicUrl = "/Go-On-A-Date/bg-music.mp3";

  /**
   * Toggle Mute Function
   */
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(audioRef.current.muted);
    }
  };

  /**
   * Play Background Music After User Interaction
   */
  useEffect(() => {
    const handleInteraction = () => {
      if (!hasInteracted && audioRef.current) {
        audioRef.current.play().catch((err) => {
          console.warn("Audio play prevented by browser:", err.message);
        });
        setHasInteracted(true);
      }
    };

    window.addEventListener("click", handleInteraction);
    window.addEventListener("keydown", handleInteraction);

    return () => {
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
    };
  }, [hasInteracted]);

  /**
   * Global Keyboard Event Listener for 'M' Key
   */
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "m" || e.key === "M") {
        toggleMute();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <GlobalContext.Provider value={{ backgroundImageUrl, isMuted, toggleMute }}>
      {children}

      {/* Global Audio Element */}
      <audio ref={audioRef} src={backgroundMusicUrl} loop />
    </GlobalContext.Provider>
  );
};

// Custom Hook to Access Context
export const useGlobalContext = () => useContext(GlobalContext);
