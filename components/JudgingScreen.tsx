
import React, { useContext } from 'react';
import { GameContext } from '../contexts/GameContext';
import GameHeader from './GameHeader';
import { GAME_PACKS_DATA } from '../constants';

const JudgingScreen: React.FC = () => {
  const { players, currentPlayerIndex, judgeIndex, submitJudgment, gamePack } = useContext(GameContext);
  
  const currentPlayer = players[currentPlayerIndex];
  const judge = judgeIndex !== null ? players[judgeIndex] : null;
  const packData = GAME_PACKS_DATA[gamePack];

  if (!judge || !currentPlayer) {
    return <div>Loading...</div>; // Should not happen
  }

  return (
    <div className="flex flex-col h-full w-full justify-center items-center relative animate-fadeIn">
      <GameHeader />
      
      <div className="text-center mb-10 mt-24">
        <h2 className="text-xl text-gray-300">
            Judge <span className="text-pink-400 font-bold">{judge.name}</span>, make your call!
        </h2>
        <p className="text-2xl font-bold mt-2">{packData.judgeTitle(currentPlayer.name)}</p>
      </div>
      
      <div className="space-y-4 w-full max-w-xs">
          <button 
            onClick={() => submitJudgment(true)}
            className="w-full bg-[#4a4566] hover:bg-pink-600 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors">
            {packData.positiveVote}
          </button>
          <button 
            onClick={() => submitJudgment(false)}
            className="w-full bg-[#4a4566] hover:bg-pink-600 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors">
            {packData.negativeVote}
          </button>
      </div>
    </div>
  );
};

export default JudgingScreen;
