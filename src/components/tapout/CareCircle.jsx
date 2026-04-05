import { ChevronLeft, MapPin } from "lucide-react";

export default function CareCircle({ onBack }) {
  return (
    <div className="flex flex-col h-full bg-[#E2DEF2]">
      <div className="flex items-center gap-3 px-5 py-4 bg-white border-b">
        <button onClick={onBack} className="p-2 rounded-full bg-[#E2DEF2]"><ChevronLeft size={16} color="#6D7BFF" /></button>
        <h2 className="text-base font-bold text-[#003B64]">Care Circle</h2>
      </div>
      
      <div className="p-5 flex flex-col gap-4">
        <div className="p-4 rounded-3xl bg-white shadow-sm border border-[#B8B8FF]">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-[#6D7BFF] flex items-center justify-center"><MapPin size={16} color="white"/></div>
             <div>
               <p className="text-xs font-bold text-[#003B64]">Hangout suggestion</p>
               <p className="text-[11px] text-[#4A4868] mt-1">You and Joel are both free Saturday 4pm near Tiong Bahru.</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
