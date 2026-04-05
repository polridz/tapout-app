import { useState } from "react";
import { ChevronLeft, MessageCircle, Plus, MapPin } from "lucide-react";

const circleMembers = [
  {
    name: "Polina",
    initials: "PO",
    weekColor: "#F5A623",
    weekLabel: "Mostly Amber",
    status: "Heavy client week 💼",
    days: [null, "#5CB85C", "#F5A623", "#F5A623", "#E8343A", "#F5A623", null],
    glimpse: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=200&h=200&fit=crop",
    glimpseCaption: "Finally, yoga tonight 🧘",
  },
  {
    name: "Joel",
    initials: "JO",
    weekColor: "#5CB85C",
    weekLabel: "Mostly Green",
    status: "Lighter week, feeling good ✨",
    days: ["#5CB85C", "#5CB85C", "#F5A623", "#5CB85C", "#5CB85C", null, null],
    glimpse: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=200&h=200&fit=crop",
    glimpseCaption: "Coffee + emails ☕",
  },
  {
    name: "Yumi",
    initials: "YU",
    weekColor: "#E8343A",
    weekLabel: "High Stress",
    status: "Quarterly deadline crunch 🔴",
    days: ["#E8343A", "#E8343A", "#F5A623", "#E8343A", "#E8343A", null, null],
    glimpse: null,
    glimpseCaption: null,
  },
  {
    name: "Jun Da",
    initials: "JD",
    weekColor: "#5CB85C",
    weekLabel: "Green Week",
    status: "Took Friday off 🌴",
    days: ["#5CB85C", "#5CB85C", "#5CB85C", "#5CB85C", null, null, null],
    glimpse: "https://images.unsplash.com/photo-1547592180-85f173990554?w=200&h=200&fit=crop",
    glimpseCaption: "Beach lunch break 🌊",
  },
  {
    name: "Lucus",
    initials: "LU",
    weekColor: "#F5A623",
    weekLabel: "Mixed Week",
    status: "Big pitch on Thursday 📊",
    days: ["#5CB85C", "#F5A623", "#F5A623", "#E8343A", "#5CB85C", null, null],
    glimpse: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=200&h=200&fit=crop",
    glimpseCaption: "Post-pitch relief 🎉",
  },
];

const DAYS = ["M", "T", "W", "T", "F", "S", "S"];

export default function CareCircle({ onBack }) {
  const [reactions, setReactions] = useState({});

  const react = (name, type) => {
    setReactions((prev) => ({ ...prev, [name]: type }));
  };

  return (
    <div className="flex flex-col h-full" style={{ background: "#E2DEF2" }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b" style={{ borderColor: "#B8B8FF", background: "white" }}>
        <button onClick={onBack} className="p-2 rounded-full" style={{ background: "#E2DEF2" }}>
          <ChevronLeft size={16} strokeWidth={2} style={{ color: "#6D7BFF" }} />
        </button>
        <div className="flex-1">
          <h2 className="text-base font-bold" style={{ color: "#003B64" }}>Care Circle</h2>
          <p className="text-[10px]" style={{ color: "#B7C4D8" }}>Your trusted people</p>
        </div>
        <button className="p-2 rounded-full" style={{ background: "#6D7BFF" }}>
          <Plus size={16} strokeWidth={2} className="text-white" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4">
        {/* Glimpse row */}
        <div>
          <p className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: "#4A4868" }}>Recent Glimpses</p>
          <div className="flex gap-3 overflow-x-auto pb-1">
            {circleMembers.filter(m => m.glimpse).map((m) => (
              <div key={m.name} className="flex-shrink-0 flex flex-col items-center gap-1.5">
                <div
                  className="w-14 h-14 rounded-full overflow-hidden"
                  style={{ border: `2.5px solid ${m.weekColor}`, boxShadow: `0 0 0 2px white, 0 2px 10px ${m.weekColor}44` }}
                >
                  <img src={m.glimpse} alt={m.name} className="w-full h-full object-cover" />
                </div>
                <span className="text-[10px] font-medium" style={{ color: "#4A4868" }}>{m.name}</span>
              </div>
            ))}
            <div className="flex-shrink-0 flex flex-col items-center gap-1.5">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ border: "2px dashed #B8B8FF", background: "rgba(255,255,255,0.6)" }}
              >
                <Plus size={18} strokeWidth={1.5} style={{ color: "#B8B8FF" }} />
              </div>
              <span className="text-[10px]" style={{ color: "#B7C4D8" }}>Add yours</span>
            </div>
          </div>
        </div>

        {/* Circle members */}
        <div>
          <p className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: "#4A4868" }}>Circle Status</p>
          <div className="flex flex-col gap-3">
            {circleMembers.map((m) => (
              <div
                key={m.name}
                className="p-4 rounded-3xl"
                style={{ background: "white", boxShadow: "0 2px 12px rgba(74,72,104,0.08)" }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs text-white"
                    style={{ background: m.weekColor }}
                  >
                    {m.initials}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold" style={{ color: "#003B64" }}>{m.name}</p>
                      <span
                        className="text-[9px] font-semibold px-2 py-0.5 rounded-full text-white"
                        style={{ background: m.weekColor }}
                      >
                        {m.weekLabel}
                      </span>
                    </div>
                    <p className="text-[11px] mt-0.5" style={{ color: "#4A4868" }}>{m.status}</p>
                  </div>
                </div>

                <div className="flex gap-1 mb-3">
                  {m.days.map((color, i) => (
                    <div
                      key={i}
                      className="flex-1 h-2 rounded-full"
                      style={{ background: color || "#E2DEF2" }}
                    />
                  ))}
                </div>

                <div className="flex gap-2">
                  {[["❤️", "heart"], ["🫂", "hug"], ["💪", "strength"]].map(([emoji, type]) => (
                    <button
                      key={type}
                      onClick={() => react(m.name, type)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs transition-all"
                      style={reactions[m.name] === type
                        ? { background: "#E2DEF2", fontWeight: 600 }
                        : { background: "#F5F4FB", color: "#4A4868" }
                      }
                    >
                      {emoji}
                    </button>
                  ))}
                  <button className="ml-auto p-1.5 rounded-full" style={{ background: "#F5F4FB" }}>
                    <MessageCircle size={13} strokeWidth={1.5} style={{ color: "#6D7BFF" }} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hangout suggestion */}
        <div
          className="rounded-3xl p-4 animate-fade-in"
          style={{ background: "white", border: "1.5px solid #B8B8FF" }}
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#6D7BFF" }}>
              <MapPin size={16} strokeWidth={1.5} className="text-white" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold" style={{ color: "#003B64" }}>Hangout suggestion</p>
              <p className="text-[11px] mt-1 leading-relaxed" style={{ color: "#4A4868" }}>
                You and <strong>Joel</strong> are both free <strong>Saturday 4pm</strong>. Suggest coffee at Tiong Bahru near the midpoint?
              </p>
              <div className="flex gap-2 mt-3">
                <button
                  className="flex-1 py-2 rounded-2xl text-xs font-semibold text-white"
                  style={{ background: "#6D7BFF" }}
                >
                  Send suggestion ✓
                </button>
                <button
                  className="px-4 py-2 rounded-2xl text-xs font-medium"
                  style={{ background: "#E2DEF2", color: "#4A4868" }}
                >
                  Maybe later
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="h-4" />
      </div>
    </div>
  );
}
