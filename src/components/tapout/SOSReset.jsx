import { useState, useEffect, useRef } from "react";
import { X, ChevronLeft, Pause, Play } from "lucide-react";

const TOTAL_SECONDS = 60;

const phases = [
  { label: "Inhale", duration: 4, instruction: "Breathe in slowly..." },
  { label: "Hold", duration: 4, instruction: "Hold gently..." },
  { label: "Exhale", duration: 4, instruction: "Release fully..." },
  { label: "Hold", duration: 4, instruction: "Rest here..." },
];

const exercises = ["breathing", "neck", "grounding", "reframing"];

const exerciseLabels = {
  breathing: "Breathe",
  neck: "Stretch",
  grounding: "Ground",
  reframing: "Reframe",
};

const reframingSteps = [
  { thought: "I'm failing at everything", reframe: "I'm managing a lot. It's okay to feel this.", emoji: "💭" },
  { thought: "This will never get better", reframe: "This moment will pass. It always does.", emoji: "🌤" },
  { thought: "I should be able to handle this", reframe: "Everyone has limits. Mine are valid.", emoji: "🧠" },
  { thought: "I'm not good enough", reframe: "I am doing my best with what I have today.", emoji: "💛" },
];

export default function SOSReset({ onDone, onBack }) {
  const [exercise, setExercise] = useState("breathing");
  const [started, setStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false); // NEW: Pause state
  const [secondsLeft, setSecondsLeft] = useState(TOTAL_SECONDS);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [phaseTime, setPhaseTime] = useState(0);
  const [complete, setComplete] = useState(false);
  const intervalRef = useRef(null);

  const currentPhase = phases[phaseIndex % phases.length];
  const phaseProgress = phaseTime / currentPhase.duration;

  useEffect(() => {
    if (!started || complete || isPaused) return; // Logic pauses here!
    
    intervalRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) { setComplete(true); clearInterval(intervalRef.current); return 0; }
        return s - 1;
      });
      setPhaseTime((t) => {
        const next = t + 1;
        if (next >= phases[phaseIndex % phases.length].duration) {
          setPhaseIndex((p) => p + 1);
          return 0;
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [started, complete, phaseIndex, isPaused]);

  const switchExercise = (ex) => {
    setExercise(ex);
    setStarted(false);
    setIsPaused(false);
    setSecondsLeft(TOTAL_SECONDS);
    setPhaseIndex(0);
    setPhaseTime(0);
    setComplete(false);
  };

  const circumference = 2 * Math.PI * 52;
  const elapsed = TOTAL_SECONDS - secondsLeft;
  const ringProgress = (elapsed / TOTAL_SECONDS) * circumference;

  const boxSize = (() => {
    if (!started) return 100;
    if (currentPhase.label === "Inhale") return 100 + phaseProgress * 50;
    if (currentPhase.label === "Exhale") return 150 - phaseProgress * 50;
    return currentPhase.label === "Hold" && phaseIndex % 4 === 1 ? 150 : 100;
  })();

  const grounding = [
    { count: 5, sense: "things you can see", emoji: "👁" },
    { count: 4, sense: "things you can touch", emoji: "✋" },
    { count: 3, sense: "sounds you can hear", emoji: "👂" },
    { count: 2, sense: "things you can smell", emoji: "👃" },
    { count: 1, sense: "thing you can taste", emoji: "👅" },
  ];
  const groundStep = Math.min(4, Math.floor(elapsed / 12));
  const reframeStep = Math.min(3, Math.floor(elapsed / 15));

  return (
    <div className="flex flex-col h-full relative animate-fade-in" style={{ background: "linear-gradient(160deg, #003B64, #4A4868)" }}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-3">
        <button onClick={onBack} className="p-2 rounded-full" style={{ background: "rgba(255,255,255,0.15)" }}>
          <ChevronLeft size={18} strokeWidth={2} className="text-white" />
        </button>
        <div className="flex gap-1.5 flex-wrap justify-center">
          {exercises.map((ex) => (
            <button
              key={ex}
              onClick={() => switchExercise(ex)}
              className="px-2.5 py-1 rounded-full text-[10px] font-semibold transition-all"
              style={exercise === ex
                ? { background: "#6D7BFF", color: "white" }
                : { background: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.7)" }
              }
            >
              {exerciseLabels[ex]}
            </button>
          ))}
        </div>
        <button onClick={onBack} className="p-2 rounded-full" style={{ background: "rgba(255,255,255,0.15)" }}>
          <X size={16} strokeWidth={2} className="text-white" />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-5 px-6">
        {!complete ? (
          <>
            {/* Timer ring & Pause Button */}
            <div className="relative flex items-center justify-center">
              <svg width="120" height="120" className="-rotate-90">
                <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="4" />
                <circle
                  cx="60" cy="60" r="52" fill="none"
                  stroke={isPaused ? "#F5A623" : "#6D7BFF"} strokeWidth="4"
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference - ringProgress}
                  strokeLinecap="round"
                  style={{ transition: "stroke-dashoffset 1s linear" }}
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-3xl font-bold text-white leading-none">{secondsLeft}</span>
                <span className="text-[10px] text-white/50 font-medium">sec</span>
              </div>
            </div>

            {/* Breathing */}
            {exercise === "breathing" && (
              <div className="flex flex-col items-center gap-4">
                <div
                  className="rounded-3xl border-2"
                  style={{
                    width: boxSize, height: boxSize,
                    borderColor: "rgba(109,123,255,0.8)", background: "rgba(109,123,255,0.15)",
                    transition: isPaused ? "none" : "all 1s ease-in-out",
                    boxShadow: `0 0 ${boxSize / 2}px rgba(109,123,255,0.25)`,
                  }}
                />
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">{started ? currentPhase.label : "Box Breathing"}</p>
                  <p className="text-sm text-white/60 mt-1">{started ? currentPhase.instruction : "Inhale · Hold · Exhale · Hold"}</p>
                </div>
              </div>
            )}

            {/* Neck stretch */}
            {exercise === "neck" && (
              <div className="flex flex-col items-center gap-4">
                <svg width="120" height="150" viewBox="0 0 120 150" fill="none">
                  <rect x="30" y="110" width="60" height="4" rx="2" stroke="rgba(255,255,255,0.4)" strokeWidth="2"/>
                  <rect x="20" y="112" width="6" height="30" rx="3" stroke="rgba(255,255,255,0.4)" strokeWidth="2"/>
                  <rect x="94" y="112" width="6" height="30" rx="3" stroke="rgba(255,255,255,0.4)" strokeWidth="2"/>
                  <rect x="20" y="78" width="6" height="34" rx="3" stroke="rgba(255,255,255,0.4)" strokeWidth="2"/>
                  <rect x="44" y="75" width="32" height="36" rx="8" stroke="white" strokeWidth="2.5"/>
                  <rect x="55" y="57" width="10" height="20" rx="5" stroke="white" strokeWidth="2.5"/>
                  <circle
                    cx={started ? 68 : 60}
                    cy={started ? 44 : 45}
                    r="13"
                    stroke="#6D7BFF"
                    strokeWidth="2.5"
                    style={{ transition: "all 1s ease-in-out" }}
                  />
                  <path d="M52 111 L48 130" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" strokeLinecap="round"/>
                  <path d="M68 111 L72 130" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
                <div className="text-center">
                  <p className="text-xl font-bold text-white">Ease your neck</p>
                  <p className="text-sm text-white/60 mt-1 leading-relaxed text-center px-4">
                    {!started ? "Sit tall, feet flat on floor." :
                      secondsLeft > 40 ? "Tilt right ear to right shoulder. Hold gently." :
                      secondsLeft > 20 ? "Switch to left side. Breathe slowly." :
                      "Roll shoulders back. Relax your jaw."}
                  </p>
                </div>
              </div>
            )}

            {/* Grounding */}
            {exercise === "grounding" && (
              <div className="flex flex-col items-center gap-4 w-full">
                <div className="text-center">
                  <p className="text-lg font-bold text-white">5-4-3-2-1 Grounding</p>
                  <p className="text-xs text-white/50 mt-1">Name each one, take your time</p>
                </div>
                <div className="flex flex-col gap-2 w-full">
                  {grounding.map((g, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 rounded-2xl transition-all"
                      style={{
                        background: i === groundStep && started ? "rgba(109,123,255,0.3)" : i < groundStep && started ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.05)",
                        border: i === groundStep && started ? "1px solid rgba(109,123,255,0.6)" : "1px solid transparent",
                        transform: i === groundStep && started ? "scale(1.02)" : "scale(1)",
                      }}
                    >
                      <span className="text-xl">{g.emoji}</span>
                      <p className="text-sm font-medium text-white"><span className="font-bold">{g.count}</span> {g.sense}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reframing */}
            {exercise === "reframing" && (
              <div className="flex flex-col items-center gap-4 w-full">
                <div className="text-center">
                  <p className="text-lg font-bold text-white">Reframe Your Thoughts</p>
                </div>
                <div className="flex flex-col gap-2.5 w-full">
                  {reframingSteps.map((step, i) => {
                    const isActive = i === reframeStep && started;
                    const isDone = i < reframeStep && started;
                    return (
                      <div key={i} className="p-3.5 rounded-2xl transition-all" style={{ background: isActive ? "rgba(109,123,255,0.25)" : isDone ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.04)" }}>
                        <div className="flex items-start gap-2.5">
                          <span className="text-lg mt-0.5">{step.emoji}</span>
                          <div className="flex-1">
                            <p className="text-[11px] line-through text-white/50 leading-snug">{step.thought}</p>
                            <p className="text-[12px] font-semibold text-white mt-1 leading-snug">{step.reframe}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Play/Pause Buttons */}
            {!started ? (
              <button onClick={() => setStarted(true)} className="px-10 py-4 rounded-full font-semibold text-base transition-all active:scale-95 bg-[#6D7BFF] text-white shadow-lg mt-4">
                Begin Reset
              </button>
            ) : (
              <button 
                onClick={() => setIsPaused(!isPaused)} 
                className="mt-6 flex items-center gap-2 px-6 py-3 rounded-full border border-white/30 text-white/80 hover:bg-white/10 transition-colors"
              >
                {isPaused ? <Play size={16} /> : <Pause size={16} />}
                <span className="text-sm font-medium">{isPaused ? "Resume" : "Pause to think"}</span>
              </button>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center gap-6 animate-fade-in text-center px-4">
            <div className="w-20 h-20 rounded-full flex items-center justify-center bg-[#6D7BFF]/30"><span className="text-4xl">🌿</span></div>
            <div>
              <p className="text-2xl font-bold text-white">Reset complete.</p>
              <p className="text-white/60 text-sm mt-2 leading-relaxed">You gave yourself 60 seconds.<br />That matters.</p>
            </div>
            <button onClick={onDone} className="px-10 py-4 rounded-full font-semibold text-base bg-[#6D7BFF] text-white">Back to Home</button>
          </div>
        )}
      </div>
    </div>
  );
}
