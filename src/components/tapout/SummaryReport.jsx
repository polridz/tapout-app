import { ChevronLeft, TrendingUp, TrendingDown, Zap, Coffee, Moon } from "lucide-react";

const generateMonthData = () => {
  return [
    3, 2, 5, 4, 6, null, null,
    4, 7, 6, 8, 5, null, null,
    2, 3, 4, 3, 5, null, null,
    5, 4, 7, 5, null, null, null,
  ];
};
const monthData = generateMonthData();

const getColor = (stress) => {
  if (stress === null || stress === undefined) return "#E2DEF2";
  if (stress === 0) return "#E2DEF2";
  if (stress <= 3) return "#5CB85C";
  if (stress <= 6) return "#F5A623";
  return "#E8343A";
};

const DAYS = ["M", "T", "W", "T", "F", "S", "S"];
const WEEKS = ["Wk 1", "Wk 2", "Wk 3", "Wk 4"];

const weeklyData = [
  { week: "Wk 1", avg: 4.0, tapOuts: 2, lunches: 3, label: "Stable" },
  { week: "Wk 2", avg: 6.0, tapOuts: 5, lunches: 2, label: "Elevated" },
  { week: "Wk 3", avg: 3.4, tapOuts: 1, lunches: 4, label: "Recovery" },
  { week: "Wk 4", avg: 5.25, tapOuts: 3, lunches: 3, label: "Mixed" },
];

const getWeekColor = (avg) => {
  if (avg <= 3.5) return "#5CB85C";
  if (avg <= 5.5) return "#F5A623";
  return "#E8343A";
};

export default function SummaryReport({ onBack }) {
  return (
    <div className="flex flex-col h-full bg-[#E2DEF2]">
      <div className="flex items-center gap-3 px-5 py-4 bg-white border-b border-[#B8B8FF]">
        <button onClick={onBack} className="p-2 rounded-full bg-[#E2DEF2]">
          <ChevronLeft size={16} color="#6D7BFF" />
        </button>
        <div className="flex-1">
          <h2 className="text-base font-bold text-[#003B64]">Monthly Report</h2>
          <p className="text-[10px] text-[#B7C4D8]">April 2026</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4 pb-8">
        
        <div className="rounded-3xl p-4 bg-white shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-4 rounded-full bg-[#6D7BFF]" />
            <p className="text-xs font-bold uppercase text-[#4A4868]">Stress Heatmap</p>
          </div>
          <div className="grid grid-cols-7 gap-1 mb-1">
            {DAYS.map((d, i) => <div key={i} className="text-center text-[9px] font-semibold text-[#B7C4D8]">{d}</div>)}
          </div>
          {WEEKS.map((wk, wi) => (
            <div key={wi} className="grid grid-cols-7 gap-1 mb-1">
              {monthData.slice(wi * 7, wi * 7 + 7).map((stress, di) => (
                <div key={di} className="aspect-square rounded-md" style={{ background: getColor(stress), opacity: stress === null ? 0.4 : 1 }} />
              ))}
            </div>
          ))}
          <div className="flex items-center gap-3 mt-3 justify-end">
            {[{ label: "Low", color: "#5CB85C" }, { label: "Mid", color: "#F5A623" }, { label: "High", color: "#E8343A" }].map(({ label, color }) => (
              <div key={label} className="flex items-center gap-1">
                <div className="w-2.5 h-2.5 rounded-sm" style={{ background: color }} />
                <span className="text-[9px] text-[#B7C4D8]">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {[{ label: "Avg Stress", value: "4.7", sub: "/ 10", icon: <Zap size={14} />, color: "#F5A623" },
            { label: "Tap Outs", value: "11", sub: "sessions", icon: <TrendingDown size={14} />, color: "#6D7BFF" },
            { label: "Green Days", value: "9", sub: "this month", icon: <TrendingUp size={14} />, color: "#5CB85C" }
          ].map(({ label, value, sub, icon, color }) => (
            <div key={label} className="rounded-2xl p-3 bg-white flex flex-col gap-1">
              <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: `${color}22`, color }}>{icon}</div>
              <p className="text-xl font-bold text-[#003B64]">{value}<span className="text-xs font-normal text-[#B7C4D8]">{sub}</span></p>
              <p className="text-[10px] text-[#4A4868]">{label}</p>
            </div>
          ))}
        </div>

        <div className="rounded-3xl p-4 bg-white shadow-sm">
          <p className="text-xs font-bold uppercase text-[#4A4868] mb-3">Weekly Breakdown</p>
          <div className="flex flex-col gap-2.5">
            {weeklyData.map((wk, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-10 text-[11px] font-semibold text-[#4A4868]">{wk.week}</div>
                <div className="flex-1 h-2.5 rounded-full bg-[#E2DEF2] overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${(wk.avg / 10) * 100}%`, background: getWeekColor(wk.avg) }} />
                </div>
                <span className="text-[10px] font-bold w-6 text-right" style={{ color: getWeekColor(wk.avg) }}>{wk.avg.toFixed(1)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl p-4 bg-white shadow-sm">
          <p className="text-xs font-bold uppercase text-[#4A4868] mb-3">Behaviour Patterns</p>
          <div className="flex flex-col gap-2">
            {[{ icon: <Coffee size={13} />, label: "Lunch away from desk", value: "12/20 days", good: true },
              { icon: <Moon size={13} />, label: "Worked past cut-off", value: "8 times", good: false },
              { icon: <Zap size={13} />, label: "Tap Out sessions used", value: "11 resets", good: true }
            ].map(({ icon, label, value, good }) => (
              <div key={label} className="flex items-center gap-3 p-3 rounded-2xl bg-[#F5F4FB]">
                <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: good ? "#5CB85C22" : "#E8343A22", color: good ? "#5CB85C" : "#E8343A" }}>{icon}</div>
                <p className="text-[12px] flex-1 text-[#4A4868]">{label}</p>
                <span className="text-[11px] font-bold" style={{ color: good ? "#5CB85C" : "#E8343A" }}>{value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl p-4 bg-white border-2 border-[#E2DEF2]">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-4 rounded-full bg-[#9B59B6]" />
            <p className="text-xs font-bold uppercase text-[#4A4868]">Journal Patterns</p>
          </div>
          <div className="p-3 rounded-2xl bg-[#F5F4FB] text-[12px] text-[#4A4868] leading-relaxed">
            <p>During <span className="font-bold text-[#E8343A]">Red weeks</span>, your journal entries frequently mention <strong>"no time to eat"</strong> and <strong>"Client X revisions"</strong>. Skipped lunches are a strong predictor of burnout spikes for you.</p>
          </div>
        </div>

        <div className="rounded-3xl p-4 bg-gradient-to-br from-[#003B64] to-[#4A4868] shadow-lg">
          <p className="text-[10px] font-bold uppercase text-white/50 mb-2">Monthly Insight</p>
          <p className="text-[13px] text-white leading-relaxed">
            Your stress spikes on <span className="font-bold text-[#B8B8FF]">Wednesdays</span>. Weeks with <span className="font-bold text-[#5CB85C]">3+ proper lunches</span> show a 22% lower average stress score. Small breaks are working. 🌿
          </p>
        </div>

      </div>
    </div>
  );
}
