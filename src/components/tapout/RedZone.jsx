import { ChevronLeft, FileText, HelpCircle } from "lucide-react";

export default function RedZone({ onBack }) {
  return (
    <div className="flex flex-col h-full bg-[#E2DEF2]">
      <div className="flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-[#CC0000] to-[#E8343A]">
        <button onClick={onBack} className="p-2 rounded-full bg-white/15"><ChevronLeft size={16} color="white" /></button>
        <h2 className="text-sm font-bold text-white">Red Zone Alert</h2>
      </div>

      <div className="p-5 flex flex-col gap-4">
        <div className="p-4 rounded-3xl bg-[#FFEDED] border border-[#FF8080]">
          <p className="text-[11px] text-[#CC0000]">⚠️ This data suggests <strong>organisational pressure</strong>, not personal weakness. Your health is the priority.</p>
        </div>

        <button className="flex items-center gap-4 p-4 rounded-3xl bg-white shadow-sm">
          <div className="w-11 h-11 rounded-2xl flex items-center justify-center bg-[#E2DEF2]"><FileText size={18} color="#6D7BFF"/></div>
          <div className="text-left"><p className="text-sm font-semibold text-gray-800">Prepare Data Summary</p><p className="text-[10px] text-gray-400">Generate report for therapist or manager</p></div>
        </button>
        
        <div className="p-4 rounded-3xl bg-white shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center bg-[#FFF3CC]"><HelpCircle size={18} color="#F5A623"/></div>
            <div><p className="text-sm font-semibold text-gray-800">Is this role sustainable?</p><p className="text-[10px] text-gray-400">Does staying feel sustainable for 1–2 years?</p></div>
          </div>
        </div>
      </div>
    </div>
  );
}
