import React, { useState } from "react";

function Header({ time, onRestart }: { time: string; onRestart: () => void }) {
  return (
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px"}}>
      <div style={{color:"white",fontWeight:900,fontSize:20}}>AITA?</div>
      <div style={{display:"flex",gap:12,alignItems:"center",color:"white"}}>
        <div>⏱ {time}</div>
        <button onClick={onRestart} aria-label="Restart">↻</button>
      </div>
    </div>
  );
}

export default function App(){
  const [screen,setScreen]=useState<"start"|"story"|"judge"|"leaderboard">("start");
  const [time,setTime]=useState("5:00");
  const [showConfirm,setShowConfirm]=useState(false);

  return (
    <div style={{minHeight:"100vh",background:"#0F1115",color:"#EAEAF0"}}>
      <Header time={time} onRestart={()=>setShowConfirm(true)} />

      {screen==="start" && (
        <div style={{padding:24}}>
          <h1 style={{fontWeight:900}}>Ready to find the biggest A*shole?</h1>
          <p>Storytelling party game inspired by Reddit’s AITA.</p>
          <button style={{padding:"14px 18px",background:"#FF4FB2",border:"none",borderRadius:10,color:"#fff",fontWeight:700}}
                  onClick={()=>setScreen("story")}>
            Start Game
          </button>
        </div>
      )}

      {screen==="story" && (
        <div style={{padding:24}}>
          <h2 style={{fontWeight:900}}>Your Turn, %%!</h2>
          <div style={{background:"#151922",borderRadius:12,padding:16,margin:"16px 0"}}>Tell your story prompt…</div>
          <button style={{padding:"12px 16px",background:"#FF4FB2",border:"none",borderRadius:10,color:"#fff",fontWeight:700}}
                  onClick={()=>setScreen("judge")}>Finish</button>
        </div>
      )}

      {screen==="judge" && (
        <div style={{padding:24}}>
          <h2 style={{fontWeight:900}}>Your call, %%!</h2>
          <p>Was %% the A*shole in this story?</p>
          <div style={{display:"grid",gap:12,maxWidth:360}}>
            <button style={{padding:"12px 16px",background:"#FF4FB2",border:"none",borderRadius:10,color:"#fff",fontWeight:800}}>A*SHOLE</button>
            <button style={{padding:"12px 16px",background:"transparent",border:"2px solid #FF4FB2",borderRadius:10,color:"#EAEAF0",fontWeight:800}}>NOT AN A*SHOLE</button>
          </div>
          <div style={{marginTop:16}}>
            <button onClick={()=>setScreen("leaderboard")} style={{padding:"10px 14px"}}>Continue</button>
          </div>
        </div>
      )}

      {screen==="leaderboard" && (
        <div style={{padding:24}}>
          <h2 style={{fontWeight:900}}>Game Over</h2>
          <ol>
            <li>Bora — 3 A* points</li>
            <li>Ece — 2 A* points</li>
          </ol>
          <button style={{padding:"12px 16px",background:"#FF4FB2",border:"none",borderRadius:10,color:"#fff",fontWeight:700}}
                  onClick={()=>setScreen("start")}>New Game</button>
        </div>
      )}

      {showConfirm && (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.6)",display:"grid",placeItems:"center"}}>
          <div style={{background:"#151922",padding:20,borderRadius:12,display:"grid",gap:12}}>
            <div>Are you sure you want to restart?</div>
            <div style={{display:"flex",gap:12}}>
              <button style={{border:"2px solid #FF4FB2",background:"transparent",color:"#EAEAF0",borderRadius:8,padding:"8px 12px"}} onClick={()=>setShowConfirm(false)}>Cancel</button>
              <button style={{background:"#FF4FB2",color:"#fff",border:"none",borderRadius:8,padding:"8px 12px"}} onClick={()=>{setShowConfirm(false);setScreen("start");}}>Restart</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
