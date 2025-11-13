import React, { useContext } from 'react';
import { GameContext } from '../contexts/GameContext';
import { GAME_PACKS_DATA } from '../constants';
import { GamePack } from '../types';

const SetupScreen: React.FC = () => {
  const { players, setPlayers, gameDuration, setGameDuration, startGame, gamePack, setGamePack } = useContext(GameContext);
  
  const validPlayerCount = players.filter(p => p.name.trim() !== '').length;

  const handlePlayerNameChange = (id: number, name: string) => {
    setPlayers(players.map(p => (p.id === id ? { ...p, name } : p)));
  };

  const addPlayer = () => {
    if (players.length < 8) { // Max 8 players
      setPlayers([...players, { id: Date.now(), name: '', assholeCount: 0 }]);
    }
  };
  
  const removePlayer = (id: number) => {
    if(players.length > 2) {
      setPlayers(players.filter(p => p.id !== id));
    }
  };

  return (
    <div className="flex flex-col h-full p-6 bg-[#1e1b2e] rounded-3xl shadow-2xl animate-fadeIn">
      <header className="text-left mb-6 flex-shrink-0">
        <h1 className="text-3xl font-bold tracking-tighter">AITA?</h1>
        <p className="text-sm font-semibold text-pink-400 tracking-widest">CARD GAME</p>
      </header>
      
      <main className="flex-grow flex flex-col items-center text-center overflow-y-auto space-y-8 no-scrollbar">
        <div className="w-full">
            <div className="flex flex-col gap-4">
                {Object.entries(GAME_PACKS_DATA).map(([key, pack]) => (
                    <button 
                        key={key}
                        onClick={() => setGamePack(key as GamePack)}
                        className={`w-full p-4 rounded-xl transition-all duration-200 flex items-center space-x-4 text-left ${gamePack === key ? 'bg-pink-600 text-white shadow-lg ring-2 ring-pink-500/50' : 'bg-[#332f4a] hover:bg-[#4a4566]'}`}>
                        <div className={`flex-shrink-0 p-3 rounded-xl ${gamePack === key ? 'bg-white/20' : 'bg-black/20'}`}>
                            <pack.Icon className="w-8 h-8" />
                        </div>
                        <div>
                            <span className="font-bold text-lg block">{pack.title}</span>
                            <p className={`text-sm mt-1 leading-tight ${gamePack === key ? 'text-pink-100' : 'text-gray-400'}`}>
                                {pack.description}
                            </p>
                        </div>
                    </button>
                ))}
            </div>
        </div>

        <div className="w-full">
          <h3 className="text-lg font-semibold mb-3">Players</h3>
          <div className="w-full space-y-3">
            {players.map((player, index) => (
              <div key={player.id} className="flex items-center space-x-2">
                  <input
                      type="text"
                      placeholder={`Player ${index + 1}`}
                      value={player.name}
                      onChange={(e) => handlePlayerNameChange(player.id, e.target.value)}
                      className="w-full bg-[#332f4a] border-2 border-transparent focus:border-pink-500 focus:ring-0 rounded-lg px-4 py-2 text-white placeholder-gray-400 transition"
                  />
                  {players.length > 2 && (
                      <button onClick={() => removePlayer(player.id)} className="text-gray-500 hover:text-white transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                          </svg>
                      </button>
                  )}
              </div>
            ))}
          </div>
          <button 
            onClick={addPlayer}
            disabled={players.length >= 8}
            className="w-full mt-3 border-2 border-dashed border-gray-600 hover:border-pink-500 rounded-lg py-2 text-gray-400 hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed">
            + Add Player
          </button>
        </div>

        <div className="w-full">
            <h3 className="text-lg font-semibold mb-3">Game Duration</h3>
            <div className="grid grid-cols-3 gap-3">
                {[5, 10, 20].map(min => (
                    <button 
                        key={min}
                        onClick={() => setGameDuration(min * 60)}
                        className={`py-2 rounded-lg font-semibold transition ${gameDuration === min * 60 ? 'bg-pink-600 text-white' : 'bg-[#332f4a] hover:bg-pink-800'}`}>
                        {min} min
                    </button>
                ))}
            </div>
        </div>
      </main>

      <footer className="mt-auto pt-6 flex-shrink-0">
        <button 
          onClick={startGame}
          disabled={validPlayerCount < 2}
          className="w-full bg-[#4a4566] hover:bg-pink-600 rounded-lg py-3 text-lg font-bold transition disabled:opacity-50 disabled:cursor-not-allowed">
          Start Game ({validPlayerCount} players)
        </button>
      </footer>
    </div>
  );
};

export default SetupScreen;
