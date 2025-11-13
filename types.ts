
export interface Player {
  id: number;
  name: string;
  assholeCount: number;
}

export enum GameScreen {
  SPLASH = 'SPLASH',
  SETUP = 'SETUP',
  GAME = 'GAME',
  JUDGING = 'JUDGING',
  LEADERBOARD = 'LEADERBOARD',
}

export enum GamePack {
  AITA = 'AITA',
  RELATIONSHIP = 'RELATIONSHIP',
  DATING = 'DATING',
  OFF_MY_CHEST = 'OFF_MY_CHEST',
}

export interface GameContextType {
  screen: GameScreen;
  setScreen: (screen: GameScreen) => void;
  players: Player[];
  setPlayers: (players: Player[]) => void;
  gameDuration: number;
  setGameDuration: (duration: number) => void;
  remainingTime: number;
  startGame: () => void;
  restartGame: () => void;
  currentPlayerIndex: number;
  judgeIndex: number | null;
  currentCard: string;
  finishTurn: () => void;
  submitJudgment: (isAsshole: boolean) => void;
  shuffledCards: string[];
  gamePack: GamePack;
  setGamePack: (pack: GamePack) => void;
}
