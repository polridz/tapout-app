import { useState, useEffect } from "react";
import { ChevronLeft, X } from "lucide-react";

export default function SOSReset({ onDone, onBack }) {
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started || secondsLeft <= 0) return;
    const interval = setInterval(() => setSecondsLeft(s => s - 1), 1000);
    return () => clearInterval(interval);
  }, [started, secondsLeft]);

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-[#003B64] to-[#4A4868]">
      <div className="flex items-center justify-between p-4 pt-3">
        <button onClick={onBack} className="p-2 rounded-full bg-white/15"><ChevronLeft size={18} color="white" /></button>
        <button onClick={onBack} className="p-2 rounded-full bg-white/15"><X size={16} color="white" /></button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-8 px-6 text-center">
        {secondsLeft > 0 ? (
          <>
            <div className="text-6xl font-bold text-white">{secondsLeft}</div>
            {!started ? (
              <button onClick={() => setStarted(true)} className="px-10 py-4 rounded-full font-semibold bg-[#6D7BFF] text-white">Begin Box Breathing</button>
            ) : (
              <p className="text-white/70">Inhale (4s) • Hold (4s) • Exhale (4s)</p>
            )}
          </>
        ) : (
           <>
            <span className="text-5xl">🌿</span>
            <div><p className="text-2xl font-bold text-white">Reset complete.</p><p className="text-white/60 mt-2">You gave yourself 60 seconds.</p></div>
            <button onClick={onDone} className="px-10 py-4 rounded-full font-semibold bg-[#6D7BFF] text-white">Back to Home</button>
          </>
        )}
      </div>
    </div>
  );
}
