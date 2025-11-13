
import React, { useContext } from 'react';
import { GameContext } from '../contexts/GameContext';
import GameHeader from './GameHeader';

const GameScreen: React.FC = () => {
  const { players, currentPlayerIndex, currentCard, finishTurn } = useContext(GameContext);
  const currentPlayer = players[currentPlayerIndex];

  return (
    <div className="flex flex-col h-full w-full justify-center items-center relative animate-fadeIn">
      <GameHeader />

      <div className="text-center mb-8 mt-24">
        <h2 className="text-xl text-gray-300">Your Turn, <span className="text-pink-400 font-bold">{currentPlayer.name}!</span></h2>
        <p className="text-gray-400">Read the card and tell your story!</p>
      </div>

      <div className="bg-white text-gray-800 w-full max-w-sm h-64 p-8 rounded-2xl shadow-lg flex flex-col justify-center items-center text-center transform rotate-[-2deg]">
        <p className="text-lg font-medium leading-relaxed whitespace-pre-line">{currentCard}</p>
      </div>
      
      <button 
        onClick={finishTurn}
        className="mt-12 bg-pink-600 hover:bg-pink-700 text-white font-bold py-4 px-12 rounded-full text-lg shadow-lg transform hover:scale-105 transition-transform">
        Finish
      </button>
    </div>
  );
};

export default GameScreen;
