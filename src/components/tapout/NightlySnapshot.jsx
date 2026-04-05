import { useState } from "react";
import { ChevronLeft, Check } from "lucide-react";

const MOODS = ["Calm", "Content", "Productive", "Energised", "Stressed", "Anxious", "Overwhelmed", "Irritated", "Tired", "Numb"];
const MOOD_COLORS = {
  Calm: "#5CB85C", Content: "#5CB85C", Productive: "#6D7BFF", Energised: "#5CB85C",
  Stressed: "#F5A623", Anxious: "#F5A623", Overwhelmed: "#E8343A", Irritated: "#F5A623",
  Tired: "#B7C4D8", Numb: "#B7C4D8",
};

const STRESS_LABELS = ["", "1 – Very calm", "2 – Low stress", "3 – Manageable", "4 – Noticeable", "5 – High", "6 – Tense", "7 – Overwhelming", "8 – A lot", "9 – Overwhelming", "10 – Crisis"];
const STRESS_COLORS = ["#5CB85C","#5CB85C","#5CB85C","#5CB85C","#F5A623","#F5A623","#F5A623","#E8343A","#E8343A","#E8343A","#E8343A"];

const SYMPTOMS = [
  { id: "headache", label: "Headache", emoji: "🤕" },
  { id: "tech_neck", label: "Tech Neck", emoji: "😣" },
  { id: "wrist_pain", label: "Wrist Pain", emoji: "🖐" },
  { id: "nosebleed", label: "Nosebleed", emoji: "🩸" },
  { id: "sunday_dread", label: "Sunday Dread", emoji: "😰" },
  { id: "insomnia", label: "Insomnia", emoji: "🌙" },
];

const LUNCH_OPTIONS = [
  { id: "away", label: "Proper lunch away from desk 🌿" },
  { id: "desk", label: "Ate at desk / while working 💻" },
  { id: "skipped", label: "Skipped / minimal lunch 😕" },
];

const MOVEMENT_OPTIONS = [
  { id: "home_workout", label: "Home workout 🏠" },
  { id: "yoga", label: "Yoga / sound bath / studio 🧘" },
  { id: "walk", label: "Walk / jog / outdoor 🌳" },
  { id: "none", label: "No movement today" },
];

export default function NightlySnapshot({ onSave, onBack }) {
  const [moods, setMoods] = useState([]);
  const [stress, setStress] = useState(5);
  const [symptoms, setSymptoms] = useState({});
  const [lunchAway, setLunchAway] = useState(null);
  const [workedPastCutoff, setWorkedPastCutoff] = useState(false);
  const [movement, setMovement] = useState(null);
  const [movementDuration, setMovementDuration] = useState(30); // NEW: Duration State
  const [workload, setWorkload] = useState(null);

  const toggleMood = (m) => {
    setMoods((prev) => prev.includes(m) ? prev.filter((x) => x !== m) : prev.length < 3 ? [...prev, m] : prev);
  };
  const toggleSymptom = (id) => setSymptoms((prev) => ({ ...prev, [id]: !prev[id] }));

  const handleSave = () => {
    onSave({
      stress,
      nosebleed: symptoms["nosebleed"] || stress >= 9,
      moods, symptoms, lunchAway, workedPastCutoff, movement, movementDuration, workload,
    });
  };

  const stressColor = STRESS_COLORS[stress];

  return (
    <div className="flex flex-col h-full" style={{ background: "#E2DEF2" }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b" style={{ borderColor: "#B8B8FF", background: "white" }}>
        <button onClick={onBack} className="p-2 rounded-full" style={{ background: "#E2DEF2" }}>
          <ChevronLeft size={16} strokeWidth={2} style={{ color: "#6D7BFF" }} />
        </button>
        <div>
          <h2 className="text-base font-bold" style={{ color: "#003B64" }}>Nightly Snapshot</h2>
          <p className="text-[10px]" style={{ color: "#B7C4D8" }}>How was your workday? (~1 min)</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-5 pb-8">

        {/* Moods */}
        <section>
          <p className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: "#4A4868" }}>What did today feel like?</p>
          <div className="flex flex-wrap gap-2">
            {MOODS.map((m) => {
              const selected = moods.includes(m);
              const color = MOOD_COLORS[m];
              return (
                <button
                  key={m}
                  onClick={() => toggleMood(m)}
                  className="px-3.5 py-2 rounded-full text-xs font-semibold transition-all"
                  style={selected
                    ? { background: color, color: "white", boxShadow: `0 2px 8px ${color}55` }
                    : { background: "white", color: "#4A4868", border: "1px solid #B8B8FF" }
                  }
                >
                  {m}
                </button>
              );
            })}
          </div>
        </section>

        {/* Stress Slider */}
        <section>
          <div className="flex items-baseline justify-between mb-2">
            <p className="text-xs font-bold uppercase tracking-wide" style={{ color: "#4A4868" }}>Stress Level</p>
            <span className="text-sm font-bold transition-colors" style={{ color: stressColor }}>
              {STRESS_LABELS[stress]}
            </span>
          </div>
          <div className="relative py-3">
            <div className="w-full h-2.5 rounded-full" style={{ background: "linear-gradient(to right, #5CB85C 0%, #F5A623 40%, #E8343A 75%, #CC0000 100%)" }} />
            <input
              type="range" min={0} max={10} value={stress}
              onChange={(e) => setStress(Number(e.target.value))}
              className="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
              style={{ top: 0 }}
            />
            <div
              className="absolute top-0.5 w-6 h-6 rounded-full border-2 border-white shadow-md pointer-events-none transition-all"
              style={{
                left: `calc(${(stress / 10) * 100}% - 12px)`,
                background: stressColor,
                boxShadow: `0 2px 8px ${stressColor}55`,
              }}
            />
          </div>
        </section>

        {/* Workload */}
        <section>
          <p className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: "#4A4868" }}>How was your workload?</p>
          <div className="flex gap-2">
            {["Manageable", "Barely", "Not manageable"].map((w) => (
              <button
                key={w}
                onClick={() => setWorkload(w)}
                className="flex-1 py-2.5 rounded-2xl text-[11px] font-semibold transition-all"
                style={workload === w
                  ? { background: "#6D7BFF", color: "white" }
                  : { background: "white", color: "#4A4868", border: "1px solid #B8B8FF" }
                }
              >
                {w}
              </button>
            ))}
          </div>
        </section>

        {/* Physical Symptoms */}
        <section>
          <p className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: "#4A4868" }}>Physical Warning Signs</p>
          <div className="grid grid-cols-2 gap-2">
            {SYMPTOMS.map(({ id, label, emoji }) => {
              const on = !!symptoms[id];
              return (
                <button
                  key={id}
                  onClick={() => toggleSymptom(id)}
                  className="flex items-center gap-2.5 p-3 rounded-2xl transition-all text-left"
                  style={on
                    ? id === "nosebleed"
                      ? { background: "#FFEDED", border: "1.5px solid #E8343A" }
                      : { background: "#E2DEF2", border: "1.5px solid #6D7BFF" }
                    : { background: "white", border: "1.5px solid #B8B8FF" }
                  }
                >
                  <span className="text-base">{emoji}</span>
                  <span className="text-[11px] font-semibold" style={{ color: on ? (id === "nosebleed" ? "#E8343A" : "#6D7BFF") : "#4A4868" }}>{label}</span>
                  {on && <div className="ml-auto w-4 h-4 rounded-full flex items-center justify-center" style={{ background: id === "nosebleed" ? "#E8343A" : "#6D7BFF" }}>
                    <Check size={10} strokeWidth={2.5} className="text-white" />
                  </div>}
                </button>
              );
            })}
          </div>
        </section>

        {/* Movement with DURATION */}
        <section>
          <p className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: "#4A4868" }}>Movement Today</p>
          <div className="flex flex-col gap-2">
            {MOVEMENT_OPTIONS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setMovement(id)}
                className="flex items-center gap-3 p-3.5 rounded-2xl text-left transition-all"
                style={movement === id
                  ? { background: id === "none" ? "#F5F4FB" : "#E8F5E8", border: `1.5px solid ${id === "none" ? "#B7C4D8" : "#5CB85C"}` }
                  : { background: "white", border: "1.5px solid #B8B8FF" }
                }
              >
                <p className="text-[12px] font-semibold" style={{ color: "#4A4868" }}>{label}</p>
              </button>
            ))}

            {/* NEW: Duration Slider - Only shows if a movement is selected! */}
            {movement && movement !== "none" && (
              <div className="mt-2 p-4 rounded-2xl bg-white border border-[#5CB85C] animate-fade-in shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-[11px] font-bold text-[#4A4868] uppercase">Duration</p>
                  <p className="text-sm font-bold text-[#5CB85C]">{movementDuration} mins</p>
                </div>
                <input
                  type="range" min="5" max="120" step="5"
                  value={movementDuration}
                  onChange={(e) => setMovementDuration(Number(e.target.value))}
                  className="w-full h-2 rounded-lg cursor-pointer accent-[#5CB85C]"
                  style={{ background: "#E8F5E8" }}
                />
                <div className="flex justify-between mt-1 text-[10px] text-gray-400">
                  <span>5m</span><span>120m</span>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Behavior Toggles */}
        <section>
          <p className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: "#4A4868" }}>Behavior</p>
          <div className="flex flex-col gap-2">
            <div
              className="flex items-center justify-between p-4 rounded-2xl"
              style={{ background: "white", border: "1.5px solid #B8B8FF" }}
            >
              <p className="text-[12px] font-semibold" style={{ color: "#4A4868" }}>Worked past cut-off?</p>
              <button
                onClick={() => setWorkedPastCutoff(!workedPastCutoff)}
                className="relative w-11 h-6 rounded-full transition-all"
                style={{ background: workedPastCutoff ? "#E8343A" : "#D6D3E8" }}
              >
                <div
                  className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all"
                  style={{ left: workedPastCutoff ? "calc(100% - 1.25rem)" : "0.25rem" }}
                />
              </button>
            </div>
          </div>
        </section>

        {/* Save */}
        <button
          onClick={handleSave}
          className="w-full py-4 rounded-3xl font-bold text-base text-white transition-all active:scale-98"
          style={{ background: "linear-gradient(135deg, #6D7BFF, #4A58E0)", boxShadow: "0 4px 16px rgba(109,123,255,0.4)" }}
        >
          Save Today ✓
        </button>

      </div>
    </div>
  );
}
