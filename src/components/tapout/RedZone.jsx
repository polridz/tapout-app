import { useState } from "react";
import { ChevronLeft, FileText, HelpCircle, Users, ExternalLink } from "lucide-react";

const weekPattern = [
  { day: "Mon", stress: 8 },
  { day: "Tue", stress: 9 },
  { day: "Wed", stress: 7 },
  { day: "Thu", stress: 9 },
  { day: "Fri", stress: 8 },
];

export default function RedZone({ onBack }) {
  const [reflection, setReflection] = useState(null);
  const [reportGenerated, setReportGenerated] = useState(false);
  const [contactSent, setContactSent] = useState(false);

  return (
    <div className="flex flex-col h-full" style={{ background: "#E2DEF2" }}>
      {/* Alert Header */}
      <div
        className="flex items-center gap-3 px-5 py-4"
        style={{ background: "linear-gradient(135deg, #CC0000, #E8343A)" }}
      >
        <button onClick={onBack} className="p-2 rounded-full" style={{ background: "rgba(255,255,255,0.15)" }}>
          <ChevronLeft size={16} strokeWidth={2} className="text-white" />
        </button>
        <div className="flex-1">
          <p className="text-[10px] text-white/70 font-medium uppercase tracking-widest">Important Context</p>
          <h2 className="text-sm font-bold text-white leading-tight">Your health markers are in the Red Zone.</h2>
        </div>
        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.15)" }}>
          <span className="text-xl">🔴</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-5 pb-8">

        {/* Structural awareness note */}
        <div
          className="rounded-3xl p-4"
          style={{ background: "#FFEDED", border: "1.5px solid #FF8080" }}
        >
          <p className="text-[11px] leading-relaxed" style={{ color: "#CC0000" }}>
            <span className="font-bold block mb-1">⚠️ Important context</span>
            This data suggests <strong>organisational pressure</strong>, not personal weakness. Your body is responding to a structural problem. <strong>Your health is the priority.</strong>
          </p>
        </div>

        {/* Pattern summary */}
        <div
          className="rounded-3xl p-4"
          style={{ background: "white", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
        >
          <p className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: "#4A4868" }}>This Week's Pattern</p>
          <div className="flex gap-1.5 mb-3">
            {weekPattern.map((d) => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-1.5">
                <div
                  className="w-full rounded-xl"
                  style={{ height: 40 + (d.stress / 10) * 16, background: "#E8343A", opacity: 0.7 + (d.stress / 10) * 0.3 }}
                />
                <span className="text-[9px] text-gray-400">{d.day}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-1.5">
            {[
              { label: "Stress 7-9/10 for 5 days", icon: "📈" },
              { label: "Nosebleed logged on Tuesday", icon: "🩸" },
              { label: "No movement this week", icon: "🏃" },
              { label: "3 late nights past cut-off", icon: "🌙" },
              { label: "Skipped lunch 4/5 days", icon: "🍱" },
            ].map(({ label, icon }) => (
              <div key={label} className="flex items-center gap-2.5">
                <span className="text-sm">{icon}</span>
                <p className="text-[11px] text-gray-600">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div>
          <p className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: "#4A4868" }}>What would you like to do?</p>
          <div className="flex flex-col gap-3">

            {/* Prepare Summary */}
            <button
              onClick={() => setReportGenerated(true)}
              className="flex items-center gap-4 p-4 rounded-3xl text-left transition-all active:scale-98"
              style={reportGenerated
                ? { background: "#E8F5E8", border: "1.5px solid #5CB85C" }
                : { background: "white", boxShadow: "0 2px 12px rgba(74,72,104,0.08)" }
              }
            >
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: reportGenerated ? "#5CB85C" : "#E2DEF2" }}>
                <FileText size={18} strokeWidth={1.5} style={{ color: reportGenerated ? "white" : "#6D7BFF" }} />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  {reportGenerated ? "Summary Ready ✓" : "Prepare Data Summary"}
                </p>
                <p className="text-[10px] text-gray-400 leading-tight mt-0.5">
                  {reportGenerated ? "Red days, OT, symptoms exported for your therapist." : "Generate report for therapist or manager"}
                </p>
              </div>
            </button>

            {/* Reflection */}
            <div
              className="p-4 rounded-3xl"
              style={{ background: "white", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
            >
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: "#FFF3CC" }}>
                  <HelpCircle size={18} strokeWidth={1.5} style={{ color: "#F5A623" }} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-800">Is this role sustainable?</p>
                  <p className="text-[10px] text-gray-400 mt-0.5 leading-tight">Given what you see, does staying feel sustainable for 1–2 years?</p>
                </div>
              </div>
              {!reflection ? (
                <div className="flex gap-2 mt-3">
                  {["Yes", "Unsure", "No"].map((r) => (
                    <button
                      key={r}
                      onClick={() => setReflection(r)}
                      className="flex-1 py-2.5 rounded-2xl text-xs font-semibold transition-all"
                      style={{
                      background: r === "Yes" ? "#E8F5E8" : r === "Unsure" ? "#FFF3CC" : "#FFEDED",
                      color: r === "Yes" ? "#2E7D32" : r === "Unsure" ? "#B07A00" : "#E8343A",
                      }}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="mt-3 p-3 rounded-2xl animate-fade-in" style={{ background: "#F7F6F1" }}>
                  {reflection === "Yes" ? (
                    <p className="text-[11px] text-gray-600 leading-relaxed">Glad to hear it. Keep protecting your energy with the tools you have.</p>
                  ) : (
                    <>
                      <p className="text-[11px] text-gray-600 leading-relaxed mb-2">That's important insight. Consider:</p>
                      {["Discussing options with your therapist", "Exploring other teams or companies", "Planning one concrete boundary change this week"].map((s) => (
                        <div key={s} className="flex items-start gap-2 mb-1">
                          <div className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ background: "#6D7BFF" }} />
                          <p className="text-[11px] text-gray-600">{s}</p>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Contact Care Circle */}
            <button
              onClick={() => setContactSent(true)}
              className="flex items-center gap-4 p-4 rounded-3xl text-left transition-all active:scale-98"
              style={contactSent
                ? { background: "#E2DEF2", border: "1.5px solid #6D7BFF" }
                : { background: "white", boxShadow: "0 2px 12px rgba(74,72,104,0.08)" }
              }
            >
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: contactSent ? "#6D7BFF" : "#E2DEF2" }}>
                <Users size={18} strokeWidth={1.5} style={{ color: contactSent ? "white" : "#6D7BFF" }} />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  {contactSent ? "Message sent ✓" : "Contact Care Circle"}
                </p>
                <p className="text-[10px] text-gray-400 mt-0.5 leading-tight">
                  {contactSent ? "Your trusted contacts have been notified." : "Let a trusted person know you're not okay"}
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* VERIFIED SUPPORT RESOURCES */}
        <div>
          <p className="text-xs font-bold uppercase tracking-wide mb-3 mt-2" style={{ color: "#4A4868" }}>Support Resources</p>
          <div className="flex flex-col gap-2">
            {[
              { label: "Samaritans of Singapore (SOS)", sub: "Call 1-767 · 24/7 Crisis Helpline", url: "https://www.sos.org.sg/" },
              { label: "IMH Mental Health Helpline", sub: "Call 6389 2222 · 24/7 Emergency Support", url: "https://www.imh.com.sg/" },
              { label: "Mindline.sg", sub: "MOH-supported digital coping tools", url: "https://www.mindline.sg/" },
              { label: "Employee Assistance Programme (EAP)", sub: "Free counseling via your HR portal", url: "#" },
            ].map(({ label, sub, url }) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3.5 rounded-2xl cursor-pointer hover:bg-gray-50 transition-colors"
                style={{ background: "white", boxShadow: "0 1px 8px rgba(0,0,0,0.04)" }}
              >
                <div className="flex-1">
                  <p className="text-[11px] font-semibold text-gray-800">{label}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{sub}</p>
                </div>
                <ExternalLink size={13} strokeWidth={1.5} className="text-gray-300" />
              </a>
            ))}
          </div>
        </div>

        <div className="h-4" />
      </div>
    </div>
  );
}
// END OF FILE
