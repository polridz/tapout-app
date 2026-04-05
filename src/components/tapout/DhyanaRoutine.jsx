import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function DhyanaRoutine({ mode, onDone, onBack }) {
  const [step, setStep] = useState(0);
  const isMorning = mode === "morning";
  
  const content = isMorning ? [
    { title: "Grounding", text: "Feel your feet on the floor. Take 3 slow breaths.", icon: "🌱" },
    { title: "Set a Boundary", text: "Choose one boundary to protect today: e.g. No work apps after 9pm.", icon: "🛡" },
    { title: "Priorities", text: "What 1-3 tasks must be done for today to feel 'good enough'?", icon: "✅" }
  ] : [
    { title: "Calm Breath", text: "Inhale for 4. Exhale for 6. Let today go.", icon: "🌙" },
    { title: "Boundary Review", text: "Did you honour your boundary today?", icon: "🔍" },
    { title: "Letting Go", text: "List 3 tasks you will not think about until tomorrow.", icon: "☁️" }
  ];

  const current = content[step];
  const isLast = step === content.length - 1;
  const bgColor = isMorning ? "from-[#FFF8E0] to-[#FFE88A]" : "from-[#2C2B3A] to-[#4A4860]";
  const textColor = isMorning ? "text-[#4A3800]" : "text-white";

  return (
    <div className={`flex flex-col h-full bg-gradient-to-br ${bgColor}`}>
      <div className="flex items-center justify-between px-5 py-4">
        <button onClick={onBack} className="p-2 rounded-full bg-white/15"><ChevronLeft size={18} className={textColor} /></button>
        <p className={`text-xs font-semibold ${textColor}`}>{isMorning ? "🌅 Morning Dhyana" : "🌙 Evening Dhyana"}</p>
        <div className="w-10" />
      </div>

      <div className="flex-1 flex flex-col px-6 pb-8 justify-center text-center">
        <div className="text-6xl mb-6">{current.icon}</div>
        <h2 className={`text-2xl font-bold mb-4 ${textColor}`}>{current.title}</h2>
        <p className={`text-lg opacity-80 ${textColor}`}>{current.text}</p>
      </div>

      <div className="px-6 pb-8">
        <button 
          onClick={isLast ? onDone : () => setStep(s => s + 1)} 
          className="w-full py-4 rounded-3xl font-semibold flex items-center justify-center gap-2 bg-[#6D7BFF] text-white"
        >
          {isLast ? "Complete ✓" : "Next"} {!isLast && <ChevronRight size={16} />}
        </button>
      </div>
    </div>
  );
}
