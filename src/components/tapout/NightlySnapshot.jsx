import { useState } from "react";
import { ChevronLeft } from "lucide-react";

export default function NightlySnapshot({ onSave, onBack }) {
  const [stress, setStress] = useState(5);
  const [symptoms, setSymptoms] = useState({});

  return (
    <div className="flex flex-col h-full bg-[#E2DEF2]">
      <div className="flex items-center gap-3 px-5 py-4 bg-white border-b border-[#B8B8FF]">
        <button onClick={onBack} className="p-2 rounded-full bg-[#E2DEF2]"><ChevronLeft size={16} color="#6D7BFF" /></button>
        <div><h2 className="text-base font-bold text-[#003B64]">Nightly Snapshot</h2></div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-6">
        <section>
          <p className="text-xs font-bold uppercase mb-2 text-[#4A4868]">Stress Level</p>
          <input type="range" min="0" max="10" value={stress} onChange={(e) => setStress(e.target.value)} className="w-full h-2 rounded-lg cursor-pointer" />
          <div className="flex justify-between mt-1 text-[10px] text-gray-500"><span>Calm</span><span>Overwhelming</span></div>
        </section>

        <section>
          <p className="text-xs font-bold uppercase mb-2 text-[#4A4868]">Symptoms Today</p>
          <div className="grid grid-cols-2 gap-2">
            {[{ id: "headache", label: "Headache", emoji: "🤕" }, { id: "tech_neck", label: "Tech Neck", emoji: "😣" }, { id: "nosebleed", label: "Nosebleed", emoji: "🩸" }].map(s => (
              <button key={s.id} onClick={() => setSymptoms(p => ({...p, [s.id]: !p[s.id]}))} className={`p-3 rounded-2xl text-left border ${symptoms[s.id] ? 'bg-[#E2DEF2] border-[#6D7BFF]' : 'bg-white border-[#B8B8FF]'}`}>
                {s.emoji} <span className="text-xs font-semibold text-[#4A4868]">{s.label}</span>
              </button>
            ))}
          </div>
        </section>

        <button onClick={() => onSave({ stress, nosebleed: !!symptoms["nosebleed"] })} className="w-full py-4 rounded-3xl font-bold text-white bg-gradient-to-r from-[#6D7BFF] to-[#4A58E0]">Save Today ✓</button>
      </div>
    </div>
  );
}
