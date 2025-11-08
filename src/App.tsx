import { useMemo, useState } from "react";
import { pickRandom, scenarioPrompts } from "./data/prompts";

type Screen = "welcome" | "players" | "round" | "vote" | "results";

export default function App() {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [players, setPlayers] = useState<string[]>([]);
  const [nameInput, setNameInput] = useState("");
  const [roundIndex, setRoundIndex] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState<string | null>(null);
  const [votes, setVotes] = useState<Record<string, number>>({}); // name -> score

  // Her turda rastgele bir oyuncu ve prompt seç
  const roundPrompt = useMemo(() => {
    const p = currentPlayer ?? "";
    const raw = pickRandom(scenarioPrompts);
    return raw.replaceAll("%%", p || "Player");
  }, [currentPlayer, roundIndex]);

  function addPlayer() {
    const clean = nameInput.trim();
    if (!clean) return;
    setPlayers((prev) => [...prev, clean]);
    setNameInput("");
  }

  function startGame() {
    if (players.length < 2) return alert("En az 2 oyuncu ekleyin.");
    setCurrentPlayer(players[0]);
    setScreen("round");
  }

  function vote(isAsshole: boolean) {
    if (currentPlayer && isAsshole) {
      setVotes((v) => ({ ...v, [currentPlayer]: (v[currentPlayer] ?? 0) + 1 }));
    }
    // sıradaki oyuncuya geç
    const idx = players.indexOf(currentPlayer || "");
    const nextIdx = (idx + 1) % players.length;
    const nextRound = idx + 1 === players.length; // tüm oyuncular oylanınca yeni tur
    if (nextRound) {
      // yeni tur
      setRoundIndex((r) => r + 1);
    }
    setCurrentPlayer(players[nextIdx]);
  }

  function reset() {
    setScreen("welcome");
    setPlayers([]);
    setVotes({});
    setRoundIndex(0);
    setCurrentPlayer(null);
  }

  return (
    <div className="container">
      {screen === "welcome" && (
        <Welcome onStart={() => setScreen("players")} />
      )}

      {screen === "players" && (
        <div className="card">
          <h1 className="title">Oyuncuları ekleyin</h1>
          <p className="sub">2–8 kişi önerilir</p>
          <div className="row">
            <input
              className="input"
              placeholder="İsim yazın ve Enter’a basın"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addPlayer()}
            />
            <button className="btn btn-pink" onClick={addPlayer}>
              Ekle
            </button>
          </div>
          <div className="spacer" />
          <div className="grid">
            {players.map((p) => (
              <div key={p} className="badge">
                {p}
              </div>
            ))}
          </div>
          <div className="spacer" />
          <div className="row">
            <button className="btn btn-ghost" onClick={reset}>
              Geri
            </button>
            <button className="btn btn-pink" onClick={startGame}>
              Oyunu Başlat
            </button>
          </div>
        </div>
      )}

      {screen === "round" && currentPlayer && (
        <div className="card">
          <div className="badge">{`Tur ${roundIndex + 1}`}</div>
          <h1 className="h1" style={{ marginTop: 8 }}>
            Sıra sende, {currentPlayer}!
          </h1>
          <p className="lead">Aşağıdaki senaryoyu anlatın; sonra oylayın.</p>
          <div className="spacer" />
          <div className="card">
            <div className="title">Senaryo</div>
            <div className="big">{roundPrompt}</div>
          </div>
          <div className="spacer" />
          <div className="row">
            <button className="btn btn-pink" onClick={() => vote(true)}>
              A*SHOLE
            </button>
            <button className="btn btn-ghost" onClick={() => vote(false)}>
              NOT AN A*SHOLE
            </button>
          </div>
          <div className="footer-space" />
          <div className="sub">
            Oy: suçlayan = +1 puan {currentPlayer}’a. Sonra sıradaki oyuncu.
          </div>
        </div>
      )}

      {screen === "results" && (
        <Results votes={votes} onRestart={reset} />
      )}
    </div>
  );
}

function Welcome({ onStart }: { onStart: () => void }) {
  return (
    <div className="card center" style={{ minHeight: 420, textAlign: "left" }}>
      <div>
        <h1 className="h1">Ready to find the biggest A*shole?</h1>
        <p className="lead">
          Reddit’in AITA’sından ilham alan hikâye anlatma parti oyunu.
        </p>
        <div className="spacer" />
        <button className="btn btn-pink" onClick={onStart}>
          Start Game
        </button>
      </div>
    </div>
  );
}

function Results({
  votes,
  onRestart,
}: {
  votes: Record<string, number>;
  onRestart: () => void;
}) {
  const entries = Object.entries(votes).sort((a, b) => (b[1] ?? 0) - (a[1] ?? 0));
  return (
    <div className="card">
      <h1 className="title">Sonuçlar</h1>
      <div className="spacer" />
      {entries.length === 0 ? (
        <p className="sub">Henüz oy yok.</p>
      ) : (
        entries.map(([name, score]) => (
          <div key={name} className="row" style={{ justifyContent: "space-between" }}>
            <div className="big">{name}</div>
            <div className="badge">{score} puan</div>
          </div>
        ))
      )}
      <div className="spacer" />
      <button className="btn btn-pink" onClick={onRestart}>
        Baştan Başla
      </button>
    </div>
  );
}
