import { useEffect, useMemo, useRef, useState } from "react";

/* ============================================================================
   DeviceShowcase — realistic MacBook Pro + iPhone Pro + Apple Watch Ultra
   Pure CSS/SVG composition. PBR-style gradients, soft ambient shadows,
   live animated dashboards inside every screen.
   ========================================================================== */

/* -------------------- shared animation hooks -------------------- */
function useTicker(ms: number, steps: number) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % steps), ms);
    return () => clearInterval(id);
  }, [ms, steps]);
  return i;
}

function useCounter(target: number, key: number, duration = 1400) {
  const [v, setV] = useState(target);
  const prev = useRef(target);
  useEffect(() => {
    const from = prev.current;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setV(from + (target - from) * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
      else prev.current = target;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [key, target, duration]);
  return v;
}

const fmt = (n: number) =>
  "$" + Math.round(n).toLocaleString("en-US");

/* -------------------- MacBook screen dashboard -------------------- */
function MacScreen() {
  const step = useTicker(6000, 4);
  const balances = [2_384_120, 2_543_890, 2_612_450, 2_701_020];
  const healths = [78, 82, 85, 81];
  const ranks = ["Top 15%", "Top 13%", "Top 11%", "Top 12%"];
  const freedom = [47, 46, 45, 44];
  const balance = useCounter(balances[step], step);
  const health = useCounter(healths[step], step);
  const age = useCounter(freedom[step], step);

  const R = 26;
  const C = 2 * Math.PI * R;
  const dash = (health / 100) * C;

  const series = useMemo(
    () => [
      [10, 40, 30, 55, 42, 60, 50, 72, 65, 84, 78, 92],
      [12, 38, 34, 48, 45, 58, 55, 68, 60, 78, 82, 96],
      [14, 42, 32, 52, 48, 62, 58, 74, 70, 82, 88, 100],
      [16, 44, 36, 58, 50, 64, 62, 76, 74, 88, 92, 104],
    ],
    [],
  );
  const line = series[step]
    .map((y, i) => `${i === 0 ? "M" : "L"}${8 + i * 15},${70 - y * 0.4}`)
    .join(" ");
  const area = line + ` L188,70 L8,70 Z`;

  return (
    <svg viewBox="0 0 320 200" className="absolute inset-0 w-full h-full">
      <defs>
        <linearGradient id="mac-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0F1815" />
          <stop offset="1" stopColor="#18241F" />
        </linearGradient>
        <linearGradient id="mac-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7AF4CF" stopOpacity="0.45" />
          <stop offset="1" stopColor="#7AF4CF" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="mac-bar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2E8B57" />
          <stop offset="1" stopColor="#236B46" />
        </linearGradient>
      </defs>
      <rect width="320" height="200" fill="url(#mac-bg)" />

      {/* sidebar */}
      <rect x="0" y="0" width="52" height="200" fill="#111C18" />
      <circle cx="16" cy="16" r="4" fill="#7AF4CF" />
      <rect x="10" y="34" width="34" height="4" rx="2" fill="#2b3a33" />
      <rect x="10" y="46" width="26" height="4" rx="2" fill="#2b3a33" />
      <rect x="10" y="58" width="30" height="4" rx="2" fill="#2b3a33" />
      <rect x="10" y="70" width="22" height="4" rx="2" fill="#2b3a33" />

      {/* balance card */}
      <g transform="translate(64,14)">
        <rect width="150" height="52" rx="8" fill="#18241F" stroke="#1f2e28" />
        <text x="10" y="18" fontSize="7" fill="#95A49B" fontFamily="Geist,sans-serif">
          Total balance
        </text>
        <text x="10" y="38" fontSize="16" fontWeight="700" fill="#F5F6F2" fontFamily="Geist,sans-serif">
          {fmt(balance)}
        </text>
        <text x="10" y="48" fontSize="6" fill="#62F4C4" fontFamily="Geist,sans-serif">
          +2.4% this month
        </text>
      </g>

      {/* rank + freedom */}
      <g transform="translate(222,14)">
        <rect width="84" height="24" rx="6" fill="#18241F" stroke="#1f2e28" />
        <text x="8" y="10" fontSize="6" fill="#95A49B" fontFamily="Geist,sans-serif">Ranking</text>
        <text x="8" y="20" fontSize="10" fontWeight="600" fill="#7AF4CF" fontFamily="Geist,sans-serif">
          {ranks[step]}
        </text>
        <rect y="28" width="84" height="24" rx="6" fill="#18241F" stroke="#1f2e28" />
        <text x="8" y="38" fontSize="6" fill="#95A49B" fontFamily="Geist,sans-serif">Freedom age</text>
        <text x="8" y="48" fontSize="10" fontWeight="600" fill="#F5F6F2" fontFamily="Geist,sans-serif">
          {Math.round(age)} yrs
        </text>
      </g>

      {/* line chart */}
      <g transform="translate(60,80)">
        <rect width="200" height="80" rx="8" fill="#18241F" stroke="#1f2e28" />
        <text x="10" y="14" fontSize="6" fill="#95A49B" fontFamily="Geist,sans-serif">Cashflow</text>
        <path d={area} fill="url(#mac-area)" transform="translate(0,6)" />
        <path d={line} stroke="#7AF4CF" strokeWidth="1.5" fill="none" transform="translate(0,6)" />
      </g>

      {/* donut */}
      <g transform="translate(268,88)">
        <circle r="30" fill="#101a16" stroke="#1f2e28" />
        <circle
          r={R}
          fill="none"
          stroke="#233029"
          strokeWidth="6"
        />
        <circle
          r={R}
          fill="none"
          stroke="#7AF4CF"
          strokeWidth="6"
          strokeDasharray={`${dash} ${C}`}
          strokeLinecap="round"
          transform="rotate(-90)"
          style={{ transition: "stroke-dasharray 0.6s ease-out" }}
        />
        <text textAnchor="middle" y="3" fontSize="11" fontWeight="700" fill="#F5F6F2" fontFamily="Geist,sans-serif">
          {Math.round(health)}
        </text>
      </g>

      {/* transactions */}
      <g transform="translate(60,170)">
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${i * 68},0)`}>
            <rect width="60" height="22" rx="5" fill="#18241F" stroke="#1f2e28" />
            <rect x="6" y="6" width="4" height="10" rx="1" fill="url(#mac-bar)" />
            <rect x="16" y="6" width="30" height="3" rx="1" fill="#95A49B" opacity="0.6" />
            <rect x="16" y="12" width="20" height="3" rx="1" fill="#62F4C4" opacity="0.7" />
          </g>
        ))}
      </g>
    </svg>
  );
}

/* -------------------- iPhone screen dashboard -------------------- */
function PhoneScreen() {
  const step = useTicker(5000, 3);
  const values = [12_450, 13_120, 13_680];
  const value = useCounter(values[step], step);
  const bars = [
    [30, 55, 42, 60, 50, 72, 65],
    [34, 48, 45, 58, 55, 68, 60],
    [42, 52, 48, 62, 58, 74, 70],
  ][step];

  return (
    <svg viewBox="0 0 160 320" className="absolute inset-0 w-full h-full">
      <defs>
        <linearGradient id="ph-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0F1815" />
          <stop offset="1" stopColor="#18241F" />
        </linearGradient>
      </defs>
      <rect width="160" height="320" fill="url(#ph-bg)" />

      {/* status */}
      <text x="12" y="18" fontSize="7" fill="#D8E2DB" fontFamily="Geist,sans-serif">9:41</text>
      <circle cx="148" cy="15" r="2.5" fill="#62F4C4" />

      {/* balance card */}
      <g transform="translate(12,32)">
        <rect width="136" height="60" rx="10" fill="#18241F" stroke="#1f2e28" />
        <text x="10" y="18" fontSize="7" fill="#95A49B" fontFamily="Geist,sans-serif">Available</text>
        <text x="10" y="38" fontSize="18" fontWeight="700" fill="#F5F6F2" fontFamily="Geist,sans-serif">
          {fmt(value)}
        </text>
        <text x="10" y="52" fontSize="6" fill="#62F4C4" fontFamily="Geist,sans-serif">↑ 5.3% this week</text>
      </g>

      {/* bar chart */}
      <g transform="translate(12,104)">
        <rect width="136" height="86" rx="10" fill="#18241F" stroke="#1f2e28" />
        <text x="10" y="14" fontSize="6" fill="#95A49B" fontFamily="Geist,sans-serif">Weekly spend</text>
        {bars.map((h, i) => (
          <rect
            key={i}
            x={12 + i * 17}
            y={76 - h * 0.7}
            width="10"
            height={h * 0.7}
            rx="2"
            fill="#7AF4CF"
            opacity={0.55 + (i / bars.length) * 0.45}
            style={{ transition: "y 0.6s ease-out, height 0.6s ease-out" }}
          />
        ))}
      </g>

      {/* mini cards */}
      <g transform="translate(12,202)">
        {[
          { l: "Savings", v: "$4,120", c: "#7AF4CF" },
          { l: "Invest", v: "$8,340", c: "#62F4C4" },
        ].map((c, i) => (
          <g key={i} transform={`translate(${i * 70},0)`}>
            <rect width="64" height="46" rx="8" fill="#18241F" stroke="#1f2e28" />
            <text x="8" y="16" fontSize="6" fill="#95A49B" fontFamily="Geist,sans-serif">{c.l}</text>
            <text x="8" y="34" fontSize="12" fontWeight="700" fill={c.c} fontFamily="Geist,sans-serif">{c.v}</text>
          </g>
        ))}
      </g>

      {/* transactions */}
      <g transform="translate(12,258)">
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(0,${i * 16})`}>
            <rect width="136" height="12" rx="3" fill="#18241F" />
            <circle cx="8" cy="6" r="3" fill="#7AF4CF" opacity="0.7" />
            <rect x="16" y="4" width="60" height="2.5" rx="1" fill="#B6C2BA" opacity="0.6" />
            <rect x="16" y="8" width="34" height="2" rx="1" fill="#95A49B" opacity="0.6" />
            <text x="130" y="8" fontSize="5" textAnchor="end" fill="#62F4C4" fontFamily="Geist,sans-serif">+$42</text>
          </g>
        ))}
      </g>
    </svg>
  );
}

/* -------------------- Apple Watch screen -------------------- */
function WatchScreen() {
  const step = useTicker(4500, 4);
  const targets = [72, 78, 84, 80];
  const val = useCounter(targets[step], step);
  const R = 34;
  const C = 2 * Math.PI * R;
  const dash = (val / 100) * C;
  const bars = [[6, 10, 7, 12, 9, 14, 11], [8, 12, 9, 14, 11, 16, 13]][step % 2];

  return (
    <svg viewBox="0 0 100 120" className="absolute inset-0 w-full h-full">
      <rect width="100" height="120" fill="#0B1310" />
      <g transform="translate(50,50)">
        <circle r={R} fill="none" stroke="#1a2621" strokeWidth="6" />
        <circle
          r={R}
          fill="none"
          stroke="#7AF4CF"
          strokeWidth="6"
          strokeDasharray={`${dash} ${C}`}
          strokeLinecap="round"
          transform="rotate(-90)"
          style={{ transition: "stroke-dasharray 0.6s ease-out", filter: "drop-shadow(0 0 4px #7AF4CF)" }}
        />
        <text textAnchor="middle" y="4" fontSize="14" fontWeight="700" fill="#F5F6F2" fontFamily="Geist,sans-serif">
          {Math.round(val)}
        </text>
      </g>
      <text x="50" y="92" textAnchor="middle" fontSize="6" fill="#95A49B" fontFamily="Geist,sans-serif">Health</text>
      <g transform="translate(20,100)">
        {bars.map((h, i) => (
          <rect
            key={i}
            x={i * 9}
            y={16 - h}
            width="5"
            height={h}
            rx="1"
            fill="#7AF4CF"
            opacity="0.75"
            style={{ transition: "y 0.5s ease-out, height 0.5s ease-out" }}
          />
        ))}
      </g>
    </svg>
  );
}

/* -------------------- Device chassis -------------------- */
function MacBook() {
  return (
    <div className="relative w-[720px] max-w-full aspect-[16/10] float-slow" style={{ animationDelay: "0s" }}>
      {/* ambient shadow */}
      <div
        className="absolute -inset-8 -z-10 rounded-[40px] blur-3xl"
        style={{ background: "radial-gradient(50% 40% at 50% 60%, rgba(0,0,0,0.55), transparent 70%)" }}
      />
      {/* lid */}
      <div
        className="relative w-full h-full rounded-[18px] p-[10px]"
        style={{
          background:
            "linear-gradient(180deg,#3a4048 0%,#22262b 50%,#1a1d21 100%)",
          boxShadow:
            "0 30px 60px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(0,0,0,0.4)",
        }}
      >
        {/* bezel */}
        <div
          className="relative w-full h-full rounded-[10px] overflow-hidden"
          style={{
            background: "#000",
            boxShadow: "inset 0 0 0 1px #0a0a0b, inset 0 0 20px rgba(122,244,207,0.05)",
          }}
        >
          {/* notch */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[80px] h-[8px] rounded-b-[6px] z-10"
            style={{ background: "#000" }}
          />
          <MacScreen />
          {/* screen reflection */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(115deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 40%)",
            }}
          />
        </div>
      </div>
      {/* base */}
      <div
        className="absolute left-[-4%] right-[-4%] top-full h-[10px] rounded-b-[8px]"
        style={{
          background: "linear-gradient(180deg,#2a2e33,#16191c)",
          boxShadow: "0 6px 14px rgba(0,0,0,0.5)",
        }}
      />
      <div
        className="absolute left-[38%] right-[38%] top-[calc(100%+8px)] h-[4px] rounded-b-[4px]"
        style={{ background: "linear-gradient(180deg,#1a1d20,#0a0c0e)" }}
      />
    </div>
  );
}

function IPhone() {
  return (
    <div
      className="relative w-[180px] aspect-[9/19] float-slow"
      style={{ animationDelay: "1.2s" }}
    >
      <div
        className="absolute -inset-6 -z-10 rounded-[40px] blur-2xl"
        style={{ background: "radial-gradient(50% 50% at 50% 60%, rgba(0,0,0,0.55), transparent 70%)" }}
      />
      <div
        className="relative w-full h-full rounded-[32px] p-[6px]"
        style={{
          background:
            "linear-gradient(160deg,#4a4d52 0%,#1e2024 50%,#0f1113 100%)",
          boxShadow:
            "0 30px 55px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -1px 0 rgba(0,0,0,0.5), inset 0 0 0 1.5px #24272b",
        }}
      >
        <div className="relative w-full h-full rounded-[27px] overflow-hidden bg-black">
          {/* dynamic island */}
          <div
            className="absolute top-[8px] left-1/2 -translate-x-1/2 w-[62px] h-[18px] rounded-full z-10"
            style={{ background: "#000" }}
          />
          <PhoneScreen />
          <div
            className="absolute inset-0 pointer-events-none rounded-[27px]"
            style={{
              background:
                "linear-gradient(120deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0) 45%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

function AppleWatch() {
  return (
    <div
      className="relative w-[110px] aspect-[10/12] float-slow"
      style={{ animationDelay: "2.4s" }}
    >
      <div
        className="absolute -inset-4 -z-10 rounded-[30px] blur-2xl"
        style={{ background: "radial-gradient(50% 50% at 50% 60%, rgba(0,0,0,0.55), transparent 70%)" }}
      />
      {/* titanium band top */}
      <div
        className="absolute top-[-10px] left-1/2 -translate-x-1/2 w-[70%] h-[16px] rounded-t-[10px]"
        style={{ background: "linear-gradient(180deg,#4a4d50,#2a2c30)" }}
      />
      {/* band bottom */}
      <div
        className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-[70%] h-[16px] rounded-b-[10px]"
        style={{ background: "linear-gradient(0deg,#4a4d50,#2a2c30)" }}
      />
      <div
        className="relative w-full h-full rounded-[24px] p-[5px]"
        style={{
          background:
            "linear-gradient(150deg,#5a5d61 0%,#2b2e32 55%,#1a1c1f 100%)",
          boxShadow:
            "0 22px 40px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(0,0,0,0.5)",
        }}
      >
        <div className="relative w-full h-full rounded-[20px] overflow-hidden bg-black">
          <WatchScreen />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(125deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 45%)",
            }}
          />
        </div>
      </div>
      {/* crown */}
      <div
        className="absolute right-[-4px] top-[38%] w-[6px] h-[16px] rounded-[2px]"
        style={{ background: "linear-gradient(90deg,#6a6d70,#2a2c30)" }}
      />
    </div>
  );
}

/* -------------------- Composition -------------------- */
export function DeviceShowcase() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* ground plane soft shadow */}
      <div
        className="absolute bottom-[8%] left-1/2 -translate-x-1/2 w-[80%] h-[60px] rounded-[50%] blur-2xl -z-10"
        style={{ background: "radial-gradient(50% 50% at 50% 50%, rgba(0,0,0,0.65), transparent 70%)" }}
      />
      <div className="relative">
        <MacBook />
        {/* iPhone in front-left */}
        <div className="absolute left-[-2%] bottom-[-14%] z-20">
          <IPhone />
        </div>
        {/* Watch slightly in front of the phone */}
        <div className="absolute left-[16%] bottom-[-18%] z-30">
          <AppleWatch />
        </div>
      </div>
    </div>
  );
}

export default DeviceShowcase;
