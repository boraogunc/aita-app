import React, { useMemo, useRef, useState, useEffect } from "react";
import "./styles.css";
import { CARDS } from "./cards";

// --- Constants ---
const MAX_PLAYERS = 20;
const DURATIONS = [5, 10, 20] as const;

// --- Helpers ---
const shuffle = <T,>(arr: T[]) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

// --- Types ---
type Phase = "splash" | "lobby" | "playing" | "judging" | "leaderboard";

// --- App ---
export default function App() {
  // global state
  const [phase, setPhase] = useState<Phase>("splash");
  const [players, setPlayers] = useState<string[]>(["Player 1", "Player 2"]);
  const [durationMin, setDurationMin] = useState<(typeof DURATIONS)[number]>(5);

  // game state
  const [order, setOrder] = useState<string[]>([]);
  const [idx, setIdx] = useState(0); // whose turn index in order
  const [deck, setDeck] = useState<string[]>([]);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [currentCard, setCurrentCard] = useState<string>("");
  const [judge, setJudge] = useState<string | null>(null);

  // timer
  const timerRef = useRef<number | null>(null);
  useEffect(() => {
    if (phase === "playing" || phase === "judging") {
      if (!secondsLeft) return;
      timerRef.current = window.setInterval(() => {
        setSecondsLeft((s) => {
          if (s <= 1) {
            // time up -> leaderboard
            clearTimer();
            setPhase("leaderboard");
            return 0;
          }
          return s - 1;
        });
      }, 1000) as unknown as number;
      return () => clearTimer();
    }
  }, [phase, secondsLeft]);

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // derived
  const timeMMSS = useMemo(() => {
    const m = Math.floor(secondsLeft / 60)
      .toString()
      .padStart(1, "0");
    const s = (secondsLeft % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }, [secondsLeft]);

  // actions
  const addPlayer = () => {
    if (players.length >= MAX_PLAYERS) return;
    setPlayers((p) => [...p, `Player ${p.length + 1}`]);
  };

  const updatePlayer = (i: number, name: string) => {
    setPlayers((p) => {
      const copy = [...p];
      copy[i] = name;
      return copy;
    });
  };

  const removeEmpty = () =>
    setPlayers((p) => p.filter((x) => x.trim() !== "").slice(0, MAX_PLAYERS));

  const startGame = () => {
    const cleaned = players
      .map((p) => p.trim())
      .filter(Boolean)
      .slice(0, MAX_PLAYERS);
    if (cleaned.length < 2) return;

    const scoreInit: Record<string, number> = {};
    cleaned.forEach((n) => (scoreInit[n] = 0));

    setScores(scoreInit);
    setOrder(shuffle(cleaned));
    setIdx(0);
    setDeck(shuffle(CARDS));
    setSecondsLeft(durationMin * 60);
    setPhase("playing");

    // first card
    const first = CARDS[0];
    setCurrentCard(first);
    setDeck((d) => shuffle(d.slice(1)));
    setJudge(null);
  };

  const restartConfirm = () => {
    const ok = window.confirm(
      "Restart the game? You will go back to the home screen."
    );
    if (ok) hardReset();
  };

  const hardReset = () => {
    clearTimer();
    setPhase("lobby");
    setOrder([]);
    setIdx(0);
    setDeck([]);
    setSecondsLeft(0);
    setScores({});
    setCurrentCard("");
    setJudge(null);
  };

  const nextTurn = () => {
    // pick random judge different from current player
    const current = order[idx];
    const candidates = order.filter((n) => n !== current);
    const j = candidates[Math.floor(Math.random() * candidates.length)];
    setJudge(j);
    setPhase("judging");
  };

  const recordJudgement = (isAsshole: boolean) => {
    const current = order[idx];
    if (isAsshole) {
      setScores((s) => ({ ...s, [current]: (s[current] ?? 0) + 1 }));
    }
    // new card / next player
    const nxtIdx = (idx + 1) % order.length;
    setIdx(nxtIdx);
    setJudge(null);

    // draw next card
    if (deck.length === 0) setDeck(shuffle(CARDS));
    const [card, ...rest] = deck.length ? deck : shuffle(CARDS);
    setCurrentCard(card);
    setDeck(rest);

    setPhase("playing");
  };

  // replace %% with current player name
  const resolvedCard = useMemo(() => {
    const current = order[idx] ?? "Player";
    return currentCard.replaceAll("%%", current);
  }, [currentCard, order, idx]);

  // phases
  if (phase === "splash") {
    return (
      <div className="screen gradient">
        <header className="brand">
          <span className="logo">AITA?</span>
          <span className="sub">Storytelling Party Game</span>
        </header>

        <div className="splash-card">
          <div className="devil">😈</div>
          <h1 className="hero">Ready to find the biggest A*shole?</h1>
          <p className="muted">
            A fast, hilarious party game inspired by Reddit’s AITA culture. Tell
            your side, get judged, and crown the night’s biggest a*shole.
          </p>
          <button className="btn primary" onClick={() => setPhase("lobby")}>
            Start
          </button>
        </div>
      </div>
    );
  }

  if (phase === "lobby") {
    return (
      <div className="screen gradient">
        <TopBar minimal />

        <div className="panel">
          <h2 className="hero center">Ready to find the biggest A*shole?</h2>
          <p className="muted center small">
            Inspired by Reddit’s AITA. Add players, choose a duration, and
            start.
          </p>

          <div className="players">
            {players.map((p, i) => (
              <input
                key={i}
                value={p}
                placeholder={`Player ${i + 1}`}
                onChange={(e) => updatePlayer(i, e.target.value)}
                onBlur={removeEmpty}
                className="input"
              />
            ))}
          </div>

          <button className="btn ghost" onClick={addPlayer}>
            + Add Player
          </button>

          <div className="section">
            <label className="label">Game Duration</label>
            <div className="seg">
              {DURATIONS.map((m) => (
                <button
                  key={m}
                  className={`seg-btn ${durationMin === m ? "active" : ""}`}
                  onClick={() => setDurationMin(m)}
                >
                  {m} min
                </button>
              ))}
            </div>
          </div>

          <button className="btn primary wide" onClick={startGame}>
            Start Game ({players.filter((x) => x.trim()).length} players)
          </button>

          <div className="howto">
            <h3>How to Play</h3>
            <ul>
              <li>Draw a card. It targets %% (the active player).</li>
              <li>Tell your story and defend why you’re right.</li>
              <li>We pick a random Judge to decide: YTA or NTA.</li>
              <li>When time’s up, leaderboard reveals the biggest A*shole.</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  if (phase === "playing") {
    const current = order[idx];
    return (
      <div className="screen gradient">
        <TopBar time={timeMMSS} onRestart={restartConfirm} />

        <main className="stage">
          <p className="turn">
            <span className="muted">Your Turn,</span>{" "}
            <strong className="name">{current}!</strong>
          </p>

          <div className="card">
            <p className="card-text">{resolvedCard}</p>
            <button className="btn primary" onClick={nextTurn}>
              Finish
            </button>
          </div>
        </main>
      </div>
    );
  }

  if (phase === "judging" && judge) {
    const current = order[idx];
    return (
      <div className="screen gradient">
        <TopBar time={timeMMSS} onRestart={restartConfirm} />
        <main className="stage">
          <p className="turn">
            <strong className="name">Judge {judge}</strong>{" "}
            <span className="muted">decides for</span>{" "}
            <strong className="name">{current}</strong>
          </p>

          <div className="card judge">
            <p className="card-text small">
              Is <strong>{current}</strong> the a*shole?
            </p>
            <div className="row">
              <button
                className="btn equal yta"
                onClick={() => recordJudgement(true)}
              >
                You’re The A*shole
              </button>
              <button
                className="btn equal nta"
                onClick={() => recordJudgement(false)}
              >
                Not An A*shole
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // leaderboard
  const board = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .map(([name, sc], i) => ({ name, sc, i }));

  return (
    <div className="screen gradient">
      <TopBar minimal />
      <div className="panel">
        <h2 className="hero center">Leaderboard</h2>
        <ol className="board">
          {board.map(({ name, sc, i }) => (
            <li key={name} className={i === 0 ? "first" : ""}>
              <span>{name}</span>
              <b>{sc}</b>
            </li>
          ))}
        </ol>
        <button className="btn primary wide" onClick={hardReset}>
          Play Again
        </button>
      </div>
    </div>
  );
}

// --- UI bits ---
function TopBar({
  time,
  onRestart,
  minimal,
}: {
  time?: string;
  onRestart?: () => void;
  minimal?: boolean;
}) {
  return (
    <div className="topbar">
      <div className="brand">
        <span className="logo">AITA?</span>
        <span className="sub">Card Game</span>
      </div>
      {!minimal && (
        <div className="toolbar">
          <div className="timer">{time}</div>
          <button className="icon" aria-label="Restart" onClick={onRestart}>
            ↺
          </button>
        </div>
      )}
    </div>
  );
}
