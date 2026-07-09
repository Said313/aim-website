import { useEffect, useRef, useState } from "react";

/**
 * Premium multi-device product showcase.
 * Photorealistic layered composition:
 *   MacBook (background plane) — iPhone (middle plane) — Watch (foreground plane).
 * Devices gently float. Only screen contents transition.
 */

const SCREENS = [
  "health",
  "ranking",
  "freedom",
  "cashflow",
  "categories",
  "investments",
  "insights",
] as const;
type Screen = (typeof SCREENS)[number];

const INTERVAL = 4600; // ms between MacBook changes
const STAGGER = 900; // ms between devices

function useRotator(offset: number) {
  const [i, setI] = useState(0);
  const [visible, setVisible] = useState(true);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      ([e]) => setVisible(e.isIntersecting),
      { threshold: 0.1 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    let intervalId: ReturnType<typeof setInterval> | undefined;
    const startId = setTimeout(() => {
      setI((x) => x + 1);
      intervalId = setInterval(() => setI((x) => x + 1), INTERVAL);
    }, offset);
    return () => {
      clearTimeout(startId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [visible, offset]);

  return { screen: SCREENS[i % SCREENS.length] as Screen, ref };
}

/* -------------------- Primitives -------------------- */

function Ring({ value, size = 84, stroke = 7 }: { value: number; size?: number; stroke?: number }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth={stroke} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="url(#dsRing)"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={`${(value / 100) * c} ${c}`}
        style={{ transition: "stroke-dasharray 900ms cubic-bezier(0.4,0,0.2,1)" }}
      />
      <defs>
        <linearGradient id="dsRing" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#78FFD2" />
          <stop offset="60%" stopColor="#9B8CFF" />
          <stop offset="100%" stopColor="#7D93FF" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function LineChart({ w = 100, h = 28, points, color = "#78FFD2" }: { w?: number; h?: number; points: number[]; color?: string }) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const path = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * w;
      const y = h - ((p - min) / range) * h;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full" preserveAspectRatio="none">
      <path d={path} fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

function Donut({ segments }: { segments: { v: number; c: string }[] }) {
  const r = 22;
  const c = 2 * Math.PI * r;
  let acc = 0;
  const total = segments.reduce((s, x) => s + x.v, 0);
  return (
    <svg viewBox="0 0 60 60" className="w-full h-full -rotate-90">
      <circle cx="30" cy="30" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
      {segments.map((s, i) => {
        const len = (s.v / total) * c;
        const el = (
          <circle
            key={i}
            cx="30"
            cy="30"
            r={r}
            fill="none"
            stroke={s.c}
            strokeWidth="8"
            strokeDasharray={`${len} ${c}`}
            strokeDashoffset={-acc}
          />
        );
        acc += len;
        return el;
      })}
    </svg>
  );
}

/* -------------------- Screens -------------------- */

function MacScreen({ screen }: { screen: Screen }) {
  return (
    <div className="absolute inset-0 p-2.5 text-[7px] text-white/85">
      <div className="flex items-center gap-1 mb-1.5">
        <div className="w-6 h-2 rounded-sm bg-white/10" />
        <div className="ml-auto flex gap-1">
          <span className="h-1 w-3 rounded-full bg-white/15" />
          <span className="h-1 w-1 rounded-full bg-white/30" />
        </div>
      </div>
      <div className="grid grid-cols-[24%_1fr] gap-1.5 h-[calc(100%-14px)]">
        <div className="rounded-md bg-white/[0.08] ring-1 ring-white/10 p-1.5 space-y-1">
          {["Overview", "Accounts", "Transactions", "Analytics", "Goals", "Settings"].map((l, i) => (
            <div
              key={l}
              className={`flex items-center gap-1 rounded px-1 py-0.5 ${i === 3 ? "bg-emerald-300/25 text-white" : "text-white/70"}`}
            >
              <span className="h-1 w-1 rounded-full bg-current opacity-70" />
              <span className="truncate">{l}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 grid-rows-2 gap-1.5">
          <Tile active={screen === "health"} label="Financial Health">
            <div className="flex items-center gap-1.5">
              <Ring value={82} size={34} stroke={4} />
              <div>
                <div className="font-semibold text-[10px] text-white leading-none">82</div>
                <div className="text-emerald-300/90 text-[6px]">+3 this month</div>
              </div>
            </div>
          </Tile>
          <Tile active={screen === "ranking"} label="Your Ranking">
            <div className="text-white text-[10px] font-semibold leading-none">Top 13%</div>
            <div className="h-3 mt-0.5">
              <LineChart points={[6, 8, 12, 14, 20, 26, 30]} color="#9B8CFF" />
            </div>
          </Tile>
          <Tile active={screen === "freedom"} label="Freedom Age">
            <div className="text-white text-[10px] font-semibold leading-none">51 yrs</div>
            <svg viewBox="0 0 40 14" className="mt-1 w-full h-3 opacity-90">
              <path d="M0,13 L10,7 L15,10 L22,3 L30,9 L40,13 Z" fill="rgba(120,255,210,0.35)" stroke="#78FFD2" strokeWidth="0.4" />
            </svg>
          </Tile>
          <Tile active={screen === "cashflow"} label="Cash Flow">
            <div className="h-5">
              <LineChart points={[10, 14, 12, 18, 22, 20, 26]} color="#78FFD2" />
            </div>
            <div className="flex gap-1.5 text-[6px] mt-0.5">
              <span className="text-emerald-300">+₸12.9%</span>
              <span className="text-rose-300">-₸8.3%</span>
            </div>
          </Tile>
          <Tile active={screen === "categories"} label="Spending">
            <div className="w-7 h-7 mx-auto">
              <Donut
                segments={[
                  { v: 40, c: "#7D93FF" },
                  { v: 25, c: "#78FFD2" },
                  { v: 20, c: "#D37BFF" },
                  { v: 15, c: "#F5C86A" },
                ]}
              />
            </div>
          </Tile>
          <Tile active={screen === "insights" || screen === "investments"} label={screen === "investments" ? "Portfolio" : "AI Insight"}>
            {screen === "investments" ? (
              <div className="h-4">
                <LineChart points={[5, 7, 6, 9, 11, 13, 12, 16]} color="#9B8CFF" />
              </div>
            ) : (
              <div className="text-[6px] text-white/85 leading-tight">
                Save $320 this month by cutting recurring subscriptions.
              </div>
            )}
          </Tile>
        </div>
      </div>
    </div>
  );
}

function Tile({ label, active, children }: { label: string; active: boolean; children: React.ReactNode }) {
  return (
    <div
      className={`rounded-md p-1 ring-1 transition-all duration-700 ${
        active
          ? "ring-emerald-300/50 bg-white/[0.14]"
          : "ring-white/10 bg-white/[0.08]"
      }`}
    >
      <div className="text-[5.5px] uppercase tracking-wider text-white/70 mb-0.5">{label}</div>
      {children}
    </div>
  );
}

function PhoneScreen({ screen }: { screen: Screen }) {
  return (
    <div key={screen} className="absolute inset-0 p-3 text-white ds-swap">
      <div className="text-[9px] text-white/60 mb-3">Aim · Overview</div>
      {screen === "health" && (
        <div className="flex flex-col items-center mt-6">
          <Ring value={82} size={120} stroke={9} />
          <div className="-mt-[74px] font-display text-3xl font-semibold">82</div>
          <div className="mt-16 text-[10px] text-emerald-300">↑ +3 this month</div>
        </div>
      )}
      {screen === "ranking" && (
        <div className="mt-4">
          <div className="text-center font-display text-2xl">Top 13%</div>
          <div className="h-16 mt-4"><LineChart points={[4, 6, 10, 14, 20, 24, 30, 36]} color="#9B8CFF" /></div>
          <div className="mt-2 text-center text-[10px] text-emerald-300">Ahead of 87%</div>
        </div>
      )}
      {screen === "freedom" && (
        <div className="mt-6 flex flex-col items-center">
          <div className="font-display text-4xl">51<span className="text-sm text-white/60 ml-1">yrs</span></div>
          <svg viewBox="0 0 80 30" className="w-32 mt-3">
            <path d="M0,28 L20,14 L28,20 L44,6 L60,18 L80,28 Z" fill="rgba(120,255,210,0.25)" stroke="#78FFD2" strokeWidth="0.8" />
          </svg>
          <div className="mt-3 text-[10px] text-emerald-300">↓ −2 yrs in 6 mo</div>
        </div>
      )}
      {screen === "cashflow" && (
        <div className="mt-4">
          <div className="text-[10px] text-white/60">Cash flow</div>
          <div className="font-display text-2xl">₸ 2 543 890</div>
          <div className="h-16 mt-3"><LineChart points={[10, 12, 11, 16, 14, 20, 22, 26]} color="#78FFD2" /></div>
        </div>
      )}
      {screen === "categories" && (
        <div className="mt-4 flex items-center gap-3">
          <div className="w-20 h-20">
            <Donut segments={[{ v: 40, c: "#7D93FF" }, { v: 25, c: "#78FFD2" }, { v: 20, c: "#D37BFF" }, { v: 15, c: "#F5C86A" }]} />
          </div>
          <div className="text-[9px] space-y-1">
            <div className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-[#7D93FF]" />Housing 40%</div>
            <div className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-[#78FFD2]" />Food 25%</div>
            <div className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-[#D37BFF]" />Transport 20%</div>
            <div className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-[#F5C86A]" />Other 15%</div>
          </div>
        </div>
      )}
      {screen === "investments" && (
        <div className="mt-4">
          <div className="text-[10px] text-white/60">Portfolio</div>
          <div className="font-display text-2xl">+12.4%</div>
          <div className="h-20 mt-3"><LineChart points={[5, 7, 6, 9, 8, 12, 14, 13, 18]} color="#9B8CFF" /></div>
        </div>
      )}
      {screen === "insights" && (
        <div className="mt-4">
          <div className="text-[10px] uppercase tracking-widest text-emerald-300 mb-2">AI Insight</div>
          <div className="text-[11px] leading-relaxed text-white/90">
            You could save <span className="text-emerald-300 font-semibold">$320</span> this month by reducing recurring subscriptions.
          </div>
          <div className="mt-4 rounded-lg bg-white/5 px-2 py-1.5 text-[9px] text-white/70">5 subscriptions detected</div>
        </div>
      )}
    </div>
  );
}

function WatchScreen({ screen }: { screen: Screen }) {
  return (
    <div key={screen} className="absolute inset-0 flex flex-col items-center justify-center text-white ds-swap p-2">
      {screen === "health" && (<>
        <Ring value={82} size={68} stroke={6} />
        <div className="-mt-[46px] font-display text-lg">82</div>
        <div className="mt-8 text-[7px] text-emerald-300">Health</div>
      </>)}
      {screen === "ranking" && (<>
        <div className="text-[7px] text-white/60">Ranking</div>
        <div className="font-display text-lg mt-0.5">Top 13%</div>
        <div className="w-14 h-4 mt-1"><LineChart points={[3, 6, 10, 14, 18, 22]} color="#9B8CFF" /></div>
      </>)}
      {screen === "freedom" && (<>
        <div className="text-[7px] text-white/60">Freedom</div>
        <div className="font-display text-2xl leading-none">51</div>
        <div className="text-[7px] text-white/60">years</div>
        <div className="text-[7px] text-emerald-300 mt-1">↓ −2 yr</div>
      </>)}
      {screen === "cashflow" && (<>
        <div className="text-[7px] text-white/60">Today</div>
        <div className="font-display text-sm">+₸4 320</div>
        <div className="w-14 h-4 mt-1"><LineChart points={[5, 8, 6, 9, 12, 10, 14]} color="#78FFD2" /></div>
      </>)}
      {screen === "categories" && (<>
        <div className="text-[7px] text-white/60">Spending</div>
        <div className="w-12 h-12 mt-1">
          <Donut segments={[{ v: 40, c: "#7D93FF" }, { v: 25, c: "#78FFD2" }, { v: 20, c: "#D37BFF" }, { v: 15, c: "#F5C86A" }]} />
        </div>
      </>)}
      {screen === "investments" && (<>
        <div className="text-[7px] text-white/60">Portfolio</div>
        <div className="font-display text-sm text-emerald-300">+12.4%</div>
        <div className="w-14 h-4 mt-1"><LineChart points={[5, 6, 8, 7, 10, 12]} color="#9B8CFF" /></div>
      </>)}
      {screen === "insights" && (<>
        <div className="text-[7px] text-emerald-300 uppercase tracking-widest">AI</div>
        <div className="text-[8px] text-center leading-tight mt-1 px-1">Save $320 this month</div>
      </>)}
    </div>
  );
}

/* -------------------- Devices -------------------- */

function MacBook({ screen }: { screen: Screen }) {
  return (
    <div className="relative w-[620px] max-w-full">
      {/* Lid — brushed aluminum with realistic edge highlights */}
      <div
        className="relative rounded-t-[16px] p-[11px] pb-[9px]"
        style={{
          background:
            "linear-gradient(180deg,#e5e8eb 0%,#c9ced2 30%,#a9afb4 65%,#8b9196 100%)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.95), inset 0 -1px 0 rgba(0,0,0,0.22), inset 1px 0 0 rgba(255,255,255,0.35), inset -1px 0 0 rgba(0,0,0,0.15), 0 40px 90px -30px rgba(0,0,0,0.7)",
        }}
      >
        {/* Bezel */}
        <div
          className="relative rounded-[7px] overflow-hidden aspect-[16/10]"
          style={{
            background: "#08090a",
            boxShadow:
              "inset 0 0 0 1px #030405, inset 0 0 0 2px #1a1e21, inset 0 0 24px rgba(0,0,0,0.6)",
          }}
        >
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-1.5 w-16 rounded-b-md bg-black z-20" />
          {/* Screen surface */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 90% at 20% 0%, #1f3a35 0%, #172a28 40%, #0f1f1d 100%)",
            }}
          >
            <div key={screen} className="ds-swap absolute inset-0">
              <MacScreen screen={screen} />
            </div>
            {/* Screen glass glare */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(115deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.02) 35%, rgba(255,255,255,0) 55%), linear-gradient(200deg, rgba(120,255,210,0.05), transparent 40%)",
              }}
            />
          </div>
        </div>
      </div>
      {/* Hinge */}
      <div
        className="h-[4px]"
        style={{
          background:
            "linear-gradient(180deg,#5a5f63 0%,#2d3134 55%,#494e51 100%)",
        }}
      />
      {/* Base wedge with keyboard hint */}
      <div className="relative">
        <div
          className="h-[14px] rounded-b-[14px] relative overflow-hidden"
          style={{
            background:
              "linear-gradient(180deg,#d4d9dd 0%,#adb2b6 45%,#7a7f83 100%)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.85), inset 0 -1px 0 rgba(0,0,0,0.35), 0 18px 40px -12px rgba(0,0,0,0.55)",
          }}
        >
          {/* Faint keyboard band reflection */}
          <div
            className="absolute inset-x-6 top-[3px] h-[4px] rounded-sm opacity-40"
            style={{
              background:
                "repeating-linear-gradient(90deg, rgba(0,0,0,0.35) 0 3px, rgba(255,255,255,0.05) 3px 5px)",
            }}
          />
        </div>
        {/* Trackpad notch */}
        <div
          className="mx-auto -mt-[7px] h-[6px] w-1/3 rounded-b-lg"
          style={{
            background: "linear-gradient(180deg,#20242700 0%,#20242780 100%)",
            boxShadow: "inset 0 1px 2px rgba(0,0,0,0.5)",
          }}
        />
      </div>
    </div>
  );
}

function IPhone({ screen }: { screen: Screen }) {
  return (
    <div
      className="relative w-[172px] h-[356px] rounded-[42px] p-[3px]"
      style={{
        background:
          "linear-gradient(145deg,#e9ecef 0%,#8b9196 18%,#3a3e40 45%,#1a1d1f 68%,#5a5f63 92%,#c8ccd0 100%)",
        boxShadow:
          "0 40px 80px -20px rgba(0,0,0,0.75), 0 20px 40px -15px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.12)",
      }}
    >
      {/* Side buttons */}
      <div className="absolute -left-[2px] top-[80px] h-7 w-[3px] rounded-l bg-[#1a1d1f]" />
      <div className="absolute -left-[2px] top-[118px] h-11 w-[3px] rounded-l bg-[#1a1d1f]" />
      <div className="absolute -left-[2px] top-[170px] h-11 w-[3px] rounded-l bg-[#1a1d1f]" />
      <div className="absolute -right-[2px] top-[125px] h-16 w-[3px] rounded-r bg-[#1a1d1f]" />

      {/* Inner bezel */}
      <div className="relative w-full h-full rounded-[39px] bg-black p-[2px]">
        <div
          className="relative w-full h-full rounded-[37px] overflow-hidden"
          style={{
            background:
              "radial-gradient(120% 100% at 30% 0%, #22403a 0%, #172d29 45%, #0e1e1c 100%)",
          }}
        >
          {/* Dynamic Island */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 h-[24px] w-[92px] rounded-full bg-black z-20 ring-1 ring-white/[0.04]" />
          <PhoneScreen screen={screen} />
          {/* Glass glare */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(150deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.02) 35%, rgba(255,255,255,0) 50%), linear-gradient(320deg, rgba(120,255,210,0.06), transparent 45%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

function AppleWatch({ screen }: { screen: Screen }) {
  return (
    <div className="relative w-[124px]">
      {/* Band top */}
      <div
        className="mx-auto h-9 w-[80px] rounded-t-[12px]"
        style={{
          background:
            "linear-gradient(180deg,#1e2224 0%,#2b2f31 60%,#181b1d 100%)",
          boxShadow: "inset 0 -4px 8px rgba(0,0,0,0.55)",
        }}
      />
      {/* Case */}
      <div
        className="relative rounded-[30px] p-[3px]"
        style={{
          background:
            "linear-gradient(145deg,#4a4f52 0%,#1e2224 55%,#5a5f63 100%)",
          boxShadow:
            "0 30px 55px -15px rgba(0,0,0,0.75), 0 12px 25px -8px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.1)",
        }}
      >
        <div className="relative aspect-square rounded-[26px] overflow-hidden bg-black p-[2px]">
          <div
            className="relative w-full h-full rounded-[24px] overflow-hidden"
            style={{
              background:
                "radial-gradient(110% 100% at 30% 0%, #22403a 0%, #14282584 60%, #0b1a18 100%)",
            }}
          >
            <WatchScreen screen={screen} />
            {/* Curved glass glare */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(120% 80% at 25% 15%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 40%), linear-gradient(200deg, rgba(255,255,255,0.05), transparent 40%)",
              }}
            />
          </div>
        </div>

        {/* Digital Crown */}
        <div
          className="absolute right-[-5px] top-[36%] h-6 w-[6px] rounded-r-md"
          style={{
            background:
              "linear-gradient(180deg,#7a7f83 0%,#3a3e40 45%,#7a7f83 100%)",
            boxShadow:
              "inset 0 0 0 1px rgba(255,255,255,0.2), 0 2px 4px rgba(0,0,0,0.5)",
          }}
        />
        {/* Side button */}
        <div className="absolute right-[-3px] top-[62%] h-4 w-[4px] rounded-r bg-[#1a1d1f]" />
      </div>
      {/* Band bottom */}
      <div
        className="mx-auto h-9 w-[80px] rounded-b-[12px]"
        style={{
          background:
            "linear-gradient(180deg,#181b1d 0%,#2b2f31 40%,#1e2224 100%)",
          boxShadow: "inset 0 4px 8px rgba(0,0,0,0.55)",
        }}
      />
    </div>
  );
}

/* -------------------- Root -------------------- */

export function DeviceShowcase() {
  const mac = useRotator(0);
  const phone = useRotator(STAGGER);
  const watch = useRotator(STAGGER * 2);

  return (
    <div
      ref={mac.ref}
      aria-hidden="true"
      className="pointer-events-none select-none hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-[58%] max-w-[820px] pr-4"
    >
      <style>{`
        @keyframes ds-swap-in {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: none; }
        }
        .ds-swap { animation: ds-swap-in 900ms cubic-bezier(0.4,0,0.2,1) both; }

        @keyframes ds-float-a {
          0%, 100% { transform: translateY(0) rotateX(6deg) rotateY(-12deg) rotateZ(0.3deg); }
          50%      { transform: translateY(-7px) rotateX(6.5deg) rotateY(-11deg) rotateZ(0.6deg); }
        }
        @keyframes ds-float-b {
          0%, 100% { transform: translateY(0) rotateX(4deg) rotateY(10deg) rotateZ(-1.5deg); }
          50%      { transform: translateY(-9px) rotateX(4.5deg) rotateY(9deg) rotateZ(-1deg); }
        }
        @keyframes ds-float-c {
          0%, 100% { transform: translateY(0) rotateX(8deg) rotateY(-6deg) rotateZ(-2deg); }
          50%      { transform: translateY(-6px) rotateX(8.5deg) rotateY(-5deg) rotateZ(-1.5deg); }
        }
        .ds-float-mac   { animation: ds-float-a 11s ease-in-out infinite; transform-style: preserve-3d; will-change: transform; }
        .ds-float-phone { animation: ds-float-b 9s  ease-in-out infinite; transform-style: preserve-3d; will-change: transform; }
        .ds-float-watch { animation: ds-float-c 10s ease-in-out infinite; transform-style: preserve-3d; will-change: transform; }

        @media (prefers-reduced-motion: reduce) {
          .ds-swap, .ds-float-mac, .ds-float-phone, .ds-float-watch { animation: none !important; }
        }
      `}</style>

      <div
        className="relative flex items-end justify-center"
        style={{ perspective: "1800px", perspectiveOrigin: "50% 35%" }}
      >
        {/* Ambient environment light — blends devices with background */}
        <div
          className="absolute -inset-10 rounded-full opacity-70 blur-3xl"
          style={{
            background:
              "radial-gradient(60% 55% at 30% 30%, rgba(120,255,210,0.16), transparent 70%), radial-gradient(50% 45% at 75% 65%, rgba(155,140,255,0.10), transparent 70%)",
          }}
        />
        {/* Deep floor shadow */}
        <div className="absolute inset-x-6 -bottom-8 h-24 bg-black/70 blur-[40px] rounded-[50%]" />

        {/* MacBook — background plane, right-shifted */}
        <div
          className="relative z-10 ds-float-mac"
          style={{ marginLeft: "12%" }}
        >
          <MacBook screen={mac.screen} />
        </div>

        {/* iPhone — middle plane, overlapping left side of MacBook */}
        <div
          className="absolute left-[2%] bottom-[-40px] z-20 ds-float-phone"
        >
          {/* Contact shadow onto MacBook */}
          <div className="absolute -inset-4 -z-10 rounded-[50px] bg-black/50 blur-2xl" />
          <IPhone screen={phone.screen} />
        </div>

        {/* Apple Watch — foreground, overlapping bottom-right of iPhone */}
        <div
          className="absolute left-[18%] bottom-[-70px] z-30 ds-float-watch"
        >
          <div className="absolute -inset-3 -z-10 rounded-full bg-black/55 blur-2xl" />
          <AppleWatch screen={watch.screen} />
        </div>
      </div>
    </div>
  );
}

export default DeviceShowcase;
