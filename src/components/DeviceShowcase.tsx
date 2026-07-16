import { useEffect, useState } from "react";

/**
 * Fully animated hero composition.
 * Vector-only devices (MacBook, iPhone, Apple Watch) with live dashboards,
 * connection particles, floating status cards and ambient glow.
 * GPU accelerated via CSS transforms. No raster screenshots.
 */

function useTicker(intervalMs: number, steps: number) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % steps), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs, steps]);
  return i;
}

function useCounter(target: number, key: number, duration = 1200) {
  const [v, setV] = useState(target);
  useEffect(() => {
    const from = v;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setV(from + (target - from) * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  return v;
}

/* -------------------- Laptop dashboard (SVG) -------------------- */
function LaptopScreen() {
  const step = useTicker(3200, 4);
  const healthTargets = [78, 82, 85, 81];
  const balanceTargets = [2_384_120, 2_543_890, 2_612_450, 2_701_020];
  const rankTargets = ["Top 15%", "Top 13%", "Top 11%", "Top 12%"];
  const health = useCounter(healthTargets[step], step);
  const balance = useCounter(balanceTargets[step], step);

  // donut ring
  const R = 22;
  const C = 2 * Math.PI * R;
  const dash = (health / 100) * C;

  // line chart points (income)
  const seriesA = [
    [10, 40, 30, 55, 42, 60, 50, 72, 65, 84, 78, 92],
    [12, 38, 34, 48, 45, 58, 55, 68, 60, 78, 82, 96],
    [14, 42, 32, 52, 48, 62, 58, 74, 70, 82, 88, 100],
    [16, 44, 36, 58, 50, 64, 62, 76, 74, 88, 92, 104],
  ][step];
  const linePath = seriesA
    .map((y, i) => `${i === 0 ? "M" : "L"}${8 + i * 14},${60 - y * 0.35}`)
    .join(" ");

  // bars
  const bars = [
    [28, 44, 36, 58, 40, 62],
    [32, 40, 42, 54, 46, 66],
    [30, 48, 38, 60, 44, 70],
    [34, 46, 44, 56, 48, 68],
  ][step];

  // donut segments (spending)
  const segs = [
    [26, 17, 16, 12, 29],
    [28, 19, 14, 13, 26],
    [24, 18, 18, 12, 28],
    [27, 20, 15, 11, 27],
  ][step];

  // transactions
  const txPool = [
    { name: "Starbucks", amt: "-3 450 ₸", pos: true },
    { name: "Magnum Supermarket", amt: "-7 560 ₸", pos: true },
    { name: "Kaspi Transfer", amt: "-20 000 ₸", pos: true },
    { name: "Salary", amt: "+250 000 ₸", pos: false },
    { name: "Yandex Taxi", amt: "-1 890 ₸", pos: true },
    { name: "Apple Music", amt: "-990 ₸", pos: true },
  ];
  const tx = [txPool[step % 6], txPool[(step + 1) % 6], txPool[(step + 2) % 6], txPool[(step + 3) % 6]];

  return (
    <svg viewBox="0 0 520 320" className="absolute inset-0 w-full h-full">
      {/* bg */}
      <rect width="520" height="320" rx="8" fill="#0d1614" />
      <rect width="520" height="320" rx="8" fill="url(#lg-vign)" />
      <defs>
        <radialGradient id="lg-vign" cx="50%" cy="0%" r="80%">
          <stop offset="0%" stopColor="#1a2b28" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#0d1614" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="mint" x1="0" x2="1">
          <stop offset="0" stopColor="#7AF4CF" />
          <stop offset="1" stopColor="#5FD9B4" />
        </linearGradient>
        <linearGradient id="peri" x1="0" x2="1">
          <stop offset="0" stopColor="#9B8CFF" />
          <stop offset="1" stopColor="#7D93FF" />
        </linearGradient>
        <linearGradient id="rose" x1="0" x2="1">
          <stop offset="0" stopColor="#ff8b8b" />
          <stop offset="1" stopColor="#ff5c8a" />
        </linearGradient>
      </defs>

      {/* sidebar */}
      <rect x="0" y="0" width="86" height="320" fill="#0a1211" />
      <text x="14" y="26" fill="#7AF4CF" fontFamily="Geist,sans-serif" fontSize="12" fontWeight="700">Aim</text>
      {["Overview", "Accounts", "Transactions", "Analytics", "Goals", "AI Assistant", "Settings"].map(
        (l, i) => (
          <g key={l}>
            {i === 0 && <rect x="8" y={44 + i * 24 - 10} width="70" height="18" rx="4" fill="rgba(122,244,207,0.10)" />}
            <text x="16" y={44 + i * 24} fill={i === 0 ? "#F5F6F2" : "#7D8C83"} fontFamily="Geist,sans-serif" fontSize="8.5">
              {l}
            </text>
          </g>
        )
      )}

      {/* Top-row cards */}
      {/* Financial Health */}
      <g transform="translate(100,14)">
        <rect width="130" height="96" rx="8" fill="#111c1a" stroke="rgba(255,255,255,0.05)" />
        <text x="10" y="16" fill="#93A298" fontSize="7.5" fontFamily="Geist,sans-serif">Financial Health</text>
        <g transform="translate(65,58)">
          <circle r={R} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="4" />
          <circle
            r={R}
            fill="none"
            stroke="url(#mint)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={`${dash} ${C}`}
            transform="rotate(-90)"
            style={{ transition: "stroke-dasharray 1s ease" }}
          />
          <text textAnchor="middle" y="2" fill="#F5F6F2" fontSize="14" fontWeight="700" fontFamily="Geist">
            {Math.round(health)}
          </text>
          <text textAnchor="middle" y="11" fill="#93A298" fontSize="6">/100</text>
        </g>
        <text x="10" y="88" fill="#62F4C4" fontSize="6.5" fontFamily="Geist">+3 this month</text>
      </g>

      {/* Your Ranking */}
      <g transform="translate(240,14)">
        <rect width="130" height="96" rx="8" fill="#111c1a" stroke="rgba(255,255,255,0.05)" />
        <text x="10" y="16" fill="#93A298" fontSize="7.5" fontFamily="Geist">Your Ranking</text>
        <text x="10" y="36" fill="#F5F6F2" fontSize="16" fontWeight="700" fontFamily="Geist">{rankTargets[step]}</text>
        <path d={linePath} fill="none" stroke="url(#peri)" strokeWidth="1.6" style={{ transition: "d 1s ease" }} />
      </g>

      {/* Freedom Age */}
      <g transform="translate(380,14)">
        <rect width="126" height="96" rx="8" fill="#111c1a" stroke="rgba(255,255,255,0.05)" />
        <text x="10" y="16" fill="#93A298" fontSize="7.5" fontFamily="Geist">Freedom Age</text>
        <text x="10" y="36" fill="#F5F6F2" fontSize="16" fontWeight="700" fontFamily="Geist">{50 + (step % 3)} yrs</text>
        {/* mountains */}
        <path d="M10,84 L34,54 L52,72 L72,44 L96,74 L116,58 L116,84 Z" fill="url(#peri)" opacity="0.85" />
        <text x="10" y="94" fill="#93A298" fontSize="6">+2 yrs in 6 mo</text>
      </g>

      {/* Balance & Expenses */}
      <g transform="translate(100,120)">
        <rect width="200" height="80" rx="8" fill="#111c1a" stroke="rgba(255,255,255,0.05)" />
        <text x="10" y="16" fill="#93A298" fontSize="7.5">Total balance</text>
        <text x="10" y="34" fill="#F5F6F2" fontSize="13" fontWeight="700" fontFamily="Geist">
          {Math.round(balance).toLocaleString("ru-RU")} ₸
        </text>
        <text x="10" y="46" fill="#62F4C4" fontSize="6.5">+12.6% vs last month</text>
        <polyline
          points={seriesA.map((y, i) => `${10 + i * 16},${72 - y * 0.22}`).join(" ")}
          fill="none"
          stroke="#62F4C4"
          strokeWidth="1.4"
        />
      </g>
      <g transform="translate(306,120)">
        <rect width="200" height="80" rx="8" fill="#111c1a" stroke="rgba(255,255,255,0.05)" />
        <text x="10" y="16" fill="#93A298" fontSize="7.5">Expenses</text>
        <text x="10" y="34" fill="#F5F6F2" fontSize="13" fontWeight="700" fontFamily="Geist">
          1 {(825 + step * 12).toString().padStart(3, "0")} 430 ₸
        </text>
        <text x="10" y="46" fill="#FF6B6B" fontSize="6.5">+8.3% vs last month</text>
        <polyline
          points={seriesA
            .map((y, i) => `${10 + i * 16},${72 - (100 - y) * 0.22}`)
            .join(" ")}
          fill="none"
          stroke="#FF6B6B"
          strokeWidth="1.4"
        />
      </g>

      {/* Income vs Expenses bars */}
      <g transform="translate(100,210)">
        <rect width="130" height="96" rx="8" fill="#111c1a" stroke="rgba(255,255,255,0.05)" />
        <text x="10" y="14" fill="#93A298" fontSize="7">Income vs Expenses</text>
        {bars.map((h, i) => (
          <g key={i}>
            <rect
              x={14 + i * 18}
              y={82 - h}
              width="6"
              height={h}
              rx="1.5"
              fill="url(#mint)"
              style={{ transition: "y 1s ease, height 1s ease" }}
            />
            <rect
              x={22 + i * 18}
              y={82 - (h * 0.7)}
              width="6"
              height={h * 0.7}
              rx="1.5"
              fill="url(#peri)"
              style={{ transition: "y 1s ease, height 1s ease" }}
            />
          </g>
        ))}
        {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((m, i) => (
          <text key={m} x={14 + i * 18} y="92" fill="#7D8C83" fontSize="4.5">{m}</text>
        ))}
      </g>

      {/* Donut spending */}
      <g transform="translate(240,210)">
        <rect width="130" height="96" rx="8" fill="#111c1a" stroke="rgba(255,255,255,0.05)" />
        <text x="10" y="14" fill="#93A298" fontSize="7">Spending by category</text>
        <g transform="translate(40,54)">
          {(() => {
            const colors = ["#62F4C4", "#9B8CFF", "#7D93FF", "#FF6B6B", "#5FD9B4"];
            const total = segs.reduce((a, b) => a + b, 0);
            let acc = 0;
            const r = 18;
            const cc = 2 * Math.PI * r;
            return segs.map((s, i) => {
              const len = (s / total) * cc;
              const off = -acc;
              acc += len;
              return (
                <circle
                  key={i}
                  r={r}
                  fill="none"
                  stroke={colors[i]}
                  strokeWidth="7"
                  strokeDasharray={`${len} ${cc}`}
                  strokeDashoffset={off}
                  transform="rotate(-90)"
                  style={{ transition: "stroke-dasharray 1s ease, stroke-dashoffset 1s ease" }}
                />
              );
            });
          })()}
        </g>
        {["Housing 26%", "Transport 17%", "Food 16%", "Entertain 12%", "Other 29%"].map((l, i) => (
          <g key={l} transform={`translate(72, ${20 + i * 12})`}>
            <circle r="2" fill={["#62F4C4", "#9B8CFF", "#7D93FF", "#FF6B6B", "#5FD9B4"][i]} />
            <text x="6" y="2.5" fill="#B6C2BA" fontSize="5.5">{l}</text>
          </g>
        ))}
      </g>

      {/* Recent transactions */}
      <g transform="translate(376,210)">
        <rect width="130" height="96" rx="8" fill="#111c1a" stroke="rgba(255,255,255,0.05)" />
        <text x="10" y="14" fill="#93A298" fontSize="7">Recent transactions</text>
        {tx.map((t, i) => (
          <g key={i} transform={`translate(10, ${28 + i * 16})`} style={{ opacity: 0, animation: `tx-in .6s ease ${i * 0.1}s forwards` }}>
            <circle r="4" cx="4" cy="0" fill={t.pos ? "rgba(255,107,107,0.18)" : "rgba(98,244,196,0.18)"} />
            <text x="12" y="2" fill="#F5F6F2" fontSize="6">{t.name}</text>
            <text x="120" y="2" textAnchor="end" fill={t.pos ? "#FF6B6B" : "#62F4C4"} fontSize="6">{t.amt}</text>
          </g>
        ))}
      </g>

      <style>{`
        @keyframes tx-in { from { opacity:0; transform: translateY(4px);} to { opacity:1; transform:none;} }
      `}</style>
    </svg>
  );
}

/* -------------------- Phone screen -------------------- */
function PhoneScreen() {
  const step = useTicker(3600, 4);
  const healthTargets = [78, 82, 85, 81];
  const health = useCounter(healthTargets[step], step);
  const R = 18;
  const C = 2 * Math.PI * R;
  const dash = (health / 100) * C;

  const rank = ["Top 15%", "Top 13%", "Top 11%", "Top 12%"][step];
  const rankLine = [
    [8, 22, 16, 28, 20, 32, 26, 38],
    [10, 20, 18, 26, 22, 34, 28, 42],
    [12, 24, 20, 30, 24, 36, 32, 44],
    [14, 22, 22, 28, 26, 38, 34, 46],
  ][step];
  return (
    <svg viewBox="0 0 160 320" className="absolute inset-0 w-full h-full">
      <defs>
        <linearGradient id="pmint" x1="0" x2="1">
          <stop offset="0" stopColor="#7AF4CF" /><stop offset="1" stopColor="#5FD9B4" />
        </linearGradient>
        <linearGradient id="pperi" x1="0" x2="1">
          <stop offset="0" stopColor="#9B8CFF" /><stop offset="1" stopColor="#7D93FF" />
        </linearGradient>
      </defs>
      <rect width="160" height="320" rx="18" fill="#0a1211" />
      {/* status */}
      <text x="12" y="16" fill="#F5F6F2" fontSize="7.5" fontWeight="600" fontFamily="Geist">9:41</text>
      <text x="148" y="16" textAnchor="end" fill="#93A298" fontSize="6" fontFamily="Geist">••• 5G</text>
      {/* logo */}
      <text x="12" y="34" fill="#62F4C4" fontSize="11" fontWeight="700" fontFamily="Geist">Aim</text>
      <text x="12" y="46" fill="#93A298" fontSize="6">Overview</text>

      {/* Health card */}
      <g transform="translate(10,54)">
        <rect width="140" height="76" rx="10" fill="#111c1a" stroke="rgba(255,255,255,0.05)" />
        <text x="10" y="14" fill="#93A298" fontSize="6.5">Financial Health</text>
        <g transform="translate(36,44)">
          <circle r={R} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3.5" />
          <circle
            r={R}
            fill="none"
            stroke="url(#pmint)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray={`${dash} ${C}`}
            transform="rotate(-90)"
            style={{ transition: "stroke-dasharray 1s ease" }}
          />
          <text textAnchor="middle" y="2" fill="#F5F6F2" fontSize="11" fontWeight="700">{Math.round(health)}</text>
          <text textAnchor="middle" y="10" fill="#93A298" fontSize="5">/100</text>
        </g>
        <text x="70" y="42" fill="#F5F6F2" fontSize="6.5">+3 this month</text>
      </g>

      {/* Ranking card */}
      <g transform="translate(10,138)">
        <rect width="140" height="70" rx="10" fill="#111c1a" stroke="rgba(255,255,255,0.05)" />
        <text x="10" y="14" fill="#93A298" fontSize="6.5">Your Ranking</text>
        <text x="10" y="30" fill="#F5F6F2" fontSize="12" fontWeight="700">{rank}</text>
        <polyline
          points={rankLine.map((y, i) => `${10 + i * 17},${62 - y * 0.6}`).join(" ")}
          fill="none"
          stroke="url(#pperi)"
          strokeWidth="1.4"
          style={{ transition: "points 1s ease" }}
        />
      </g>

      {/* Freedom age card */}
      <g transform="translate(10,216)">
        <rect width="140" height="70" rx="10" fill="#111c1a" stroke="rgba(255,255,255,0.05)" />
        <text x="10" y="14" fill="#93A298" fontSize="6.5">Freedom Age</text>
        <text x="10" y="30" fill="#F5F6F2" fontSize="12" fontWeight="700">{50 + (step % 3)} yrs</text>
        <path d="M10,60 L34,38 L48,52 L66,30 L86,52 L104,42 L128,58 L128,64 L10,64 Z" fill="url(#pperi)" opacity="0.85" />
      </g>

      {/* tab bar */}
      <g transform="translate(0,294)">
        <rect width="160" height="26" fill="#0a1211" />
        {["Overview","Analytics","AI","Trans"].map((l,i)=>(
          <g key={l} transform={`translate(${8 + i * 38},12)`}>
            <circle r="6" fill={i===2?"rgba(98,244,196,0.15)":"transparent"} stroke={i===2?"#62F4C4":"transparent"} strokeWidth="0.7"/>
            <text textAnchor="middle" y="10" fill={i===0?"#F5F6F2":"#7D8C83"} fontSize="4.5">{l}</text>
          </g>
        ))}
      </g>
    </svg>
  );
}

/* -------------------- Watch screen -------------------- */
function WatchScreen() {
  const step = useTicker(2600, 4);
  const targets = [11.2, 12.4, 13.1, 12.8];
  const v = useCounter(targets[step], step, 900);
  const pts = [
    [4, 22, 12, 18, 20, 10, 26, 6],
    [4, 24, 10, 20, 22, 8, 28, 4],
    [6, 22, 14, 16, 20, 12, 26, 8],
    [4, 26, 12, 18, 22, 10, 28, 6],
  ][step];
  return (
    <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
      <rect width="100" height="100" rx="18" fill="#0a1211" />
      <text x="10" y="14" fill="#62F4C4" fontSize="7" fontWeight="700">Aim</text>
      <text x="90" y="14" textAnchor="end" fill="#93A298" fontSize="6">9:41</text>
      <text x="10" y="30" fill="#93A298" fontSize="5">Portfolio</text>
      <text x="10" y="50" fill="#7AF4CF" fontSize="15" fontWeight="800">+{v.toFixed(1)}%</text>
      <polyline
        points={pts.map((y,i)=>`${10 + i*11},${88 - y}`).join(" ")}
        fill="none"
        stroke="#9B8CFF"
        strokeWidth="1.4"
      />
    </svg>
  );
}

/* -------------------- Devices (CSS chassis) -------------------- */
function MacBook({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full" style={{ aspectRatio: "16/10.5" }}>
      {/* Lid */}
      <div
        className="absolute inset-x-0 top-0 rounded-[14px] p-[6px]"
        style={{
          height: "94%",
          background: "linear-gradient(180deg,#2a2f33 0%,#1a1e21 100%)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.45), inset 0 0 0 1px rgba(255,255,255,0.05)",
        }}
      >
        <div className="relative w-full h-full rounded-[9px] overflow-hidden bg-black">
          {/* camera notch */}
          <div className="absolute top-1 left-1/2 -translate-x-1/2 h-[3px] w-8 rounded-full bg-[#0a0a0a] z-10" />
          {children}
          {/* screen glare */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(115deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 35%, rgba(255,255,255,0) 65%, rgba(255,255,255,0.05) 100%)",
            }}
          />
        </div>
      </div>
      {/* Base */}
      <div
        className="absolute inset-x-[-4%] bottom-0 rounded-b-[10px]"
        style={{
          height: "8%",
          background:
            "linear-gradient(180deg,#3a4046 0%,#20262b 60%,#0e1113 100%)",
          boxShadow: "0 30px 40px -10px rgba(0,0,0,0.5)",
        }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[18%] h-[22%] rounded-b-md bg-[#0a0d10]" />
      </div>
    </div>
  );
}

function IPhone({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative rounded-[28px] p-[4px]"
      style={{
        width: 168,
        height: 340,
        background: "linear-gradient(160deg,#3a3f43 0%,#15181b 100%)",
        boxShadow: "0 30px 60px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(255,255,255,0.08)",
      }}
    >
      <div className="relative w-full h-full rounded-[24px] overflow-hidden bg-black">
        {/* dynamic island */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 h-4 w-16 rounded-full bg-black z-10" />
        {children}
        <div
          className="absolute inset-0 pointer-events-none rounded-[24px]"
          style={{
            background:
              "linear-gradient(120deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 30%, rgba(255,255,255,0) 70%, rgba(255,255,255,0.06) 100%)",
          }}
        />
      </div>
      {/* side buttons */}
      <div className="absolute -left-[3px] top-16 h-14 w-[3px] rounded-l bg-[#2a2e31]" />
      <div className="absolute -right-[3px] top-24 h-20 w-[3px] rounded-r bg-[#2a2e31]" />
    </div>
  );
}

function AppleWatch({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative" style={{ width: 116, height: 168 }}>
      {/* strap top */}
      <div
        className="absolute left-1/2 -translate-x-1/2 top-0 w-[46%] h-[22%] rounded-t-[8px]"
        style={{ background: "linear-gradient(180deg,#1a1d20 0%,#0d1013 100%)" }}
      />
      {/* strap bottom */}
      <div
        className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[46%] h-[26%] rounded-b-[8px]"
        style={{ background: "linear-gradient(0deg,#1a1d20 0%,#0d1013 100%)" }}
      />
      {/* case */}
      <div
        className="absolute inset-x-0 top-[18%] bottom-[22%] rounded-[22px] p-[4px]"
        style={{
          background: "linear-gradient(160deg,#3a3f43 0%,#15181b 100%)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(255,255,255,0.08)",
        }}
      >
        <div className="relative w-full h-full rounded-[18px] overflow-hidden bg-black">
          {children}
          <div
            className="absolute inset-0 pointer-events-none rounded-[18px]"
            style={{
              background:
                "linear-gradient(120deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0) 60%, rgba(255,255,255,0.06) 100%)",
            }}
          />
        </div>
      </div>
      {/* crown */}
      <div className="absolute right-[-3px] top-[38%] w-[5px] h-4 rounded-r bg-[#2a2e31]" />
      <div className="absolute right-[-2px] top-[52%] w-[4px] h-2 rounded-r bg-[#2a2e31]" />
    </div>
  );
}

/* -------------------- Connection particles -------------------- */
function ConnectionLines() {
  // Coordinates in the 820x520 viewBox space
  return (
    <svg viewBox="0 0 820 520" className="absolute inset-0 w-full h-full pointer-events-none">
      <defs>
        <linearGradient id="cl-mint" x1="0" x2="1">
          <stop offset="0" stopColor="#7AF4CF" stopOpacity="0" />
          <stop offset="0.5" stopColor="#7AF4CF" stopOpacity="0.55" />
          <stop offset="1" stopColor="#7AF4CF" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="cl-part">
          <stop offset="0" stopColor="#7AF4CF" stopOpacity="1" />
          <stop offset="1" stopColor="#7AF4CF" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Phone -> Laptop */}
      <path id="pl" d="M320 300 C 430 240, 500 200, 640 200" fill="none" stroke="url(#cl-mint)" strokeWidth="1" strokeDasharray="2 4" />
      {/* Laptop -> Watch */}
      <path id="lw" d="M640 240 C 540 320, 470 360, 400 400" fill="none" stroke="url(#cl-mint)" strokeWidth="1" strokeDasharray="2 4" />
      {/* Watch -> Phone */}
      <path id="wp" d="M370 400 C 320 380, 300 350, 300 320" fill="none" stroke="url(#cl-mint)" strokeWidth="1" strokeDasharray="2 4" />

      {[
        { href: "#pl", d: "0s" },
        { href: "#pl", d: "1.6s" },
        { href: "#lw", d: "0.6s" },
        { href: "#lw", d: "2.2s" },
        { href: "#wp", d: "1.2s" },
      ].map((p, i) => (
        <circle key={i} r="4" fill="url(#cl-part)">
          <animateMotion dur="3.2s" repeatCount="indefinite" begin={p.d}>
            <mpath href={p.href} />
          </animateMotion>
        </circle>
      ))}
    </svg>
  );
}

/* -------------------- Floating status cards -------------------- */
function StatusCard({
  className,
  style,
  delay,
  dot,
  label,
}: {
  className: string;
  style?: React.CSSProperties;
  delay: string;
  dot: string;
  label: string;
}) {
  return (
    <div
      className={`absolute z-30 rounded-xl bg-white/[0.06] ring-1 ring-white/10 backdrop-blur-md px-2.5 py-1.5 text-[10px] text-white/85 flex items-center gap-1.5 hd-card ${className}`}
      style={{ animationDelay: delay, ...style }}
    >
      <span className="h-1.5 w-1.5 rounded-full hd-pulse" style={{ background: dot, animationDelay: delay }} />
      {label}
    </div>
  );
}

/* -------------------- Main showcase -------------------- */
export function DeviceShowcase() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none select-none hidden lg:block absolute right-0 top-[58%] -translate-y-1/2 w-[58%] max-w-[820px] pr-4"
    >
      <style>{`
        @keyframes hd-float-a { 0%,100% { transform: translate3d(0,0,0); } 50% { transform: translate3d(0,-6px,0); } }
        @keyframes hd-float-b { 0%,100% { transform: translate3d(0,0,0); } 50% { transform: translate3d(0,-8px,0); } }
        @keyframes hd-float-c { 0%,100% { transform: translate3d(0,0,0); } 50% { transform: translate3d(0,-4px,0); } }
        @keyframes hd-pulse { 0%,100% { opacity: .5; transform: scale(1);} 50% { opacity: 1; transform: scale(1.25);} }
        @keyframes hd-card-in { 0% { opacity: 0; transform: translateY(6px);} 100% { opacity: 1; transform: translateY(0);} }
        .hd-a { animation: hd-float-a 7s ease-in-out infinite; }
        .hd-b { animation: hd-float-b 6s ease-in-out infinite; }
        .hd-c { animation: hd-float-c 5s ease-in-out infinite; }
        .hd-pulse { animation: hd-pulse 2.4s ease-in-out infinite; }
        .hd-card { animation: hd-card-in .8s ease both, hd-float-c 6s ease-in-out infinite 1s; }
        @media (prefers-reduced-motion: reduce) {
          .hd-a,.hd-b,.hd-c,.hd-pulse,.hd-card { animation: none !important; }
        }
      `}</style>

      <div className="relative" style={{ aspectRatio: "820/520" }}>
        {/* Ambient emerald under-glow */}
        <div
          className="absolute -inset-10 -z-10 blur-3xl opacity-70"
          style={{
            background:
              "radial-gradient(55% 55% at 60% 55%, rgba(120,255,210,0.20), transparent 70%), radial-gradient(35% 40% at 30% 60%, rgba(155,140,255,0.14), transparent 70%)",
          }}
        />

        {/* MacBook — right/back */}
        <div className="absolute hd-a" style={{ left: "28%", top: "8%", width: "68%" }}>
          <MacBook>
            <LaptopScreen />
          </MacBook>
        </div>

        {/* iPhone — center/front */}
        <div className="absolute hd-b" style={{ left: "22%", top: "22%" }}>
          <IPhone>
            <PhoneScreen />
          </IPhone>
        </div>

        {/* Apple Watch — front/right */}
        <div className="absolute hd-c" style={{ left: "40%", top: "48%" }}>
          <AppleWatch>
            <WatchScreen />
          </AppleWatch>
        </div>

        {/* Connection particles */}
        <ConnectionLines />

        {/* Floating status cards */}
        <StatusCard className="hd-a" style={{ top: "3%", left: "44%" }} delay="0s" dot="#7AF4CF" label="Open Banking connected" />
        <StatusCard className="hd-b" style={{ top: "16%", right: "1%" }} delay="1.2s" dot="#9B8CFF" label="AI analysis complete" />
        <StatusCard className="hd-c" style={{ top: "60%", left: "10%" }} delay="2.4s" dot="#7AF4CF" label="Portfolio +12.4%" />
        <StatusCard className="hd-a" style={{ bottom: "6%", right: "3%" }} delay="0.6s" dot="#7D93FF" label="Savings updated" />
      </div>
    </div>
  );
}

export default DeviceShowcase;
