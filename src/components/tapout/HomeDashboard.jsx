import { useState } from "react";
import { Settings, Sun, Moon, TrendingDown, Zap, ChevronRight, AlertTriangle, BarChart2 } from "lucide-react";
import BurnoutBar from "./BurnoutBar";

// We added userName here
export default function HomeDashboard({ userName, onTapOut, onRedZone, onDhyana, onSummary, todayStress, todayNosebleed, snapshotSaved }) {
  const [dhyanaMode, setDhyanaMode] = useState("moon");

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  // If no name is provided, default to "Friend"
  const displayName = userName ? userName : "Friend";

  const weekData = [
    { day: "Mon", stress: 4 },
    { day: "Tue", stress: 2 },
    { day: "Wed", stress: 7 },
    { day: "Thu", stress: 5 },
    { day: "Fri", stress: todayNosebleed ? 10 : todayStress !== null ? todayStress : null },
    { day: "Sat", stress: null },
    { day: "Sun", stress: null },
  ];

  const hasRedZone = weekData.filter(d => d.stress !== null && d.stress >= 7).length >= 3;

  return (
    <div className="flex flex-col h-full px-5 pt-2 pb-4 gap-3" style={{ background: "#E2DEF2" }}>

      {/* Header */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <p className="text-[11px] font-medium tracking-wide" style={{ color: "#B7C4D8" }}>{greeting},</p>
          <h2 className="text-xl font-bold leading-tight" style={{ color: "#003B64" }}>{displayName} 👋</h2>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-full p-1 gap-0.5" style={{ background: "rgba(255,255,255,0.6)" }}>
            <button
              onClick={() => { setDhyanaMode("sun"); onDhyana("morning"); }}
              className="p-1.5 rounded-full transition-all"
              style={dhyanaMode === "sun" ? { background: "#F5C542", boxShadow: "0 2px 8px #F5C54255" } : {}}
              title="Morning Routine"
            >
              <Sun size={14} strokeWidth={1.5} style={{ color: dhyanaMode === "sun" ? "white" : "#B7C4D8" }} />
            </button>
            <button
              onClick={() => { setDhyanaMode("moon"); onDhyana("night"); }}
              className="p-1.5 rounded-full transition-all"
              style={dhyanaMode === "moon" ? { background: "#6D7BFF", boxShadow: "0 2px 8px #6D7BFF55" } : {}}
              title="Evening Routine"
            >
              <Moon size={14} strokeWidth={1.5} style={{ color: dhyanaMode === "moon" ? "white" : "#B7C4D8" }} />
            </button>
          </div>
          <button className="p-2 rounded-full" style={{ background: "rgba(255,255,255,0.6)" }}>
            <Settings size={16} strokeWidth={1.5} style={{ color: "#4A4868" }} />
          </button>
        </div>
      </div>

      {/* Red Zone Alert Banner */}
      {hasRedZone && (
        <button
          onClick={onRedZone}
          className="flex items-center gap-3 p-3 rounded-2xl animate-fade-in"
          style={{ background: "#FFEDED", border: "1px solid #FF6B6B" }}
        >
          <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#E8343A" }}>
            <AlertTriangle size={14} strokeWidth={2} className="text-white" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-xs font-semibold" style={{ color: "#E8343A" }}>Red Zone Pattern Detected</p>
            <p className="text-[10px] leading-tight" style={{ color: "#4A4868" }}>3+ high-stress days this week. Tap to view.</p>
          </div>
          <ChevronRight size={14} style={{ color: "#B7C4D8" }} />
        </button>
      )}

      {/* Main Tap Out Button */}
      <div className="flex flex-col items-center gap-2 py-1">
        <p className="text-[11px] font-medium tracking-wide" style={{ color: "#4A4868" }}>Feeling overwhelmed?</p>
        <button
          onClick={onTapOut}
          className="relative w-40 h-40 rounded-full flex flex-col items-center justify-center transition-all active:scale-95"
          style={{
            background: "linear-gradient(145deg, #7D8BFF, #5560EE)",
            boxShadow: "0 8px 32px rgba(109,123,255,0.5), 0 0 0 8px rgba(109,123,255,0.15), 0 0 0 16px rgba(109,123,255,0.07)",
          }}
        >
          <div className="absolute inset-0 rounded-full animate-ping" style={{ background: "rgba(109,123,255,0.2)", animationDuration: "2.5s" }} />
          <Zap size={22} strokeWidth={2} className="text-white z-10 mb-0.5" />
          <span className="text-white font-bold text-xl tracking-tight z-10">Tap Out</span>
          <span className="text-white/70 text-[10px] font-medium z-10 mt-0.5">60-sec reset</span>
        </button>
      </div>

      {/* Burnout Bar */}
      <BurnoutBar weekData={weekData} />

      {/* Quick Insights */}
      <div className="rounded-3xl p-4 flex flex-col gap-2" style={{ background: "white", boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <div className="w-1 h-4 rounded-full" style={{ background: "#6D7BFF" }} />
            <p className="text-xs font-bold tracking-wide uppercase" style={{ color: "#4A4868" }}>Weekly Insight</p>
          </div>
          <button
            onClick={onSummary}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold"
            style={{ background: "#E2DEF2", color: "#6D7BFF" }}
          >
            <BarChart2 size={10} />
            Full Report
          </button>
        </div>
        <div className="flex items-start gap-2">
          <div className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#E2DEF2" }}>
            <TrendingDown size={10} strokeWidth={1.5} style={{ color: "#6D7BFF" }} />
          </div>
          <p className="text-[12px] leading-relaxed" style={{ color: "#4A4868" }}>
            You've taken <span className="font-semibold" style={{ color: "#003B64" }}>3 proper lunches</span> this week. Stress is <span className="font-semibold" style={{ color: "#5CB85C" }}>20% lower</span> than last week 🌿
          </p>
        </div>
        <div className="flex items-start gap-2">
          <div className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#FFEDED" }}>
            <AlertTriangle size={10} strokeWidth={1.5} style={{ color: "#E8343A" }} />
          </div>
          <p className="text-[12px] leading-relaxed" style={{ color: "#4A4868" }}>
            High-stress days clustered on <span className="font-semibold" style={{ color: "#003B64" }}>Wednesdays</span>. Often follows late client calls.
          </p>
        </div>
      </div>

      {/* Log Today Prompt */}
      {!snapshotSaved && (
        <div
          className="rounded-3xl p-3.5 flex items-center gap-3 animate-fade-in"
          style={{ background: "white", border: "1.5px solid #B8B8FF" }}
        >
          <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#6D7BFF" }}>
            <Moon size={16} strokeWidth={1.5} className="text-white" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold" style={{ color: "#003B64" }}>Nightly check-in ready</p>
            <p className="text-[10px]" style={{ color: "#B7C4D8" }}>How was your workday? (1 min)</p>
          </div>
          <div className="text-[10px] font-semibold px-2.5 py-1 rounded-full" style={{ background: "#6D7BFF", color: "white" }}>
            Log
          </div>
        </div>
      )}

      {snapshotSaved && (
        <div className="rounded-3xl p-3.5 flex items-center gap-3 animate-fade-in" style={{ background: "#E8F5E8" }}>
          <span className="text-base">✅</span>
          <p className="text-xs font-medium" style={{ color: "#2E7D32" }}>Today's log saved. Well done.</p>
        </div>
      )}
    </div>
  );
}
