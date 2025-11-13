
import React, { useContext } from 'react';
import { GameContext } from './contexts/GameContext';
import SplashScreen from './components/SplashScreen';
import SetupScreen from './components/SetupScreen';
import GameScreen from './components/GameScreen';
import JudgingScreen from './components/JudgingScreen';
import LeaderboardScreen from './components/LeaderboardScreen';
import { GameScreen as Screen } from './types';

const App: React.FC = () => {
  const { screen } = useContext(GameContext);

  const renderScreen = () => {
    switch (screen) {
      case Screen.SPLASH:
        return <SplashScreen />;
      case Screen.SETUP:
        return <SetupScreen />;
      case Screen.GAME:
        return <GameScreen />;
      case Screen.JUDGING:
        return <JudgingScreen />;
      case Screen.LEADERBOARD:
        return <LeaderboardScreen />;
      default:
        return <SplashScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#12121c] to-[#2a1a3d] flex flex-col items-center justify-center p-4">
      <div className="relative w-full max-w-md mx-auto h-[80vh] min-h-[600px] md:h-auto md:min-h-0">
         {renderScreen()}
      </div>
    </div>
  );
};

export default App;
