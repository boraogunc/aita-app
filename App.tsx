// App.tsx
import React, { useContext } from "react";
import { GameContext } from "./contexts/GameContext";
import SplashScreen from "./components/SplashScreen";
import SetupScreen from "./components/SetupScreen";
import GameScreen from "./components/GameScreen";
import JudgingScreen from "./components/JudgingScreen";
import LeaderboardScreen from "./components/LeaderboardScreen";
import { GameScreen as Screen } from "./types";

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
        return <SetupScreen />;
    }
  };

  return <div className="gradient screen">{renderScreen()}</div>;
};

export default App;
