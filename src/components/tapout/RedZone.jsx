import { useState } from "react";
import { ChevronLeft, FileText, HelpCircle, Users, ExternalLink } from "lucide-react";

export default function RedZone({ onBack }) {
  const [reflection, setReflection] = useState(null);
  const [reportGenerated, setReportGenerated] = useState(false);
  const [contactSent, setContactSent] = useState(false);

  return (
    <div className="flex flex-col h-full bg-[#E2DEF2]">
      <div className="flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-[#CC0000] to-[#E8343A]">
        <button onClick={onBack} className="p-2 rounded-full bg-white/15"><ChevronLeft size={16} color="white" /></button>
        <div className="flex-1">
          <p className="text-[10px] text-white/70 font-medium uppercase tracking-widest">Red Zone Alert</p>
          <h2 className="text-sm font-bold text-white leading-tight">Your health markers are in the Red Zone.</h2>
        </div>
        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/15"><span className="text-xl">🔴</span></div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-5 pb-8">
        {/* Structural Note */}
        <div className="rounded-3xl p-4 bg-[#FFEDED] border-2 border-[#FF8080]">
          <p className="text-[11px] leading-relaxed text-[#CC0000]">
            <span className="font-bold block mb-1">⚠️ Important context</span>
            This data suggests <strong>organisational pressure</strong>, not personal weakness. Your body is responding to a structural problem. <strong>Your health is the priority.</strong>
          </p>
        </div>

        {/* Actions */}
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-[#4A4868] mb-3">What would you like to do?</p>
          <div className="flex flex-col gap-3">
            
            {/* Generate Report */}
            <button onClick={() => setReportGenerated(true)} className={`flex items-center gap-4 p-4 rounded-3xl text-left transition-all ${reportGenerated ? 'bg-[#E8F5E8] border-2 border-[#5CB85C]' : 'bg-white shadow-sm border border-transparent'}`}>
              <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${reportGenerated ? 'bg-[#5CB85C]' : 'bg-[#E2DEF2]'}`}>
                <FileText size={18} color={reportGenerated ? "white" : "#6D7BFF"} />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">{reportGenerated ? "Summary Ready ✓" : "Prepare Data Summary"}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{reportGenerated ? "Red days & symptoms exported." : "Generate report for therapist or manager"}</p>
              </div>
            </button>

            {/* Reflection */}
            <div className="p-4 rounded-3xl bg-white shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center bg-[#FFF3CC]"><HelpCircle size={18} color="#F5A623" /></div>
                <div><p className="text-sm font-semibold text-gray-800">Is this role sustainable?</p><p className="text-[10px] text-gray-400 mt-0.5">Given what you see, does staying feel sustainable for 1–2 years?</p></div>
              </div>
              {!reflection ? (
                <div className="flex gap-2 mt-3">
                  {["Yes", "Unsure", "No"].map(r => (
                    <button key={r} onClick={() => setReflection(r)} className={`flex-1 py-2.5 rounded-2xl text-xs font-semibold ${r === "Yes" ? "bg-[#E8F5E8] text-[#2E7D32]" : r === "Unsure" ? "bg-[#FFF3CC] text-[#B07A00]" : "bg-[#FFEDED] text-[#E8343A]"}`}>{r}</button>
                  ))}
                </div>
              ) : (
                <div className="mt-3 p-3 rounded-2xl bg-[#F7F6F1] animate-fade-in">
                  {reflection === "Yes" ? <p className="text-[11px] text-gray-600">Glad to hear it. Keep protecting your energy.</p> : 
                   <><p className="text-[11px] text-gray-600 mb-2">Consider:</p><ul className="text-[11px] text-gray-600 list-disc pl-4 space-y-1"><li>Discussing with your therapist</li><li>Exploring other teams</li><li>Planning a strict boundary change</li></ul></>}
                </div>
              )}
            </div>

            {/* Care Circle */}
            <button onClick={() => setContactSent(true)} className={`flex items-center gap-4 p-4 rounded-3xl text-left transition-all ${contactSent ? 'bg-[#E2DEF2] border-2 border-[#6D7BFF]' : 'bg-white shadow-sm border border-transparent'}`}>
              <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${contactSent ? 'bg-[#6D7BFF]' : 'bg-[#E2DEF2]'}`}>
                <Users size={18} color={contactSent ? "white" : "#6D7BFF"} />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">{contactSent ? "Message sent ✓" : "Contact Care Circle"}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{contactSent ? "Trusted contacts notified." : "Let a trusted person know you're not okay"}</p>
              </div>
            </button>
          </div>
        </div>

        {/* Resources */}
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-[#4A4868] mb-3">Support Resources</p>
          <div className="flex flex-col gap-2">
            {[
              { label: "Samaritans of Singapore (SOS)", sub: "1-767 · 24/7 crisis line" },
              { label: "MindLine Singapore", sub: "Free mental health app" }
            ].map(({ label, sub }) => (
              <div key={label} className="flex items-center gap-3 p-3.5 rounded-2xl bg-white shadow-sm">
                <div className="flex-1"><p className="text-[11px] font-semibold text-gray-800">{label}</p><p className="text-[10px] text-gray-400 mt-0.5">{sub}</p></div>
                <ExternalLink size={13} className="text-gray-300" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
