import { useState } from "react";
import MobileShell from "../components/tapout/MobileShell";
import Onboarding from "../components/tapout/Onboarding";
import HomeDashboard from "../components/tapout/HomeDashboard";
import SOSReset from "../components/tapout/SOSReset";
import NightlySnapshot from "../components/tapout/NightlySnapshot";
import CareCircle from "../components/tapout/CareCircle";
import RedZone from "../components/tapout/RedZone";
import DhyanaRoutine from "../components/tapout/DhyanaRoutine";
import SummaryReport from "../components/tapout/SummaryReport";
import WidgetPreview from "../components/tapout/WidgetPreview";
import Journal from "../components/tapout/Journal";
import BottomNav from "../components/tapout/BottomNav";

export default function TapOut() {
  const [screen, setScreen] = useState("onboarding");
  const [userName, setUserName] = useState(""); 
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
      case "onboarding": 
        return <Onboarding onComplete={(data) => {
          if (data?.name) setUserName(data.name);
          navigate("home");
        }} />;
      case "home":
        return (
          <HomeDashboard
            userName={userName}
            onTapOut={() => navigate("sos")}
            onRedZone={() => navigate("redzone")}
            onDhyana={(mode) => { setDhyanaMode(mode); navigate("dhyana"); }}
            onLogDay={() => navigate("snapshot")} 
            onSummary={() => navigate("summary")}
            onJournal={() => navigate("journal")}
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
      case "journal": return <Journal onBack={() => navigate("home")} />;
      default: return null;
    }
  };

  // Ensure the bottom navigation shows up on the Journal page as well
  const showNav = ["home", "snapshot", "journal", "circle"].includes(screen);

  const navScreens = [
    { id: "onboarding", label: "Start Onboarding" },
    { id: "home", label: "Home" },
    { id: "sos", label: "SOS Reset" },
    { id: "snapshot", label: "Log Day" },
    { id: "journal", label: "Journal" },
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

      {/* FIXED NAVIGATION BUTTONS (Stays purple when active) */}
      <div className="flex gap-2 flex-wrap justify-center max-w-lg mt-6">
        {navScreens.map((s) => {
          const isActive = screen === s.id;
          return (
            <button
              key={s.id}
              onClick={() => {
                if (s.id === "dhyana") setDhyanaMode("morning");
                navigate(s.id);
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                isActive 
                  ? "bg-[#6D7BFF] text-white border-[#6D7BFF] shadow-md" 
                  : "bg-white border-[#B8B8FF] text-[#4A4868] hover:bg-[#E2DEF2]"
              }`}
            >
              {s.label}
            </button>
          )
        })}
      </div>
    </div>
  );
}
