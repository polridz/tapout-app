import { useState } from "react";
import { ChevronLeft, Lock, PenLine, Sparkles } from "lucide-react";

export default function Journal({ onBack }) {
  const [entry, setEntry] = useState("");
  const [saved, setSaved] = useState(false);
  const [optIn, setOptIn] = useState(false); // State for the AI pattern spotting toggle

  const prompts = [
    "Describe one moment today that drained you.",
    "What did you do today that supported your health?",
    "If a friend felt this way, what would you tell them?",
  ];

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => { setSaved(false); setEntry(""); onBack(); }, 1500);
  };

  return (
    <div className="flex flex-col h-full bg-[#FDFBF7]">
      <div className="flex items-center gap-3 px-5 py-4 bg-white border-b border-[#B8B8FF]">
        <button onClick={onBack} className="p-2 rounded-full bg-[#E2DEF2]">
          <ChevronLeft size={16} color="#6D7BFF" />
        </button>
        <div className="flex-1">
          <h2 className="text-base font-bold text-[#003B64]">Private Journal</h2>
          <p className="text-[10px] text-[#B7C4D8]">Your thoughts are encrypted</p>
        </div>
        <Lock size={16} color="#5CB85C" />
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-6 flex flex-col gap-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-[#4A4868] mb-3 flex items-center gap-2">
            <Sparkles size={14} color="#F5A623"/> Reflection Prompts
          </p>
          <div className="flex overflow-x-auto gap-3 pb-2 -mx-5 px-5 snap-x">
            {prompts.map((p, i) => (
              <button 
                key={i} 
                onClick={() => setEntry(p + "\n\n")}
                className="w-48 flex-shrink-0 p-3 rounded-2xl bg-white border border-[#B8B8FF] text-left text-[11px] text-[#4A4868] hover:bg-[#E2DEF2] transition-colors snap-center"
              >
                "{p}"
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <PenLine size={14} color="#6D7BFF" />
            <p className="text-xs font-bold uppercase tracking-wide text-[#4A4868]">Today's Entry</p>
          </div>
          <textarea
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            placeholder="Write whatever is on your mind. It's safe here."
            className="flex-1 w-full p-4 rounded-2xl bg-white border border-[#B8B8FF] resize-none outline-none focus:border-[#6D7BFF] transition-colors text-sm text-[#4A4868] shadow-inner"
            style={{ minHeight: "220px" }}
          />
        </div>

        {/* Privacy & Opt-In Box */}
        <div className="flex flex-col gap-3 p-4 rounded-2xl bg-[#E8F5E8] border border-[#5CB85C]/30 mt-1">
          <div className="flex items-start gap-3">
            <Lock size={16} color="#2E7D32" className="mt-0.5 flex-shrink-0" />
            <p className="text-[11px] leading-relaxed text-[#2E7D32]">
              <strong>Your entries are private and encrypted.</strong> They are never uploaded to the cloud or shared.
            </p>
          </div>
          <div className="h-[1px] w-full bg-[#5CB85C]/20" />
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-medium text-[#2E7D32] pr-4">
              Allow on-device pattern spotting to help identify burnout triggers?
            </p>
            <button
              onClick={() => setOptIn(!optIn)}
              className="relative w-11 h-6 rounded-full transition-all flex-shrink-0"
              style={{ background: optIn ? "#5CB85C" : "#D6D3E8" }}
            >
              <div
                className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all"
                style={{ left: optIn ? "calc(100% - 1.25rem)" : "0.25rem" }}
              />
            </button>
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={entry.length === 0}
          className={`w-full py-4 rounded-full font-bold transition-all shadow-md mt-2 ${
            entry.length > 0 ? "bg-[#6D7BFF] text-white active:scale-95" : "bg-[#D6D3E8] text-white/50 cursor-not-allowed"
          }`}
        >
          {saved ? "Encrypted & Saved ✓" : "Save Entry"}
        </button>

      </div>
    </div>
  );
}
// END OF FILE
