import React, { useState } from "react";

const BG = "#0F1115";
const SURFACE = "#151922";
const TEXT = "#EAEAF0";
const ACCENT = "#FF4FB2";

function Header({ time, onRestart }: { time: string; onRestart: () => void }) {
  return (
    <div style={{
      display:"flex",justifyContent:"space-between",alignItems:"center",
      padding:"12px 16px", borderBottom:`1px solid #262B36`, position:"sticky", top:0, background:BG, zIndex:10
    }}>
      <div style={{color:"#fff",fontWeight:900,fontSize:18,letterSpacing:0.5}}>AITA?</div>
      <div style={{display:"flex",alignItems:"center",gap:12,color:"#fff"}}>
        <div>⏱ {time}</div>
        <button onClick={onRestart} aria-label="Restart"
          style={{background:"transparent",border:"1px solid #3a3f4b",color:"#fff",padding:"4px 8px",borderRadius:8}}>↻</button>
      </div>
    </div>
  );
}

export default function App(){
  const [screen,setScreen]=useState<"start"|"story"|"judge"|"leaderboard">("start");
  const [time,setTime]=useState("5:00");
  const [showConfirm,setShowConfirm]=useState(false);

  return (
    <div style={{minHeight:"100vh",background:BG,color:TEXT}}>
      <Header time={time} onRestart={()=>setShowConfirm(true)} />

      {screen==="start" && (
        <div style={{padding:"24px 16px",maxWidth:720,margin:"0 auto"}}>
          <h1 style={{fontWeight:900,margin:"8px 0 12px"}}>Ready to find the biggest A*shole?</h1>
          <p style={{opacity:.9,margin:"0 0 20px"}}>Storytelling party game inspired by Reddit’s AITA.</p>

          <button style={{padding:"14px 18px",background:ACCENT,border:"none",borderRadius:10,color:"#fff",fontWeight:700}}
            onClick={()=>setScreen("story")}>Start Game</button>
        </div>
      )}

      {screen==="story" && (
        <div style={{padding:"24px 16px",maxWidth:720,margin:"0 auto"}}>
          <h2 style={{fontWeight:900,margin:"8px 0 12px"}}>Your Turn, %%!</h2>
          <div style={{background:SURFACE,borderRadius:12,padding:16,margin:"16px 0"}}>
            Tell your story prompt…
          </div>
          <button style={{padding:"12px 16px",background:ACCENT,border:"none",borderRadius:10,color:"#fff",fontWeight:700}}
            onClick={()=>setScreen("judge")}>Finish</button>
        </div>
      )}

      {screen==="judge" && (
        <div style={{padding:"24px 16px",maxWidth:720,margin:"0 auto"}}>
          <h2 style={{fontWeight:900,margin:"8px 0 6px"}}>Your Call, %%!</h2>
          <p style={{margin:"0 0 14px"}}>Was %% the A*shole in this story?</p>
          <div style={{display:"grid",gap:12,maxWidth:360}}>
            <button style={{padding:"12px 16px",background:ACCENT,border:"none",borderRadius:10,color:"#fff",fontWeight:800}}>A*SHOLE</button>
            <button style={{padding:"12px 16px",background:"transparent",border:`2px solid ${ACCENT}`,borderRadius:10,color:TEXT,fontWeight:800}}>NOT AN A*SHOLE</button>
          </div>
          <div style={{marginTop:16}}>
            <button onClick={()=>setScreen("leaderboard")} style={{padding:"10px 14px",border:"1px solid #3a3f4b",background:"transparent",color:"#fff",borderRadius:8}}>Continue</button>
          </div>
        </div>
      )}

      {screen==="leaderboard" && (
        <div style={{padding:"24px 16px",maxWidth:720,margin:"0 auto"}}>
          <h2 style={{fontWeight:900}}>Game Over</h2>
          <ol style={{lineHeight:1.9}}>
            <li>Bora — 3 A* points</li>
            <li>Ece — 2 A* points</li>
          </ol>
          <button style={{padding:"12px 16px",background:ACCENT,border:"none",borderRadius:10,color:"#fff",fontWeight:700}}
            onClick={()=>setScreen("start")}>New Game</button>
        </div>
      )}

      {showConfirm && (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.6)",display:"grid",placeItems:"center"}}>
          <div style={{background:SURFACE,padding:20,borderRadius:12,display:"grid",gap:12,minWidth:280}}>
            <div>Are you sure you want to restart?</div>
            <div style={{display:"flex",gap:12}}>
              <button style={{border:`2px solid ${ACCENT}`,background:"transparent",color:TEXT,borderRadius:8,padding:"8px 12px"}} onClick={()=>setShowConfirm(false)}>Cancel</button>
              <button style={{background:ACCENT,color:"#fff",border:"none",borderRadius:8,padding:"8px 12px"}} onClick={()=>{setShowConfirm(false);setScreen("start");}}>Restart</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
