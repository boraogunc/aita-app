
import React, { createContext, useState, useEffect, useRef, useCallback } from 'react';
import { Player, GameScreen, GameContextType, GamePack } from '../types';
import { GAME_PACKS_DATA } from '../constants';

// TypeScript'in window.goatcounter'ı tanıması için global tip tanımı.
declare global {
  interface Window {
    goatcounter?: {
      count: (vars: { path: string; title: string; event: boolean }) => void;
    };
  }
}

const defaultState: GameContextType = {
  screen: GameScreen.SPLASH,
  setScreen: () => {},
  players: [],
  setPlayers: () => {},
  gameDuration: 300,
  setGameDuration: () => {},
  remainingTime: 300,
  startGame: () => {},
  restartGame: () => {},
  currentPlayerIndex: 0,
  judgeIndex: null,
  currentCard: '',
  finishTurn: () => {},
  submitJudgment: () => {},
  shuffledCards: [],
  gamePack: GamePack.AITA,
  setGamePack: () => {},
};

export const GameContext = createContext<GameContextType>(defaultState);

const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [screen, setScreen] = useState<GameScreen>(GameScreen.SPLASH);
  const [players, setPlayers] = useState<Player[]>([
    { id: 1, name: '', assholeCount: 0 },
    { id: 2, name: '', assholeCount: 0 },
  ]);
  const [gameDuration, setGameDuration] = useState(300); // 5 minutes in seconds
  const [remainingTime, setRemainingTime] = useState(gameDuration);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [judgeIndex, setJudgeIndex] = useState<number | null>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [shuffledCards, setShuffledCards] = useState<string[]>([]);
  const [gamePack, setGamePack] = useState<GamePack>(GamePack.AITA);
  
  const timerRef = useRef<number | null>(null);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (screen === GameScreen.GAME || screen === GameScreen.JUDGING) {
      if (!timerRef.current) {
        timerRef.current = window.setInterval(() => {
          setRemainingTime(prev => {
            if (prev <= 1) {
              stopTimer();
              setScreen(GameScreen.LEADERBOARD);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }
    } else {
      stopTimer();
    }
    return () => stopTimer();
  }, [screen, stopTimer]);
  

  const startGame = () => {
    const validPlayers = players.filter(p => p.name.trim() !== '');
    if (validPlayers.length < 2) return;

    // Hangi oyun paketinin oynandığını takip etmek için GoatCounter olayı gönder.
    if (window.goatcounter && typeof window.goatcounter.count === 'function') {
      try {
        window.goatcounter.count({
          path: `play-${gamePack.toLowerCase()}`,
          title: `Oyun Paketi Oynandı: ${GAME_PACKS_DATA[gamePack].title}`,
          event: true,
        });
      } catch (error) {
        // Hata durumunda konsola yazdır ama uygulamanın çökmesini engelle.
        console.error("GoatCounter event tracking failed:", error);
      }
    }
    
    setPlayers(validPlayers.map(p => ({...p, assholeCount: 0})));
    setCurrentPlayerIndex(0);
    setRemainingTime(gameDuration);
    const newShuffledCards = shuffleArray(GAME_PACKS_DATA[gamePack].cards);
    setShuffledCards(newShuffledCards);
    setCurrentCardIndex(0);
    setScreen(GameScreen.GAME);
  };

  const restartGame = () => {
    setScreen(GameScreen.SETUP);
    setPlayers([
      { id: 1, name: '', assholeCount: 0 },
      { id: 2, name: '', assholeCount: 0 },
    ]);
    setGameDuration(300);
    setGamePack(GamePack.AITA);
  };
  
  const finishTurn = () => {
      const potentialJudges = players.map((_, index) => index).filter(i => i !== currentPlayerIndex);
      const randomJudge = potentialJudges[Math.floor(Math.random() * potentialJudges.length)];
      setJudgeIndex(randomJudge);
      setScreen(GameScreen.JUDGING);
  };

  const submitJudgment = (isAsshole: boolean) => {
    if (isAsshole) {
        const updatedPlayers = [...players];
        updatedPlayers[currentPlayerIndex].assholeCount += 1;
        setPlayers(updatedPlayers);
    }
    
    // Move to next player and card
    const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
    setCurrentPlayerIndex(nextPlayerIndex);
    setCurrentCardIndex(prev => (prev + 1) % shuffledCards.length);
    setJudgeIndex(null);
    setScreen(GameScreen.GAME);
  };

  const currentCard = shuffledCards.length > 0 ? shuffledCards[currentCardIndex].replace('%%', players[currentPlayerIndex]?.name || '') : '';
  
  return (
    <GameContext.Provider
      value={{
        screen,
        setScreen,
        players,
        setPlayers,
        gameDuration,
        setGameDuration,
        remainingTime,
        startGame,
        restartGame,
        currentPlayerIndex,
        judgeIndex,
        currentCard,
        finishTurn,
        submitJudgment,
        shuffledCards,
        gamePack,
        setGamePack,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
