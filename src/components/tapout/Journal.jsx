import { useState } from "react";
import { ChevronLeft, Lock, PenLine, Sparkles } from "lucide-react";

export default function Journal({ onBack }) {
  const [entry, setEntry] = useState("");
  const [saved, setSaved] = useState(false);

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
      {/* Header */}
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

      <div className="flex-1 overflow-y-auto px-5 py-6 flex flex-col gap-6">
        
        {/* Prompts Section */}
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

        {/* Text Area */}
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
            style={{ minHeight: "250px" }}
          />
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={entry.length === 0}
          className={`w-full py-4 rounded-full font-bold transition-all shadow-md ${
            entry.length > 0 ? "bg-[#6D7BFF] text-white active:scale-95" : "bg-[#D6D3E8] text-white/50 cursor-not-allowed"
          }`}
        >
          {saved ? "Encrypted & Saved ✓" : "Save Entry"}
        </button>

      </div>
    </div>
  );
}
