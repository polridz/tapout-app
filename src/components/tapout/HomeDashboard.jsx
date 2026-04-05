import { useState } from "react";
import { Settings, Sun, Moon, TrendingDown, Zap, ChevronRight, AlertTriangle, BarChart2 } from "lucide-react";
import BurnoutBar from "./BurnoutBar";

export default function HomeDashboard({ onTapOut, onRedZone, onDhyana, onSummary, todayStress, todayNosebleed, snapshotSaved }) {
  const weekData = [
    { day: "Mon", stress: 4 }, { day: "Tue", stress: 2 }, { day: "Wed", stress: 7 },
    { day: "Thu", stress: 5 }, { day: "Fri", stress: todayNosebleed ? 10 : todayStress !== null ? todayStress : null },
    { day: "Sat", stress: null }, { day: "Sun", stress: null },
  ];
  const hasRedZone = weekData.filter(d => d.stress !== null && d.stress >= 7).length >= 3;

  return (
    <div className="flex flex-col h-full px-5 pt-2 pb-4 gap-3" style={{ background: "#E2DEF2" }}>
      <div className="flex items-center justify-between pt-1">
        <div>
          <p className="text-[11px] font-medium" style={{ color: "#B7C4D8" }}>Good evening,</p>
          <h2 className="text-xl font-bold" style={{ color: "#003B64" }}>Alex 👋</h2>
        </div>
        <button className="p-2 rounded-full bg-white/60"><Settings size={16} color="#4A4868" /></button>
      </div>

      {hasRedZone && (
        <button onClick={onRedZone} className="flex items-center gap-3 p-3 rounded-2xl bg-[#FFEDED] border border-[#FF6B6B]">
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#E8343A]"><AlertTriangle size={14} color="white" /></div>
          <div className="flex-1 text-left"><p className="text-xs font-semibold text-[#E8343A]">Red Zone Detected</p><p className="text-[10px] text-[#4A4868]">Tap to view patterns.</p></div>
        </button>
      )}

      <div className="flex flex-col items-center gap-2 py-1">
        <p className="text-[11px] font-medium" style={{ color: "#4A4868" }}>Feeling overwhelmed?</p>
        <button onClick={onTapOut} className="w-40 h-40 rounded-full flex flex-col items-center justify-center bg-gradient-to-br from-[#7D8BFF] to-[#5560EE] shadow-xl">
          <Zap size={22} className="text-white mb-1" />
          <span className="text-white font-bold text-xl">Tap Out</span>
          <span className="text-white/70 text-[10px]">60-sec reset</span>
        </button>
      </div>

      <BurnoutBar weekData={weekData} />

      {!snapshotSaved ? (
        <button onClick={() => onDhyana('night')} className="rounded-3xl p-3.5 flex items-center gap-3 bg-white border border-[#B8B8FF]">
          <div className="w-9 h-9 rounded-full flex items-center justify-center bg-[#6D7BFF]"><Moon size={16} color="white" /></div>
          <div className="flex-1 text-left"><p className="text-xs font-semibold text-[#003B64]">Nightly check-in ready</p></div>
          <div className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-[#6D7BFF] text-white">Log</div>
        </button>
      ) : (
        <div className="rounded-3xl p-3.5 flex items-center gap-3 bg-[#E8F5E8]"><span className="text-base">✅</span><p className="text-xs font-medium text-[#2E7D32]">Today's log saved.</p></div>
      )}
    </div>
  );
}
