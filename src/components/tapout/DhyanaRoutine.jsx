import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function DhyanaRoutine({ mode, onDone, onBack }) {
  const [step, setStep] = useState(0);
  const [breathPhase, setBreathPhase] = useState("inhale");
  
  // Custom states for interactive elements
  const [boundary, setBoundary] = useState(null);
  const [priorities, setPriorities] = useState("");
  const [boundaryHonoured, setBoundaryHonoured] = useState(null);
  const [letGoText, setLetGoText] = useState("");

  const isMorning = mode === "morning";

  // Breathing animation logic (switches every 4s inhale, 6s exhale)
  useEffect(() => {
    let timeout;
    if (breathPhase === "inhale") {
      timeout = setTimeout(() => setBreathPhase("exhale"), 4000);
    } else {
      timeout = setTimeout(() => setBreathPhase("inhale"), 6000);
    }
    return () => clearTimeout(timeout);
  }, [breathPhase]);

  // Content configuration for Morning vs Evening
  const content = isMorning ? [
    { title: "Grounding Breath", text: "Follow the circle. Take 3 slow, deep breaths to arrive in your day.", type: "breathing" },
    { title: "Set a Boundary", text: "What is one thing you will protect today?", type: "boundary" },
    { title: "Priorities", text: "What 1-3 tasks must be done for today to feel 'good enough'?", type: "text" }
  ] : [
    { title: "Calm Breath", text: "Inhale for 4. Exhale for 6. Let the workday go.", type: "breathing" },
    { title: "Boundary Review", text: "Did you honour your boundaries today?", type: "review" },
    { title: "Letting Go", text: "List 3 tasks you will leave for tomorrow-you.", type: "letting_go" }
  ];

  const current = content[step];
  const isLast = step === content.length - 1;

  // VISUAL STYLING (Sunrise vs Starry Night)
  const bgStyle = isMorning 
    ? "linear-gradient(180deg, #FFE0B2 0%, #FFD194 40%, #FF9B71 100%)" // Sunrise
    : "linear-gradient(180deg, #0B1021 0%, #1B2845 50%, #274060 100%)"; // Starry Night
    
  const textColor = isMorning ? "text-[#3E2723]" : "text-[#F8F9FA]";
  const subTextColor = isMorning ? "text-[#5D4037]" : "text-[#B0BEC5]";
  const inputBg = isMorning ? "bg-white/40 border-[#FF9B71]/40" : "bg-white/10 border-white/20";
  const circleColor = isMorning ? "rgba(255, 155, 113, 0.4)" : "rgba(109, 123, 255, 0.4)";

  return (
    <div className={`flex flex-col h-full animate-fade-in relative`} style={{ background: bgStyle }}>
      
      {/* Fake "Stars" overlay for Evening */}
      {!isMorning && (
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute top-[10%] left-[20%] w-1 h-1 bg-white rounded-full animate-pulse" />
          <div className="absolute top-[25%] left-[80%] w-1.5 h-1.5 bg-white rounded-full animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute top-[60%] left-[15%] w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: "2s" }} />
          <div className="absolute top-[80%] left-[75%] w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: "0.5s" }} />
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 z-10 relative">
        <button onClick={onBack} className="p-2 rounded-full bg-black/10 backdrop-blur-sm">
          <ChevronLeft size={18} className={textColor} />
        </button>
        <p className={`text-xs font-bold uppercase tracking-widest ${subTextColor}`}>
          {isMorning ? "Morning Dhyana" : "Evening Dhyana"}
        </p>
        <div className="w-10" />
      </div>

      <div className="flex-1 flex flex-col px-6 pb-8 justify-center items-center text-center z-10 relative">
        
        {/* Animated Breathing Circle */}
        {current.type === "breathing" && (
          <div className="relative flex items-center justify-center h-48 mb-8">
            <div 
              className="rounded-full flex items-center justify-center backdrop-blur-md"
              style={{
                width: breathPhase === "inhale" ? "160px" : "100px",
                height: breathPhase === "inhale" ? "160px" : "100px",
                background: circleColor,
                border: `2px solid ${isMorning ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.3)'}`,
                transition: `all ${breathPhase === "inhale" ? "4s" : "6s"} ease-in-out`,
                boxShadow: `0 0 40px ${circleColor}`
              }}
            >
              <p className={`text-sm font-bold tracking-widest uppercase ${textColor}`}>
                {breathPhase === "inhale" ? "Inhale" : "Exhale"}
              </p>
            </div>
          </div>
        )}

        <h2 className={`text-3xl font-bold mb-3 ${textColor}`}>{current.title}</h2>
        <p className={`text-[15px] leading-relaxed ${subTextColor}`}>{current.text}</p>

        {/* Boundary Selection */}
        {current.type === "boundary" && (
          <div className="flex flex-col gap-3 mt-8 w-full">
            {["No work apps after 9pm", "Take lunch away from my desk", "Leave office on time"].map((b) => (
              <button
                key={b}
                onClick={() => setBoundary(b)}
                className={`p-4 rounded-2xl text-sm font-semibold transition-all text-left ${
                  boundary === b ? "bg-white text-[#FF9B71] shadow-lg scale-105" : `${inputBg} ${textColor}`
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        )}

        {/* Text Area for Priorities / Letting Go */}
        {(current.type === "text" || current.type === "letting_go") && (
          <div className="w-full mt-8">
            <textarea
              value={current.type === "text" ? priorities : letGoText}
              onChange={(e) => current.type === "text" ? setPriorities(e.target.value) : setLetGoText(e.target.value)}
              placeholder="Type here..."
              className={`w-full p-5 rounded-2xl text-sm resize-none outline-none backdrop-blur-sm transition-all ${inputBg} ${textColor} placeholder-opacity-50`}
              style={{ height: 120 }}
            />
            {current.type === "letting_go" && letGoText.length > 5 && (
               <p className={`text-xs mt-3 ${subTextColor} animate-fade-in`}>
                 ✓ Noted. They belong to tomorrow-you.
               </p>
            )}
          </div>
        )}

        {/* Boundary Review */}
        {current.type === "review" && (
          <div className="flex gap-3 mt-8 w-full">
            {["Yes", "Partly", "No"].map((r) => (
              <button
                key={r}
                onClick={() => setBoundaryHonoured(r)}
                className={`flex-1 py-4 rounded-2xl text-sm font-semibold transition-all ${
                  boundaryHonoured === r ? "bg-white text-[#1B2845] shadow-lg scale-105" : `${inputBg} ${textColor}`
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        )}

      </div>

      <div className="px-6 pb-8 z-10 relative">
        <button 
          onClick={isLast ? onDone : () => setStep(s => s + 1)} 
          className={`w-full py-4 rounded-full font-bold flex items-center justify-center gap-2 shadow-xl backdrop-blur-md transition-all active:scale-95 ${
            isMorning ? "bg-white/80 text-[#3E2723] hover:bg-white" : "bg-[#6D7BFF] text-white hover:bg-[#5560EE]"
          }`}
        >
          {isLast ? "Complete Routine ✓" : "Continue"} {!isLast && <ChevronRight size={18} />}
        </button>
      </div>
    </div>
  );
}
