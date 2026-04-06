import { ChevronLeft, Wifi, Signal, Battery, Search, Phone, MessageSquare, Music } from "lucide-react";

export default function WidgetPreview({ onBack, onTapOut, onLogDay }) {
  return (
    <div className="flex flex-col h-full bg-black">
      {/* Dynamic Island / Status Bar */}
      <div className="flex items-center justify-between px-6 pt-3 pb-1 z-50">
        <span className="text-white text-[13px] font-semibold tracking-wide">9:41</span>
        <div className="w-24 h-7 bg-black rounded-full absolute left-1/2 -translate-x-1/2 shadow-inner" />
        <div className="flex items-center gap-1.5 opacity-90">
          <Signal size={14} className="text-white fill-white" />
          <Wifi size={14} className="text-white" />
          <Battery size={15} className="text-white" />
        </div>
      </div>

      <div className="flex items-center gap-2 px-4 py-2 z-50 relative">
        <button onClick={onBack} className="p-1.5 rounded-full bg-black/40 backdrop-blur-md">
          <ChevronLeft size={16} strokeWidth={2} className="text-white" />
        </button>
        <p className="text-white/80 text-[11px] font-medium backdrop-blur-sm px-2 py-1 rounded-md bg-black/20">Return to App</p>
      </div>

      {/* Realistic iOS Wallpaper Background */}
      <div className="absolute inset-0 z-0 opacity-90" style={{
        background: "radial-gradient(circle at 0% 0%, #bde1e6 0%, #a2d6d8 30%, #a8dcf0 70%, #87a7e1 100%)"
      }}>
        {/* Organic overlay shapes */}
        <div className="absolute top-[-10%] right-[-20%] w-[120%] h-[60%] rounded-full bg-[#dcf2f5] mix-blend-overlay opacity-60 blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[80%] h-[70%] rounded-full bg-[#91c6f5] mix-blend-overlay opacity-50 blur-3xl" />
      </div>

      {/* iPhone Home Screen Content */}
      <div className="flex-1 px-4 py-2 flex flex-col gap-6 z-10 relative">

        {/* TapOut LARGE Widget — 2×2 */}
        <div
          className="rounded-[22px] p-4 relative overflow-hidden shadow-xl"
          style={{ background: "linear-gradient(145deg, #003B64, #2A2850)", minHeight: 160 }}
        >
          <div className="absolute -top-4 -right-4 w-32 h-32 rounded-full bg-[#6D7BFF]/20 blur-xl" />
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="text-white/60 text-[10px] font-bold uppercase tracking-widest mb-0.5">TapOut</div>
              <div className="text-white text-sm font-bold">Your wellness</div>
            </div>
            <div className="flex gap-1 items-center mt-1">
              {["#5CB85C", "#5CB85C", "#F5A623", "#E8343A", "#F5A623"].map((c, i) => (
                <div key={i} className="w-2 h-2 rounded-full" style={{ background: c }} />
              ))}
            </div>
          </div>
          <div className="mb-4">
            <div className="flex justify-between mb-1.5">
              <span className="text-white/60 text-[11px] font-medium">Today's stress</span>
              <span className="text-[11px] font-bold text-[#F5A623]">6 / 10</span>
            </div>
            <div className="h-2.5 rounded-full overflow-hidden bg-white/10">
              <div className="h-full rounded-full" style={{ width: "60%", background: "linear-gradient(90deg, #5CB85C, #F5A623)" }} />
            </div>
          </div>
          
          {/* NOW CLICKABLE BUTTONS */}
          <div className="flex gap-2.5 mt-auto">
            <button 
              onClick={onTapOut}
              className="flex-1 py-2.5 rounded-xl flex items-center justify-center gap-1.5 bg-[#6D7BFF] shadow-lg transition-transform active:scale-95"
            >
              <span className="text-white text-sm">⚡</span><span className="text-white text-[11px] font-bold">Tap Out</span>
            </button>
            <button 
              onClick={onLogDay}
              className="flex-1 py-2.5 rounded-xl flex items-center justify-center gap-1.5 bg-white/10 backdrop-blur-sm transition-transform active:scale-95"
            >
              <span className="text-white text-sm">🌙</span><span className="text-white text-[11px] font-medium">Log day</span>
            </button>
          </div>
        </div>

        {/* Realistic App Grid */}
        <div className="grid grid-cols-4 gap-y-6 gap-x-2 px-1">
          {/* Row 1 */}
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-[60px] h-[60px] rounded-[14px] bg-gradient-to-b from-[#4ade80] to-[#22c55e] flex items-center justify-center shadow-sm">
              <div className="w-8 h-5 rounded-md bg-white flex items-center justify-center relative">
                <div className="absolute right-[-6px] border-l-4 border-l-white border-y-4 border-y-transparent w-0 h-0" />
              </div>
            </div>
            <span className="text-white text-[11px] font-medium drop-shadow-md">FaceTime</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-[60px] h-[60px] rounded-[14px] bg-white flex flex-col overflow-hidden shadow-sm">
              <div className="bg-red-500 h-4 w-full text-[8px] text-white font-bold flex items-center justify-center tracking-widest">TUE</div>
              <div className="flex-1 flex items-center justify-center text-3xl font-light text-black">1</div>
            </div>
            <span className="text-white text-[11px] font-medium drop-shadow-md">Calendar</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-[60px] h-[60px] rounded-[14px] bg-white flex items-center justify-center shadow-sm relative overflow-hidden">
              <div className="absolute w-6 h-6 rounded-full bg-yellow-400 mix-blend-multiply opacity-80 -mt-3 -ml-3" />
              <div className="absolute w-6 h-6 rounded-full bg-red-400 mix-blend-multiply opacity-80 -mt-3 ml-3" />
              <div className="absolute w-6 h-6 rounded-full bg-blue-400 mix-blend-multiply opacity-80 mt-3 -ml-3" />
              <div className="absolute w-6 h-6 rounded-full bg-green-400 mix-blend-multiply opacity-80 mt-3 ml-3" />
            </div>
            <span className="text-white text-[11px] font-medium drop-shadow-md">Photos</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-[60px] h-[60px] rounded-[14px] bg-gradient-to-b from-[#e5e7eb] to-[#9ca3af] flex items-center justify-center shadow-sm">
              <div className="w-10 h-10 rounded-full bg-black/80 flex items-center justify-center border-2 border-gray-400">
                <div className="w-4 h-4 rounded-full bg-blue-500/80 blur-[2px]" />
                <div className="absolute w-2 h-2 rounded-full bg-white opacity-80 shadow-[0_0_4px_white]" />
              </div>
            </div>
            <span className="text-white text-[11px] font-medium drop-shadow-md">Camera</span>
          </div>

          {/* Row 2 */}
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-[60px] h-[60px] rounded-[14px] bg-gradient-to-b from-[#60a5fa] to-[#3b82f6] flex items-center justify-center shadow-sm relative">
              <div className="w-10 h-6 bg-white rounded-sm" />
              <div className="absolute top-[22px] w-10 h-6 border-t-[12px] border-t-[#3b82f6]/20 border-x-[20px] border-x-transparent" />
            </div>
            <span className="text-white text-[11px] font-medium drop-shadow-md">Mail</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-[60px] h-[60px] rounded-[14px] bg-white flex flex-col overflow-hidden shadow-sm relative">
              <div className="h-4 bg-yellow-400 w-full" />
              <div className="flex-1 p-1.5 flex flex-col gap-1.5 mt-1">
                <div className="w-full h-1 bg-gray-200 rounded-full" />
                <div className="w-3/4 h-1 bg-gray-200 rounded-full" />
                <div className="w-full h-1 bg-gray-200 rounded-full" />
              </div>
            </div>
            <span className="text-white text-[11px] font-medium drop-shadow-md">Notes</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-[60px] h-[60px] rounded-[14px] bg-white flex flex-col p-2 justify-center gap-1.5 shadow-sm">
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-blue-500"/><div className="w-8 h-1.5 bg-gray-200 rounded-full"/></div>
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-orange-500"/><div className="w-8 h-1.5 bg-gray-200 rounded-full"/></div>
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-purple-500"/><div className="w-8 h-1.5 bg-gray-200 rounded-full"/></div>
            </div>
            <span className="text-white text-[11px] font-medium drop-shadow-md">Reminders</span>
          </div>
          
          {/* TAP OUT SMALL WIDGET (also clickable!) */}
          <button 
            onClick={onTapOut}
            className="flex flex-col items-center gap-1.5 transition-transform active:scale-95"
          >
            <div
              className="w-[60px] h-[60px] rounded-[14px] flex items-center justify-center shadow-lg"
              style={{ background: "linear-gradient(145deg, #003B64, #4A4868)", boxShadow: "0 4px 16px rgba(109,123,255,0.4)" }}
            >
              <span className="text-2xl">⚡</span>
            </div>
            <span className="text-white text-[11px] text-center opacity-80">TapOut</span>
          </button>
        </div>

      </div>

      {/* Search Pill */}
      <div className="absolute bottom-[115px] w-full flex justify-center z-20">
        <div className="px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md flex items-center gap-1.5 shadow-sm border border-white/10">
          <Search size={12} className="text-white/80" />
          <span className="text-white/80 text-[11px] font-medium">Search</span>
        </div>
      </div>

      {/* iOS Dock */}
      <div className="mx-3 mb-4 rounded-3xl bg-white/30 backdrop-blur-xl border border-white/20 p-3.5 flex justify-between z-20 shadow-lg relative">
        <div className="w-[55px] h-[55px] rounded-[14px] bg-gradient-to-b from-[#4ade80] to-[#22c55e] flex items-center justify-center">
          <Phone size={28} className="text-white fill-white" />
        </div>
        <div className="w-[55px] h-[55px] rounded-[14px] bg-white flex items-center justify-center">
          <div className="w-11 h-11 rounded-full bg-blue-500 relative flex items-center justify-center border-4 border-white">
            <div className="absolute w-1 h-8 bg-white rotate-45 rounded-full" />
            <div className="absolute w-1 h-8 bg-white -rotate-45 rounded-full" />
            <div className="absolute w-3 h-3 rounded-full bg-blue-500 z-10" />
          </div>
        </div>
        <div className="w-[55px] h-[55px] rounded-[14px] bg-gradient-to-b from-[#4ade80] to-[#22c55e] flex items-center justify-center relative">
          <MessageSquare size={28} className="text-white fill-white" />
          <div className="absolute w-2 h-2 rounded-full bg-[#4ade80] -bottom-1 -left-1" />
        </div>
        <div className="w-[55px] h-[55px] rounded-[14px] bg-gradient-to-b from-[#fb7185] to-[#f43f5e] flex items-center justify-center">
          <Music size={26} className="text-white" />
        </div>
      </div>

      {/* Home Indicator */}
      <div className="flex justify-center pb-2 z-20">
        <div className="w-32 h-1 bg-white rounded-full shadow-sm" />
      </div>
    </div>
  );
}
