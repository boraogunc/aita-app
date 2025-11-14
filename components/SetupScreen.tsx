// components/SetupScreen.tsx
import React, { useContext } from "react";
import { GameContext } from "../contexts/GameContext";
import { GAME_PACKS_DATA } from "../constants";
import { GamePack } from "../types";

const SetupScreen: React.FC = () => {
  const {
    players,
    setPlayers,
    gameDuration,
    setGameDuration,
    startGame,
    gamePack,
    setGamePack,
  } = useContext(GameContext);

  const validPlayerCount = players.filter((p) => p.name.trim() !== "").length;

  const handlePlayerNameChange = (id: number, name: string) => {
    setPlayers(players.map((p) => (p.id === id ? { ...p, name } : p)));
  };

  const addPlayer = () => {
    if (players.length < 8) {
      setPlayers([
        ...players,
        { id: Date.now(), name: "", assholeCount: 0 },
      ]);
    }
  };

  const removePlayer = (id: number) => {
    if (players.length > 2) {
      setPlayers(players.filter((p) => p.id !== id));
    }
  };

  const durationOptions = [5, 10, 20]; // dakika

  return (
    <>
      {/* Top bar */}
      <header className="topbar">
        <div className="brand">
          <span className="logo">AITA?</span>
          <span className="sub">Storytelling party game</span>
        </div>
        <div className="toolbar">
          <div className="icon">🎴</div>
        </div>
      </header>

      {/* Ana panel */}
      <div className="panel">
        {/* Game modes */}
        <section className="section">
          <span className="label">Game mode</span>
          <div className="players">
            {Object.entries(GAME_PACKS_DATA).map(([key, pack]) => (
              <button
                key={key}
                type="button"
                onClick={() => setGamePack(key as GamePack)}
                className={`btn wide text-left seg-btn ${
                  gamePack === key ? "active" : ""
                }`}
                style={{ justifyContent: "flex-start" }}
              >
                <div>
                  <div className="name">{pack.title}</div>
                  <div className="small muted">{pack.description}</div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Players */}
        <section className="section">
          <span className="label">Players</span>
          <div className="players">
            {players.map((player, index) => (
              <div
                key={player.id}
                style={{ display: "flex", gap: 8, width: "100%" }}
              >
                <input
                  type="text"
                  className="input"
                  value={player.name}
                  onChange={(e) =>
                    handlePlayerNameChange(player.id, e.target.value)
                  }
                  placeholder={`Player ${index + 1}`}
                  // iOS zoom bug fix (font-size >= 16px)
                  style={{ fontSize: 16 }}
                />
                {players.length > 2 && (
                  <button
                    type="button"
                    onClick={() => removePlayer(player.id)}
                    className="btn ghost"
                    style={{ padding: "0 10px" }}
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addPlayer}
            disabled={players.length >= 8}
            className="btn wide ghost"
            style={{ marginTop: 8, borderStyle: "dashed" }}
          >
            + Add player
          </button>
        </section>

        {/* Duration */}
        <section className="section">
          <span className="label">Duration</span>
          <div className="seg">
            {durationOptions.map((min) => {
              const seconds = min * 60;
              const isActive = gameDuration === seconds;
              return (
                <button
                  key={min}
                  type="button"
                  onClick={() => setGameDuration(seconds)}
                  className={`seg-btn ${isActive ? "active" : ""}`}
                >
                  {min} min
                </button>
              );
            })}
          </div>
        </section>

        {/* Start button */}
        <section className="section">
          <button
            type="button"
            className="btn primary wide"
            onClick={startGame}
            disabled={validPlayerCount < 2}
          >
            Start game ({validPlayerCount} players)
          </button>

          <div className="howto">
            <h3>How it works</h3>
            <ul>
              <li>Pick a game mode.</li>
              <li>Add your friends’ names.</li>
              <li>Set the duration and press Start.</li>
              <li>
                Each player tells a story, everyone else decides if they’re the
                asshole.
              </li>
            </ul>
          </div>
        </section>
      </div>
    </>
  );
};

export default SetupScreen;
