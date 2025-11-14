// components/SplashScreen.tsx
import React, { useEffect, useContext } from "react";
import { GameContext } from "../contexts/GameContext";
import { GameScreen } from "../types";

const SplashScreen: React.FC = () => {
  const { setScreen } = useContext(GameContext);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setScreen(GameScreen.SETUP);
    }, 2000);

    return () => window.clearTimeout(timer);
  }, [setScreen]);

  return (
    <div className="splash-card center">
      <div className="devil">😈</div>
      <div className="hero">AITA? Card Game</div>
      <p className="small muted">
        Storytelling party game inspired by the internet’s favorite question:
        <br />
        <strong>“Am I the A*shole?”</strong>
      </p>
    </div>
  );
};

export default SplashScreen;
