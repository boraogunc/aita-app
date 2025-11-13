
import React, { useEffect, useContext } from 'react';
import { GameContext } from '../contexts/GameContext';
import { GameScreen } from '../types';

const SplashScreen: React.FC = () => {
  const { setScreen } = useContext(GameContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      setScreen(GameScreen.SETUP);
    }, 2000); // Show splash for 2 seconds

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full animate-fadeIn">
      <h1 className="text-8xl md:text-9xl font-extrabold tracking-tighter">AITA?</h1>
      <p className="text-xl md:text-2xl text-pink-400 tracking-widest mt-2">STORYTELLING PARTY GAME</p>
    </div>
  );
};

export default SplashScreen;
