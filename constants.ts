// constants.ts sonuna ekle

export const OFF_MY_CHEST_CARDS: string[] = [
  "Say something you've been wanting to get off your chest for years.",
  "Tell us about a time you pretended everything was fine, but it really wasn’t.",
  "Share a secret opinion you have that most people around you would disagree with.",
  "Talk about a moment you still feel guilty about — even if nobody knows.",
  "Tell us about a time you lied to protect someone’s feelings.",
];

export const GAME_PACKS_DATA: Record<
  GamePack,
  {
    title: string;
    description: string;
    cards: string[];
    judgeTitle: (playerName: string) => string;
    positiveVote: string;
    negativeVote: string;
    winnerTitle: string;
  }
> = {
  [GamePack.AITA]: {
    title: "AITA? dilemmas",
    description: "Real-life ‘Am I the A*shole?’ style situations.",
    cards: AITA_CARDS,
    judgeTitle: (name: string) =>
      `Listen carefully to ${name}'s story. Are they the asshole or not?`,
    positiveVote: "They’re the asshole 😈",
    negativeVote: "Not the asshole 😇",
    winnerTitle: "Biggest Asshole of the Night",
  },
  [GamePack.RELATIONSHIP]: {
    title: "Relationship advice",
    description: "Give brutally honest relationship advice.",
    cards: RELATIONSHIP_ADVICE_CARDS,
    judgeTitle: (name: string) =>
      `Judge ${name}'s advice. Would you actually follow it?`,
    positiveVote: "Good advice 👍",
    negativeVote: "Terrible advice 👎",
    winnerTitle: "Most Questionable Therapist",
  },
  [GamePack.DATING]: {
    title: "Dating stories",
    description: "Tell your wildest dating stories.",
    cards: DATING_CARDS,
    judgeTitle: (name: string) =>
      `Did ${name}'s story make them sound like a catch or a walking red flag?`,
    positiveVote: "Green flag 💚",
    negativeVote: "Red flag 🚩",
    winnerTitle: "Walking Red Flag of the Night",
  },
  [GamePack.OFF_MY_CHEST]: {
    title: "Off my chest",
    description: "Confessions you’ve never said out loud.",
    cards: OFF_MY_CHEST_CARDS,
    judgeTitle: (name: string) =>
      `Did ${name}'s confession make you respect them more, or less?`,
    positiveVote: "Respect went up ⬆️",
    negativeVote: "Respect went down ⬇️",
    winnerTitle: "Most Unhinged Confessor",
  },
};
