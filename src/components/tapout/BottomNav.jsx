import { Home, BookOpen, PenLine, Users } from "lucide-react";

const tabs = [
  { id: "home", label: "Home", Icon: Home },
  { id: "snapshot", label: "Log", Icon: BookOpen },
  { id: "journal", label: "Journal", Icon: PenLine },
  { id: "circle", label: "Circle", Icon: Users }
];

export default function BottomNav({ active, onNavigate }) {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 z-40 flex items-center justify-around px-2 py-2 border-t"
      style={{ background: "rgba(255,255,255,0.96)", backdropFilter: "blur(12px)", borderColor: "#B8B8FF" }}
    >
      {tabs.map(({ id, label, Icon }) => (
        <button
          key={id}
          onClick={() => onNavigate(id)}
          className="flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-2xl transition-all"
          style={active === id ? { background: "#E2DEF2" } : {}}
        >
          <Icon
            size={20}
            strokeWidth={active === id ? 2.5 : 1.5}
            style={{ color: active === id ? "#6D7BFF" : "#B7C4D8" }}
          />
          <span
            className="text-[10px] font-semibold"
            style={{ color: active === id ? "#6D7BFF" : "#B7C4D8" }}
          >
            {label}
          </span>
        </button>
      ))}
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-28 h-1 bg-gray-300 rounded-full opacity-40" />
    </div>
  );
}
