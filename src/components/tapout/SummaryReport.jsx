import { ChevronLeft, TrendingUp, TrendingDown, Zap, Coffee, Moon } from "lucide-react";

const getWeekColor = (avg) => {
  if (avg <= 3.5) return "#5CB85C";
  if (avg <= 5.5) return "#F5A623";
  return "#E8343A";
};

export default function SummaryReport({ onBack }) {
  const weeklyData = [
    { week: "Week 1", avg: 4.0, label: "Stable" },
    { week: "Week 2", avg: 6.0, label: "Elevated" },
    { week: "Week 3", avg: 3.4, label: "Recovery" },
    { week: "Week 4", avg: 5.25, label: "Mixed" },
  ];

  return (
    <div className="flex flex-col h-full bg-[#E2DEF2]">
      <div className="flex items-center gap-3 px-5 py-4 bg-white border-b border-[#B8B8FF]">
        <button onClick={onBack} className="p-2 rounded-full bg-[#E2DEF2]"><ChevronLeft size={16} color="#6D7BFF" /></button>
        <div>
          <h2 className="text-base font-bold text-[#003B64]">Monthly Report</h2>
          <p className="text-[10px] text-[#B7C4D8]">March 2026 · Alex</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4">
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Avg Stress", value: "4.7", icon: <Zap size={14} />, color: "#F5A623" },
            { label: "Tap Outs", value: "11", icon: <TrendingDown size={14} />, color: "#6D7BFF" },
            { label: "Green Days", value: "9", icon: <TrendingUp size={14} />, color: "#5CB85C" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-2xl p-3 bg-white flex flex-col gap-1">
              <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: `${stat.color}22`, color: stat.color }}>{stat.icon}</div>
              <p className="text-xl font-bold text-[#003B64]">{stat.value}</p>
              <p className="text-[10px] text-[#4A4868]">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Weekly Breakdown */}
        <div className="rounded-3xl p-4 bg-white shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wide text-[#4A4868] mb-3">Weekly Breakdown</p>
          <div className="flex flex-col gap-3">
            {weeklyData.map((wk, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-10 text-[11px] font-semibold text-[#4A4868]">{wk.week}</div>
                <div className="flex-1 h-2.5 rounded-full bg-[#E2DEF2]">
                  <div className="h-full rounded-full" style={{ width: `${(wk.avg / 10) * 100}%`, background: getWeekColor(wk.avg) }} />
                </div>
                <span className="text-[10px] font-bold" style={{ color: getWeekColor(wk.avg) }}>{wk.avg.toFixed(1)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insight */}
        <div className="rounded-3xl p-4 bg-gradient-to-br from-[#003B64] to-[#4A4868] shadow-lg">
          <p className="text-[10px] font-bold uppercase text-white/50 mb-2">Monthly Insight</p>
          <p className="text-[13px] text-white leading-relaxed">
            Your stress spikes on <span className="font-bold text-[#B8B8FF]">Wednesdays</span> — typically after back-to-back client calls. Weeks with <span className="font-bold text-[#5CB85C]">3+ proper lunches</span> show a 22% lower average stress score. Small breaks are working. 🌿
          </p>
        </div>
      </div>
    </div>
  );
}
