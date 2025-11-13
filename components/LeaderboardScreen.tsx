
import React, { useContext } from 'react';
import { GameContext } from '../contexts/GameContext';
import { GAME_PACKS_DATA } from '../constants';

const LeaderboardScreen: React.FC = () => {
  const { players, restartGame, gamePack } = useContext(GameContext);
  const packData = GAME_PACKS_DATA[gamePack];

  const sortedPlayers = [...players].sort((a, b) => b.assholeCount - a.assholeCount);
  const winner = sortedPlayers[0];

  return (
    <div className="flex flex-col h-full w-full justify-center items-center p-6 bg-[#1e1b2e] rounded-3xl shadow-2xl animate-fadeIn">
        <header className="text-center mb-6">
            <h1 className="text-3xl font-bold">Time's Up!</h1>
            <p className="text-lg text-gray-400">The results are in...</p>
        </header>

        <div className="text-center my-6">
            <h2 className="text-xl text-pink-400">{packData.winnerTitle}</h2>
            <p className="text-5xl font-extrabold my-2">{winner.name}</p>
            <p className="text-gray-400">with {winner.assholeCount} votes!</p>
        </div>

        <div className="w-full flex-grow my-4 overflow-y-auto pr-2">
            <h3 className="text-center font-bold text-lg mb-2">Final Scores</h3>
            <ul className="space-y-2">
                {sortedPlayers.map((player, index) => (
                    <li key={player.id} className="flex justify-between items-center bg-white/5 p-3 rounded-lg">
                        <div className="flex items-center">
                           <span className="font-bold text-lg w-8">{index + 1}.</span>
                           <span className="font-semibold">{player.name}</span>
                        </div>
                        <span className="font-semibold text-pink-400">{player.assholeCount} votes</span>
                    </li>
                ))}
            </ul>
        </div>
      
        <button 
            onClick={restartGame}
            className="mt-auto w-full max-w-xs bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors">
            Play Again
        </button>
    </div>
  );
};

export default LeaderboardScreen;
