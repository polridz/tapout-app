import { Wifi, Signal, BatteryMedium } from "lucide-react";

export default function MobileShell({ children }) {
  return (
    <div
      className="relative rounded-[3rem] overflow-hidden shadow-2xl"
      style={{
        width: 390,
        height: 844,
        background: "#1a1a1a",
        boxShadow: "0 40px 80px rgba(0,0,0,0.35), 0 0 0 2px rgba(255,255,255,0.1) inset",
      }}
    >
      {/* iPhone Hardware Buttons */}
      <div className="absolute -left-1 top-28 w-1 h-10 bg-gray-700 rounded-l-sm" />
      <div className="absolute -left-1 top-44 w-1 h-14 bg-gray-700 rounded-l-sm" />
      <div className="absolute -left-1 top-60 w-1 h-14 bg-gray-700 rounded-l-sm" />
      <div className="absolute -right-1 top-40 w-1 h-20 bg-gray-700 rounded-r-sm" />

      {/* Screen Area */}
      <div className="absolute inset-[3px] rounded-[2.7rem] overflow-hidden flex flex-col bg-[#E2DEF2]">
        
        {/* Universal iOS Status Bar with Dynamic Island */}
        <div className="h-[48px] w-full flex items-center justify-between px-6 pt-2 z-50 flex-shrink-0 bg-white border-b border-[#B8B8FF]/30">
          <span className="text-[14px] font-bold tracking-tight text-[#003B64]">
            9:41
          </span>
          
          {/* Dynamic Island Notch */}
          <div className="absolute left-1/2 -translate-x-1/2 top-2.5 w-[110px] h-[30px] bg-black rounded-full shadow-sm" />
          
          <div className="flex items-center gap-1.5 text-[#003B64]">
            <Signal size={14} className="fill-current" />
            <Wifi size={14} />
            <BatteryMedium size={16} />
          </div>
        </div>

        {/* App Content */}
        <div className="flex-1 w-full relative overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
// END OF FILE
