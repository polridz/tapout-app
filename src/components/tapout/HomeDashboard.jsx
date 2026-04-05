import { useState } from "react";
import { Settings, Sun, Moon, TrendingDown, Zap, ChevronRight, AlertTriangle, BarChart2 } from "lucide-react";
import BurnoutBar from "./BurnoutBar";

export default function HomeDashboard({ userName, onTapOut, onRedZone, onDhyana, onLogDay, onSummary, onJournal, todayStress, todayNosebleed, snapshotSaved }) {
  const [dhyanaMode, setDhyanaMode] = useState("moon");

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const displayName = userName ? userName : "Friend";

  const weekData = [
    { day: "Mon", stress: 4 }, { day: "Tue", stress: 2 }, { day: "Wed", stress: 7 },
    { day: "Thu", stress: 5 }, { day: "Fri", stress: todayNosebleed ? 10 : todayStress !== null ? todayStress : null },
    { day: "Sat", stress: null }, { day: "Sun", stress: null },
  ];

  const hasRedZone = weekData.filter(d => d.stress !== null && d.stress >= 7).length >= 3;

  return (
    <div className="flex flex-col h-full px-5 pt-2 pb-4 gap-3 bg-[#E2DEF2]">

      <div className="flex items-center justify-between pt-1">
        <div>
          <p className="text-[11px] font-medium tracking-wide text-[#B7C4D8]">{greeting},</p>
          <h2 className="text-xl font-bold leading-tight text-[#003B64]">{displayName} 👋</h2>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-full p-1 gap-0.5 bg-white/60">
            <button onClick={() => { setDhyanaMode("sun"); onDhyana("morning"); }} className="p-1.5 rounded-full transition-all" style={dhyanaMode === "sun" ? { background: "#F5C542", boxShadow: "0 2px 8px #F5C54255" } : {}}>
              <Sun size={14} strokeWidth={1.5} color={dhyanaMode === "sun" ? "white" : "#B7C4D8"} />
            </button>
            <button onClick={() => { setDhyanaMode("moon"); onDhyana("night"); }} className="p-1.5 rounded-full transition-all" style={dhyanaMode === "moon" ? { background: "#6D7BFF", boxShadow: "0 2px 8px #6D7BFF55" } : {}}>
              <Moon size={14} strokeWidth={1.5} color={dhyanaMode === "moon" ? "white" : "#B7C4D8"} />
            </button>
          </div>
          <button className="p-2 rounded-full bg-white/60">
            <Settings size={16} strokeWidth={1.5} color="#4A4868" />
          </button>
        </div>
      </div>

      {hasRedZone && (
        <button onClick={onRedZone} className="flex items-center gap-3 p-3 rounded-2xl animate-fade-in bg-[#FFEDED] border border-[#FF6B6B]">
          <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-[#E8343A]"><AlertTriangle size={14} strokeWidth={2} color="white" /></div>
          <div className="flex-1 text-left"><p className="text-xs font-semibold text-[#E8343A]">Red Zone Pattern Detected</p><p className="text-[10px] leading-tight text-[#4A4868]">3+ high-stress days this week. Tap to view.</p></div>
          <ChevronRight size={14} color="#B7C4D8" />
        </button>
      )}

      <div className="flex flex-col items-center gap-2 py-1">
        <p className="text-[11px] font-medium tracking-wide text-[#4A4868]">Feeling overwhelmed?</p>
        <button onClick={onTapOut} className="relative w-40 h-40 rounded-full flex flex-col items-center justify-center transition-all active:scale-95 shadow-[0_8px_32px_rgba(109,123,255,0.5),0_0_0_8px_rgba(109,123,255,0.15),0_0_0_16px_rgba(109,123,255,0.07)] bg-gradient-to-br from-[#7D8BFF] to-[#5560EE]">
          <div className="absolute inset-0 rounded-full animate-ping bg-[#6D7BFF]/20" style={{ animationDuration: "2.5s" }} />
          <Zap size={22} strokeWidth={2} className="text-white z-10 mb-0.5" />
          <span className="text-white font-bold text-xl tracking-tight z-10">Tap Out</span>
          <span className="text-white/70 text-[10px] font-medium z-10 mt-0.5">60-sec reset</span>
        </button>
      </div>

      <BurnoutBar weekData={weekData} />

      <div className="rounded-3xl p-4 flex flex-col gap-2 bg-white shadow-[0_2px_16px_rgba(0,0,0,0.06)]">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2"><div className="w-1 h-4 rounded-full bg-[#6D7BFF]" /><p className="text-xs font-bold tracking-wide uppercase text-[#4A4868]">Weekly Insight</p></div>
          <button onClick={onSummary} className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-[#E2DEF2] text-[#6D7BFF]"><BarChart2 size={10} />Full Report</button>
        </div>
        <div className="flex items-start gap-2"><div className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 bg-[#E2DEF2]"><TrendingDown size={10} strokeWidth={1.5} color="#6D7BFF" /></div><p className="text-[12px] leading-relaxed text-[#4A4868]">You've taken <span className="font-bold text-[#003B64]">3 proper lunches</span> this week. Stress is <span className="font-bold text-[#5CB85C]">20% lower</span> than last week 🌿</p></div>
        <div className="flex items-start gap-2"><div className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 bg-[#FFEDED]"><AlertTriangle size={10} strokeWidth={1.5} color="#E8343A" /></div><p className="text-[12px] leading-relaxed text-[#4A4868]">High-stress days clustered on <span className="font-bold text-[#003B64]">Wednesdays</span>. Often follows late client calls.</p></div>
      </div>

      <button onClick={onJournal} className="rounded-[2rem] p-4 flex items-center justify-between bg-white border border-[#B8B8FF] shadow-sm hover:bg-[#F5F4FB] transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#E2DEF2] flex items-center justify-center"><span className="text-lg">✍️</span></div>
          <div className="text-left"><p className="text-sm font-bold text-[#003B64]">Quick Journal</p><p className="text-[10px] text-[#4A4868]">Get it off your chest.</p></div>
        </div>
        <ChevronRight size={16} color="#B7C4D8" />
      </button>

      {!snapshotSaved && (
        <button onClick={onLogDay} className="rounded-[2rem] p-2 pr-4 flex items-center gap-4 animate-fade-in bg-white border-2 border-[#E2DEF2] hover:border-[#B8B8FF] transition-colors w-full shadow-sm">
          <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 bg-[#6D7BFF]"><Moon size={20} strokeWidth={1.5} color="white" /></div>
          <div className="flex-1 text-left"><p className="text-sm font-bold text-[#003B64]">Nightly check-in ready</p><p className="text-[11px] text-[#B7C4D8] mt-0.5">How was your workday? (1 min)</p></div>
          <div className="text-xs font-bold px-4 py-2 rounded-full bg-[#6D7BFF] text-white">Log</div>
        </button>
      )}

      {snapshotSaved && (
        <div className="rounded-3xl p-3.5 flex items-center gap-3 animate-fade-in bg-[#E8F5E8]">
          <span className="text-base">✅</span><p className="text-xs font-medium text-[#2E7D32]">Today's log saved. Well done.</p>
        </div>
      )}
    </div>
  );
}
// END OF FILE
