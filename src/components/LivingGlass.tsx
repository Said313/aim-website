import { useEffect, useRef } from "react";

/**
 * LivingGlass — subtly visible transparent volume with continuously
 * flowing internal light streams. Pure CSS, GPU-accelerated.
 */
export function LivingGlass() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    let raf = 0;
    let tx = 0, ty = 0, cx = 0, cy = 0;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const nx = (e.clientX - (rect.left + rect.width / 2)) / rect.width;
      const ny = (e.clientY - (rect.top + rect.height / 2)) / rect.height;
      tx = Math.max(-1, Math.min(1, nx)) * 10;
      ty = Math.max(-1, Math.min(1, ny)) * 10;
    };
    const tick = () => {
      cx += (tx - cx) * 0.03;
      cy += (ty - cy) * 0.03;
      el.style.setProperty("--mx", `${cx.toFixed(2)}px`);
      el.style.setProperty("--my", `${cy.toFixed(2)}px`);
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="lg-root pointer-events-none"
      style={{ transform: "translate3d(var(--mx,0), var(--my,0), 0)" }}
    >
      {/* Layer 1 — ambient volume */}
      <div className="lg-l1" />

      {/* Layer 2 — flowing light streams (4 independent) */}
      <div className="lg-stream lg-s1" />
      <div className="lg-stream lg-s2" />
      <div className="lg-stream lg-s3" />
      <div className="lg-stream lg-s4" />

      {/* Traveling brightening regions (staggered so one is always alive) */}
      <div className="lg-bright lg-b1" />
      <div className="lg-bright lg-b2" />
      <div className="lg-bright lg-b3" />

      {/* Tiny highlights */}
      <div className="lg-hi lg-hi-1" />
      <div className="lg-hi lg-hi-2" />
      <div className="lg-hi lg-hi-3" />

      <style>{`
        .lg-root {
          position: absolute;
          width: min(600px, 44vw);
          height: min(600px, 44vw);
          right: max(80px, 6vw);
          top: 50%;
          margin-top: calc(min(600px, 44vw) / -2);
          will-change: transform;
        }
        .lg-l1, .lg-stream, .lg-bright, .lg-hi {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          will-change: transform, opacity, filter;
        }
        .lg-l1 {
          background: radial-gradient(60% 55% at 50% 50%,
            rgba(168,255,230,0.09) 0%,
            rgba(139,232,212,0.055) 40%,
            rgba(111,217,199,0.028) 65%,
            transparent 78%);
          filter: blur(50px);
          animation: lg-breathe 22s ease-in-out infinite;
        }

        .lg-stream {
          mix-blend-mode: screen;
          border-radius: 50%;
        }
        .lg-s1 {
          background: radial-gradient(48% 34% at 40% 44%,
            rgba(168,255,230,0.16), transparent 70%);
          filter: blur(80px);
          opacity: 0.85;
          animation: lg-flow-1 18s ease-in-out infinite;
        }
        .lg-s2 {
          background: radial-gradient(42% 32% at 60% 56%,
            rgba(139,232,212,0.15), transparent 70%);
          filter: blur(90px);
          opacity: 0.8;
          animation: lg-flow-2 16s ease-in-out infinite;
        }
        .lg-s3 {
          background: radial-gradient(38% 30% at 52% 38%,
            rgba(111,217,199,0.14), transparent 72%);
          filter: blur(100px);
          opacity: 0.85;
          animation: lg-flow-3 20s ease-in-out infinite;
        }
        .lg-s4 {
          background: radial-gradient(40% 30% at 46% 62%,
            rgba(168,255,230,0.12), transparent 72%);
          filter: blur(110px);
          opacity: 0.8;
          animation: lg-flow-4 15s ease-in-out infinite;
        }

        .lg-bright {
          background: radial-gradient(circle at 50% 50%,
            rgba(168,255,230,0.20) 0%,
            rgba(139,232,212,0.10) 35%,
            transparent 65%);
          filter: blur(60px);
          mix-blend-mode: screen;
          opacity: 0;
        }
        .lg-b1 { animation: lg-travel-1 15s ease-in-out infinite; }
        .lg-b2 { animation: lg-travel-2 17s ease-in-out infinite -6s; }
        .lg-b3 { animation: lg-travel-3 19s ease-in-out infinite -12s; }

        .lg-hi {
          width: 3px; height: 3px; inset: auto;
          background: rgba(168,255,230,0.85);
          box-shadow: 0 0 8px rgba(168,255,230,0.45);
          filter: blur(0.4px);
          opacity: 0;
        }
        .lg-hi-1 { left: 44%; top: 38%; animation: lg-hi 14s ease-in-out infinite; }
        .lg-hi-2 { left: 58%; top: 52%; animation: lg-hi 17s ease-in-out infinite 5s; }
        .lg-hi-3 { left: 48%; top: 60%; animation: lg-hi 19s ease-in-out infinite 9s; }

        @keyframes lg-breathe {
          0%,100% { transform: translate3d(0,0,0) scale(1); }
          50%     { transform: translate3d(3px,-2px,0) scale(1.02); }
        }
        @keyframes lg-flow-1 {
          0%,100% { transform: translate3d(-14px,-10px,0) scale(1); }
          50%     { transform: translate3d(16px,12px,0) scale(1.08); }
        }
        @keyframes lg-flow-2 {
          0%,100% { transform: translate3d(14px,10px,0) scale(1.05); }
          50%     { transform: translate3d(-16px,-12px,0) scale(1); }
        }
        @keyframes lg-flow-3 {
          0%,100% { transform: translate3d(0,14px,0) scale(1); }
          50%     { transform: translate3d(10px,-14px,0) scale(1.06); }
        }
        @keyframes lg-flow-4 {
          0%,100% { transform: translate3d(-10px,10px,0) scale(1.03); }
          50%     { transform: translate3d(12px,-8px,0) scale(1); }
        }
        /* Traveling brightening — smooth in/out, ~150px path */
        @keyframes lg-travel-1 {
          0%   { opacity: 0;    transform: translate3d(-80px,-40px,0); }
          20%  { opacity: 0.9; }
          80%  { opacity: 0.9; }
          100% { opacity: 0;    transform: translate3d(80px,60px,0); }
        }
        @keyframes lg-travel-2 {
          0%   { opacity: 0;    transform: translate3d(60px,-70px,0); }
          20%  { opacity: 0.9; }
          80%  { opacity: 0.9; }
          100% { opacity: 0;    transform: translate3d(-70px,50px,0); }
        }
        @keyframes lg-travel-3 {
          0%   { opacity: 0;    transform: translate3d(-40px,80px,0); }
          20%  { opacity: 0.9; }
          80%  { opacity: 0.9; }
          100% { opacity: 0;    transform: translate3d(70px,-60px,0); }
        }
        @keyframes lg-hi {
          0%, 88%, 100% { opacity: 0; transform: scale(0.8); }
          44%           { opacity: 0.7; transform: scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .lg-l1, .lg-stream, .lg-bright, .lg-hi { animation: none !important; }
        }
        @media (max-width: 900px) {
          .lg-root { display: none; }
        }
      `}</style>
    </div>
  );
}
