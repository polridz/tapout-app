import { useState } from "react";
import MobileShell from "../components/tapout/MobileShell";
import HomeDashboard from "../components/tapout/HomeDashboard";
import SOSReset from "../components/tapout/SOSReset";
import NightlySnapshot from "../components/tapout/NightlySnapshot";
import CareCircle from "../components/tapout/CareCircle";
import RedZone from "../components/tapout/RedZone";
import DhyanaRoutine from "../components/tapout/DhyanaRoutine";
import SummaryReport from "../components/tapout/SummaryReport";
import WidgetPreview from "../components/tapout/WidgetPreview";
import BottomNav from "../components/tapout/BottomNav";

export default function TapOut() {
  const [screen, setScreen] = useState("home");
  const [dhyanaMode, setDhyanaMode] = useState("morning");
  const [todayStress, setTodayStress] = useState(null);
  const [todayNosebleed, setTodayNosebleed] = useState(false);
  const [snapshotSaved, setSnapshotSaved] = useState(false);

  const navigate = (to) => setScreen(to);

  const handleSnapshotSave = ({ stress, nosebleed }) => {
    setTodayStress(stress);
    setTodayNosebleed(nosebleed);
    setSnapshotSaved(true);
    navigate("home");
  };

  const renderScreen = () => {
    switch (screen) {
      case "home":
        return (
          <HomeDashboard
            onTapOut={() => navigate("sos")}
            onRedZone={() => navigate("redzone")}
            onDhyana={(mode) => { setDhyanaMode(mode); navigate("dhyana"); }}
            onSummary={() => navigate("summary")}
            todayStress={todayStress}
            todayNosebleed={todayNosebleed}
            snapshotSaved={snapshotSaved}
          />
        );
      case "sos": return <SOSReset onDone={() => navigate("home")} onBack={() => navigate("home")} />;
      case "snapshot": return <NightlySnapshot onSave={handleSnapshotSave} onBack={() => navigate("home")} />;
      case "circle": return <CareCircle onBack={() => navigate("home")} />;
      case "redzone": return <RedZone onBack={() => navigate("home")} />;
      case "dhyana": return <DhyanaRoutine mode={dhyanaMode} onDone={() => navigate("home")} onBack={() => navigate("home")} />;
      case "summary": return <SummaryReport onBack={() => navigate("home")} />;
      case "widget": return <WidgetPreview onBack={() => navigate("home")} />;
      default: return null;
    }
  };

  const showNav = ["home", "snapshot", "circle"].includes(screen);

  const navScreens = [
    { id: "home", label: "Home" },
    { id: "sos", label: "SOS Reset" },
    { id: "snapshot", label: "Log Day" },
    { id: "circle", label: "Care Circle" },
    { id: "redzone", label: "Red Zone" },
    { id: "dhyana", label: "Dhyana" },
    { id: "summary", label: "Summary" },
    { id: "widget", label: "Widget" },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-8 px-4 font-inter" style={{ background: "linear-gradient(135deg, #E2DEF2 0%, #B8B8FF22 100%)" }}>
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-[#003B64]">TapOut</h1>
        <p className="text-xs text-[#B7C4D8]">CC0015 Group T42-G3 Prototype</p>
      </div>

      <MobileShell>
        <div className="relative w-full h-full flex flex-col bg-[#E2DEF2]">
          <div className={`flex-1 overflow-y-auto ${showNav ? "pb-20" : ""}`}>
            {renderScreen()}
          </div>
          {showNav && <BottomNav active={screen} onNavigate={navigate} />}
        </div>
      </MobileShell>

      {/* Development Navigation Buttons (Below the phone) */}
      <div className="flex gap-2 flex-wrap justify-center max-w-sm mt-6">
        {navScreens.map((s) => (
          <button
            key={s.id}
            onClick={() => {
              if (s.id === "dhyana") setDhyanaMode("morning");
              navigate(s.id);
            }}
            className="px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-[#B8B8FF] text-[#4A4868] hover:bg-[#6D7BFF] hover:text-white transition-all"
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}
