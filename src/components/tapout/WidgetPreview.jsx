import { ChevronLeft, Wifi, Signal, Battery } from "lucide-react";

export default function WidgetPreview({ onBack }) {
  return (
    <div className="flex flex-col h-full bg-[#1C2340]">
      <div className="flex items-center justify-between px-5 pt-3 pb-1">
        <span className="text-white text-[12px] font-semibold">9:41</span>
        <div className="flex items-center gap-1.5 text-white"><Signal size={13}/><Wifi size={13}/><Battery size={13}/></div>
      </div>

      <div className="flex items-center gap-2 px-4 py-2">
        <button onClick={onBack} className="p-1.5 rounded-full bg-white/10"><ChevronLeft size={16} color="white" /></button>
        <p className="text-white/60 text-[11px] font-medium">iPhone Home Screen</p>
      </div>

      <div className="flex-1 p-4 flex flex-col gap-4">
        {/* Large Widget */}
        <div className="rounded-[24px] p-4 bg-gradient-to-br from-[#003B64] to-[#2A2850] shadow-2xl relative overflow-hidden">
          <div className="absolute -top-4 -right-4 w-32 h-32 rounded-full bg-[#6D7BFF]/20 blur-xl" />
          <div className="flex justify-between mb-4">
            <div><p className="text-white/50 text-[9px] font-bold uppercase">TapOut</p><p className="text-white text-sm font-bold">Your wellness</p></div>
            <div className="flex gap-1 mt-1">{["#5CB85C", "#F5A623", "#E8343A"].map((c,i) => <div key={i} className="w-2 h-2 rounded-full" style={{background:c}}/>)}</div>
          </div>
          <div className="flex gap-2">
            <div className="flex-1 py-3 rounded-2xl flex items-center justify-center gap-1.5 bg-[#6D7BFF] shadow-lg"><span className="text-white text-sm">⚡</span><span className="text-white text-[11px] font-bold">Tap Out</span></div>
            <div className="flex-1 py-3 rounded-2xl flex items-center justify-center gap-1.5 bg-white/10"><span className="text-white text-sm">🌙</span><span className="text-white text-[11px] font-medium">Log day</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
