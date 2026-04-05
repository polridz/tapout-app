import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, Calendar, Lock } from "lucide-react";

const SYMPTOMS = [
  { id: "headache", label: "Headaches", emoji: "🤕" },
  { id: "neck", label: "Neck/shoulder pain", emoji: "😣" },
  { id: "wrist", label: "Wrist/hand pain", emoji: "🖐" },
  { id: "freeze", label: "Freeze on tasks", emoji: "❄️" },
  { id: "sunday", label: "Sunday dread", emoji: "😰" },
  { id: "sleep", label: "Insomnia", emoji: "🌙" },
  { id: "smoke", label: "Smoking more", emoji: "🚬" },
  { id: "eat", label: "Stress-eating", emoji: "🍔" },
  { id: "snap", label: "Irritability", emoji: "💢" },
  { id: "skip_meal", label: "Skipping meals", emoji: "⏱️" },
];

export default function Onboarding({ onComplete }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "", // <--- NEW NAME FIELD
    age: "25–29", industry: "Marketing/Advertising", pattern: "Regional / multiple time zones",
    symptoms: ["headache", "neck", "sunday", "freeze"], customSymptom: "",
    sos: ["Breathing / relaxation", "Moving / stretching"], audio: "Sometimes",
    movement: "Studio classes (yoga, sound baths, gym)", moveDays: 3,
    lunch: "Proper meal away from desk", lunchDays: 3,
    calendar: null
  });

  const update = (key, val) => setFormData(prev => ({ ...prev, [key]: val }));

  const toggleSymptom = (id) => {
    setFormData(prev => ({
      ...prev,
      symptoms: prev.symptoms.includes(id) 
        ? prev.symptoms.filter(s => s !== id) 
        : [...prev.symptoms, id]
    }));
  };

  const toggleSOS = (style) => {
    setFormData(prev => ({
      ...prev,
      sos: prev.sos.includes(style)
        ? prev.sos.filter(s => s !== style)
        : [...prev.sos, style]
    }));
  };

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
    else onComplete(formData); // <--- PASSING THE DATA UP
  };

  return (
    <div className="flex flex-col h-full bg-[#FDFBF7] animate-fade-in">
      {/* Header & Progress */}
      <div className="px-5 pt-6 pb-2 bg-white">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => step > 1 ? setStep(step - 1) : null} className={`p-2 rounded-full ${step === 1 ? 'opacity-0' : 'bg-[#E2DEF2]'}`}>
            <ChevronLeft size={18} color="#6D7BFF" />
          </button>
          <span className="text-xs font-bold text-[#B7C4D8]">STEP {step} OF 4</span>
          <div className="w-9" />
        </div>
        <div className="w-full h-1.5 bg-[#E2DEF2] rounded-full overflow-hidden">
          <div className="h-full bg-[#6D7BFF] transition-all duration-500" style={{ width: `${(step / 4) * 100}%` }} />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-6">
        
        {/* STEP 1: Work Context */}
        {step === 1 && (
          <div className="animate-fade-in flex flex-col gap-6">
            <div>
              <h2 className="text-2xl font-bold text-[#003B64] mb-2">Tell us about you</h2>
              <p className="text-sm text-[#4A4868]">This helps TapOut personalize your experience.</p>
            </div>

            {/* NEW NAME INPUT */}
            <section>
              <p className="text-xs font-bold uppercase text-[#B7C4D8] mb-3">Your Name</p>
              <input 
                type="text" 
                placeholder="What should we call you?" 
                value={formData.name}
                onChange={(e) => update("name", e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-[#B8B8FF] bg-white text-sm outline-none focus:border-[#6D7BFF] transition-colors"
              />
            </section>

            <section>
              <p className="text-xs font-bold uppercase text-[#B7C4D8] mb-3">Industry</p>
              <div className="flex flex-wrap gap-2">
                {["Marketing/Advertising", "Finance", "Tech", "Healthcare", "Education", "Other"].map(ind => (
                  <button key={ind} onClick={() => update("industry", ind)} className={`px-4 py-2.5 rounded-2xl text-xs font-semibold transition-all ${formData.industry === ind ? 'bg-[#6D7BFF] text-white shadow-md' : 'bg-white border border-[#B8B8FF] text-[#4A4868]'}`}>
                    {ind}
                  </button>
                ))}
              </div>
            </section>

            <section>
              <p className="text-xs font-bold uppercase text-[#B7C4D8] mb-3">Work Pattern</p>
              <div className="flex flex-col gap-2">
                {["Mostly 9–6 office hours", "Shift work", "Regional / multiple time zones", "Frequent travel"].map(pat => (
                  <button key={pat} onClick={() => update("pattern", pat)} className={`p-3.5 rounded-2xl text-left text-sm font-semibold transition-all ${formData.pattern === pat ? 'bg-[#E2DEF2] border-2 border-[#6D7BFF] text-[#003B64]' : 'bg-white border border-[#B8B8FF] text-[#4A4868]'}`}>
                    {pat}
                  </button>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* STEP 2: Symptoms */}
        {step === 2 && (
          <div className="animate-fade-in flex flex-col gap-6">
            <div>
              <h2 className="text-2xl font-bold text-[#003B64] mb-2">How does stress show up?</h2>
              <p className="text-sm text-[#4A4868]">Select your personal warning signs. We'll add these to your nightly check-in.</p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {SYMPTOMS.map(s => {
                const isActive = formData.symptoms.includes(s.id);
                return (
                  <button key={s.id} onClick={() => toggleSymptom(s.id)} className={`flex flex-col items-start gap-2 p-3 rounded-2xl border transition-all ${isActive ? 'bg-[#E2DEF2] border-[#6D7BFF]' : 'bg-white border-[#B8B8FF]'}`}>
                    <span className="text-xl">{s.emoji}</span>
                    <span className={`text-xs font-semibold text-left leading-tight ${isActive ? 'text-[#003B64]' : 'text-[#4A4868]'}`}>{s.label}</span>
                  </button>
                )
              })}
            </div>
            
            <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white border border-[#B8B8FF]">
              <input type="text" placeholder="Add custom (e.g. stomach ache)" className="flex-1 bg-transparent px-3 text-sm outline-none text-[#4A4868]" value={formData.customSymptom} onChange={e => update("customSymptom", e.target.value)} />
              <button className="w-8 h-8 rounded-xl bg-[#E2DEF2] flex items-center justify-center"><Plus size={16} color="#6D7BFF" /></button>
            </div>
          </div>
        )}

        {/* STEP 3: Preferences */}
        {step === 3 && (
          <div className="animate-fade-in flex flex-col gap-6 pb-4">
            <div>
              <h2 className="text-2xl font-bold text-[#003B64] mb-2">What helps you reset?</h2>
              <p className="text-sm text-[#4A4868]">Tailor your SOS tools and wellness goals.</p>
            </div>

            <section>
              <p className="text-xs font-bold uppercase text-[#B7C4D8] mb-3">Preferred SOS Tools</p>
              <div className="flex flex-wrap gap-2">
                {["Breathing / relaxation", "Moving / stretching", "Reframing my thoughts", "Grounding (5-4-3-2-1)", "Surprise me"].map(style => (
                  <button key={style} onClick={() => toggleSOS(style)} className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${formData.sos.includes(style) ? 'bg-[#6D7BFF] text-white' : 'bg-white border border-[#B8B8FF] text-[#4A4868]'}`}>
                    {style}
                  </button>
                ))}
              </div>
            </section>

            <section>
              <p className="text-xs font-bold uppercase text-[#B7C4D8] mb-3">Audio at work?</p>
              <div className="flex bg-[#E2DEF2] p-1 rounded-2xl">
                {["Always", "Sometimes", "Rarely"].map(aud => (
                  <button key={aud} onClick={() => update("audio", aud)} className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${formData.audio === aud ? 'bg-white text-[#6D7BFF] shadow-sm' : 'text-[#4A4868]'}`}>
                    {aud}
                  </button>
                ))}
              </div>
            </section>

            <section>
              <p className="text-xs font-bold uppercase text-[#B7C4D8] mb-3">Lunch Goal</p>
              <div className="p-4 rounded-2xl bg-white border border-[#B8B8FF] flex flex-col gap-4">
                {["Proper meal away from desk", "Quick meal but away", "Often eat at desk"].map(l => (
                  <button key={l} onClick={() => update("lunch", l)} className="flex items-center gap-3 text-left">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${formData.lunch === l ? 'border-[#6D7BFF]' : 'border-[#B8B8FF]'}`}>
                      {formData.lunch === l && <div className="w-2 h-2 rounded-full bg-[#6D7BFF]" />}
                    </div>
                    <span className="text-sm font-medium text-[#4A4868]">{l}</span>
                  </button>
                ))}
                <div className="h-[1px] w-full bg-[#E2DEF2]" />
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#003B64]">Target days/week</span>
                  <div className="flex items-center gap-3 bg-[#E2DEF2] rounded-full px-1 py-1">
                    <button onClick={() => update("lunchDays", Math.max(1, formData.lunchDays - 1))} className="w-7 h-7 bg-white rounded-full flex items-center justify-center text-[#6D7BFF] font-bold">-</button>
                    <span className="text-sm font-bold text-[#003B64] w-2 text-center">{formData.lunchDays}</span>
                    <button onClick={() => update("lunchDays", Math.min(5, formData.lunchDays + 1))} className="w-7 h-7 bg-white rounded-full flex items-center justify-center text-[#6D7BFF] font-bold">+</button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* STEP 4: Calendar Connection */}
        {step === 4 && (
          <div className="animate-fade-in flex flex-col gap-6">
            <div className="w-16 h-16 rounded-full bg-[#E2DEF2] flex items-center justify-center mb-2">
              <Calendar size={32} color="#6D7BFF" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#003B64] mb-2">Connect your calendar</h2>
              <p className="text-sm text-[#4A4868] leading-relaxed">
                TapOut spots long days, back-to-back meetings, and overtime to suggest realistic micro-breaks and hangouts.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#B8B8FF] flex flex-col gap-3">
              <button onClick={() => update("calendar", "busy")} className={`p-3 rounded-xl border-2 text-left transition-all ${formData.calendar === "busy" ? 'border-[#6D7BFF] bg-[#E2DEF2]' : 'border-transparent bg-[#FDFBF7]'}`}>
                <p className="text-sm font-bold text-[#003B64]">Busy / Free only</p>
                <p className="text-xs text-[#4A4868] mt-1">We only see time blocks, no titles.</p>
              </button>
              <button onClick={() => update("calendar", "full")} className={`p-3 rounded-xl border-2 text-left transition-all ${formData.calendar === "full" ? 'border-[#6D7BFF] bg-[#E2DEF2]' : 'border-transparent bg-[#FDFBF7]'}`}>
                <p className="text-sm font-bold text-[#003B64]">Allow titles & locations</p>
                <p className="text-xs text-[#4A4868] mt-1">Better insights (e.g. identifying high-stress regional calls).</p>
              </button>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#E8F5E8] border border-[#5CB85C]/30 mt-2">
              <Lock size={16} color="#2E7D32" className="mt-0.5 flex-shrink-0" />
              <p className="text-[11px] leading-relaxed text-[#2E7D32]">
                <strong>Your data is encrypted.</strong> It is never shared with employers or advertisers. TapOut only reads events; it cannot edit or invite.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer Button */}
      <div className="p-6 bg-white border-t border-[#E2DEF2]">
        <button 
          onClick={nextStep}
          className="w-full py-4 rounded-full font-bold text-white bg-[#6D7BFF] shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2"
        >
          {step === 4 ? "Finish Setup" : "Continue"}
          {step < 4 && <ChevronRight size={18} />}
        </button>
        {step === 4 && (
          <button onClick={() => onComplete({ name: formData.name })} className="w-full text-center text-xs font-semibold text-[#B7C4D8] mt-4">
            Skip for now
          </button>
        )}
      </div>
    </div>
  );
}
