
import React, { useContext, useState } from 'react';
import { GameContext } from '../contexts/GameContext';
import RestartIcon from './icons/RestartIcon';
import Modal from './Modal';

const GameHeader: React.FC = () => {
    const { remainingTime, restartGame } = useContext(GameContext);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    const handleRestart = () => {
        setIsModalOpen(false);
        restartGame();
    }

    return (
        <>
            <header className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold tracking-tighter">AITA?</h1>
                    <p className="text-xs font-semibold text-pink-400 tracking-widest">CARD GAME</p>
                </div>
                <div className="flex items-center space-x-4">
                    <button onClick={() => setIsModalOpen(true)} className="text-gray-400 hover:text-white transition">
                        <RestartIcon className="w-6 h-6" />
                    </button>
                    <div className="bg-white/10 px-4 py-1 rounded-full text-lg font-mono font-semibold">
                        <span>{String(minutes).padStart(2, '0')}</span>:<span>{String(seconds).padStart(2, '0')}</span>
                    </div>
                </div>
            </header>
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleRestart}
                title="Restart Game?"
                message="Are you sure you want to end the current game and return to the main menu?"
            />
        </>
    );
}

export default GameHeader;
