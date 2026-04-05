import { useState } from "react";
import MobileShell from "../components/tapout/MobileShell";
import HomeDashboard from "../components/tapout/HomeDashboard";
import SOSReset from "../components/tapout/SOSReset";
import NightlySnapshot from "../components/tapout/NightlySnapshot";
import CareCircle from "../components/tapout/CareCircle";
import RedZone from "../components/tapout/RedZone";
import BottomNav from "../components/tapout/BottomNav";

export default function TapOut() {
  const [screen, setScreen] = useState("home");
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
      case "home": return <HomeDashboard onTapOut={() => navigate("sos")} onRedZone={() => navigate("redzone")} onDhyana={() => navigate("snapshot")} todayStress={todayStress} todayNosebleed={todayNosebleed} snapshotSaved={snapshotSaved} />;
      case "sos": return <SOSReset onDone={() => navigate("home")} onBack={() => navigate("home")} />;
      case "snapshot": return <NightlySnapshot onSave={handleSnapshotSave} onBack={() => navigate("home")} />;
      case "circle": return <CareCircle onBack={() => navigate("home")} />;
      case "redzone": return <RedZone onBack={() => navigate("home")} />;
      default: return null;
    }
  };

  const showNav = ["home", "snapshot", "circle"].includes(screen);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-8 px-4 font-inter bg-gray-100">
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
    </div>
  );
}
