import { useMemo } from "react";

// Deterministic pseudo-random so nodes stay stable across renders
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Node = { x: number; y: number; r: number; op: number; delay: number; dur: number };

const SIZE = 560; // viewBox size (px equivalents)
const NODE_COUNT = 32;

function useNodes(): Node[] {
  return useMemo(() => {
    const rand = mulberry32(20260707);
    const nodes: Node[] = [];
    const pad = 24;
    let attempts = 0;
    while (nodes.length < NODE_COUNT && attempts < 4000) {
      attempts++;
      const x = pad + rand() * (SIZE - pad * 2);
      const y = pad + rand() * (SIZE - pad * 2);
      // Reject overly close nodes for organic spacing
      if (nodes.some((n) => Math.hypot(n.x - x, n.y - y) < 42)) continue;
      const r = 1.5 + rand() * 2.5; // 3–8px diameter
      const op = 0.35 + rand() * 0.35;
      const delay = -rand() * 6;
      const dur = 4 + rand() * 2;
      nodes.push({ x, y, r, op, delay, dur });
    }
    return nodes;
  }, []);
}

// Precompute a rotation of connection pairs between reasonably-close nodes
function useConnections(nodes: Node[]) {
  return useMemo(() => {
    const pairs: Array<{ a: number; b: number; len: number }> = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
        if (d > 70 && d < 170) pairs.push({ a: i, b: j, len: d });
      }
    }
    // Shuffle deterministically
    const rand = mulberry32(99);
    for (let i = pairs.length - 1; i > 0; i--) {
      const k = Math.floor(rand() * (i + 1));
      [pairs[i], pairs[k]] = [pairs[k], pairs[i]];
    }
    // Take 12 evenly-timed connections that cycle continuously
    return pairs.slice(0, 12);
  }, [nodes]);
}

export function FinancialConstellation() {
  const nodes = useNodes();
  const connections = useConnections(nodes);

  // Total loop where each connection is visible ~3s with 2–4 concurrent
  const CYCLE = 12; // seconds
  const VISIBLE = 3.5; // seconds visible per connection
  const step = CYCLE / connections.length;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none hidden lg:block absolute z-0"
      style={{
        top: "50%",
        right: "max(80px, 6vw)",
        transform: "translateY(-50%)",
        width: "min(600px, 45vw)",
        height: "min(600px, 45vw)",
      }}
    >
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        width="100%"
        height="100%"
        style={{ display: "block", overflow: "visible" }}
      >
        <defs>
          <filter id="fc-soft" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="0.6" />
          </filter>
          <filter id="fc-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="1.8" />
          </filter>
          <linearGradient id="fc-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#A8FFE6" stopOpacity="0" />
            <stop offset="50%" stopColor="#A8FFE6" stopOpacity="1" />
            <stop offset="100%" stopColor="#8BE8D4" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Connections */}
        <g filter="url(#fc-soft)">
          {connections.map((c, i) => {
            const a = nodes[c.a];
            const b = nodes[c.b];
            const delay = -(i * step);
            return (
              <line
                key={i}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke="url(#fc-line)"
                strokeWidth={1}
                strokeLinecap="round"
                style={{
                  opacity: 0,
                  animation: `fc-conn ${CYCLE}s linear ${delay}s infinite`,
                  ["--fc-visible" as any]: `${(VISIBLE / CYCLE) * 100}%`,
                }}
              />
            );
          })}
        </g>

        {/* Nodes */}
        <g>
          {nodes.map((n, i) => (
            <g key={i} style={{ transformOrigin: `${n.x}px ${n.y}px` }}>
              {/* Soft halo */}
              <circle
                cx={n.x}
                cy={n.y}
                r={n.r * 2.6}
                fill="#A8FFE6"
                opacity={0.08}
                filter="url(#fc-glow)"
              />
              {/* Core dot with breathing */}
              <circle
                cx={n.x}
                cy={n.y}
                r={n.r}
                fill={i % 5 === 0 ? "#6FD9C7" : i % 3 === 0 ? "#8BE8D4" : "#A8FFE6"}
                style={{
                  transformOrigin: `${n.x}px ${n.y}px`,
                  opacity: n.op,
                  animation: `fc-breathe ${n.dur}s ease-in-out ${n.delay}s infinite, fc-discover ${18 + (i % 5) * 2}s ease-in-out ${-(i * 0.7)}s infinite`,
                }}
              />
            </g>
          ))}
        </g>
      </svg>

      <style>{`
        @keyframes fc-breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
        @keyframes fc-conn {
          0%   { opacity: 0; }
          8%   { opacity: 0.20; }
          22%  { opacity: 0.20; }
          30%  { opacity: 0; }
          100% { opacity: 0; }
        }
        @keyframes fc-discover {
          0%, 92%, 100% { filter: none; }
          95% { filter: drop-shadow(0 0 6px rgba(168,255,230,0.9)); }
        }
        @media (prefers-reduced-motion: reduce) {
          circle, line { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

export default FinancialConstellation;
