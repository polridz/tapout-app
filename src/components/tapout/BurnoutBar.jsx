import { useState } from "react";

const dayColors = { green: "#5CB85C", amber: "#F5A623", red: "#E8343A", empty: "#D6D3E8" };
const getColor = (stress) => {
  if (stress === null || stress === undefined) return dayColors.empty;
  if (stress <= 3) return dayColors.green;
  if (stress <= 6) return dayColors.amber;
  return dayColors.red;
};

export default function BurnoutBar({ weekData }) {
  const [activeDay, setActiveDay] = useState(null);
  return (
    <div className="rounded-3xl p-4" style={{ background: "white", boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>
      <p className="text-xs font-bold tracking-wide uppercase mb-3" style={{ color: "#4A4868" }}>This Week</p>
      <div className="flex gap-1.5 items-end">
        {weekData.map((d, i) => {
          const color = getColor(d.stress);
          const isActive = activeDay === i;
          return (
            <button
              key={d.day}
              onClick={() => setActiveDay(isActive ? null : i)}
              className="flex-1 flex flex-col items-center gap-1.5 group"
            >
              <div
                className="w-full rounded-xl transition-all"
                style={{
                  background: color,
                  height: d.stress !== null ? Math.max(24, (d.stress / 10) * 48) + 8 : 18,
                  opacity: isActive ? 1 : 0.85,
                  transform: isActive ? "scaleY(1.08)" : "scaleY(1)",
                }}
              />
              <span className="text-[10px] font-medium" style={{ color: isActive ? "#6D7BFF" : "#B7C4D8" }}>{d.day}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
