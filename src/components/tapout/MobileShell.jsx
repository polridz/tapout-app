export default function MobileShell({ children }) {
  return (
    <div
      className="relative rounded-[3rem] overflow-hidden"
      style={{
        width: 390,
        height: 844,
        background: "#1a1a1a",
        boxShadow: "0 40px 80px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.08) inset",
      }}
    >
      <div
        className="absolute inset-[3px] rounded-[2.7rem] overflow-hidden"
        style={{ background: "#FDFBF7" }}
      >
        <div className="absolute inset-0 top-12 overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
