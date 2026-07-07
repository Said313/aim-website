import { useEffect, useRef } from "react";

/**
 * LivingGlass — a nearly imperceptible transparent volume with slow
 * flowing internal light. Pure CSS animations, GPU-accelerated.
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
      // clamp to ~10px max
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
      {/* Layer 1 — almost static soft blur volume */}
      <div className="lg-l1" />
      {/* Layer 2 — slow flowing internal light (silk/aurora) */}
      <div className="lg-l2 lg-flow-a" />
      <div className="lg-l2 lg-flow-b" />
      <div className="lg-l2 lg-flow-c" />
      {/* Layer 3 — tiny highlights */}
      <div className="lg-hi lg-hi-1" />
      <div className="lg-hi lg-hi-2" />
      <div className="lg-hi lg-hi-3" />
      {/* Micro pulses */}
      <div className="lg-pulse lg-pulse-1" />
      <div className="lg-pulse lg-pulse-2" />

      <style>{`
        .lg-root {
          position: absolute;
          width: min(560px, 42vw);
          height: min(560px, 42vw);
          right: max(80px, 6vw);
          top: 50%;
          margin-top: calc(min(560px, 42vw) / -2);
          filter: blur(0.5px);
          will-change: transform;
        }
        .lg-l1, .lg-l2, .lg-hi, .lg-pulse {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          will-change: transform, opacity, filter;
        }
        .lg-l1 {
          background: radial-gradient(60% 55% at 50% 50%,
            rgba(168,255,230,0.055) 0%,
            rgba(139,232,212,0.035) 40%,
            rgba(111,217,199,0.018) 65%,
            transparent 75%);
          filter: blur(40px);
          animation: lg-breathe 22s ease-in-out infinite;
        }
        .lg-l2 {
          mix-blend-mode: screen;
          opacity: 0.6;
          filter: blur(38px);
        }
        .lg-flow-a {
          background: radial-gradient(45% 32% at 42% 46%,
            rgba(168,255,230,0.07), transparent 70%);
          animation: lg-flow-a 24s ease-in-out infinite;
        }
        .lg-flow-b {
          background: radial-gradient(40% 30% at 58% 54%,
            rgba(139,232,212,0.06), transparent 70%);
          animation: lg-flow-b 21s ease-in-out infinite;
        }
        .lg-flow-c {
          background: radial-gradient(35% 28% at 50% 40%,
            rgba(111,217,199,0.05), transparent 70%);
          animation: lg-flow-c 25s ease-in-out infinite;
        }
        .lg-hi {
          width: 3px; height: 3px; inset: auto;
          border-radius: 50%;
          background: rgba(168,255,230,0.75);
          filter: blur(0.4px);
          box-shadow: 0 0 6px rgba(168,255,230,0.35);
          opacity: 0;
        }
        .lg-hi-1 { left: 44%; top: 38%; animation: lg-hi 14s ease-in-out infinite; }
        .lg-hi-2 { left: 58%; top: 52%; animation: lg-hi 17s ease-in-out infinite 5s; }
        .lg-hi-3 { left: 48%; top: 60%; animation: lg-hi 19s ease-in-out infinite 9s; }
        .lg-pulse {
          left: 50%; top: 50%;
          width: 50px; height: 50px;
          margin: -25px 0 0 -25px;
          inset: auto;
          background: radial-gradient(circle,
            rgba(168,255,230,0.13) 0%,
            rgba(139,232,212,0.06) 45%,
            transparent 70%);
          opacity: 0;
        }
        .lg-pulse-1 { animation: lg-pulse 8s ease-out infinite 2s; }
        .lg-pulse-2 { left: 56%; top: 46%;
          animation: lg-pulse 9s ease-out infinite 6.5s; }

        @keyframes lg-breathe {
          0%,100% { transform: translate3d(0,0,0) scale(1); }
          50%     { transform: translate3d(2px,-1px,0) scale(1.015); }
        }
        @keyframes lg-flow-a {
          0%,100% { transform: translate3d(-8px,-6px,0) scale(1); }
          50%     { transform: translate3d(10px,8px,0) scale(1.04); }
        }
        @keyframes lg-flow-b {
          0%,100% { transform: translate3d(9px,7px,0) scale(1.02); }
          50%     { transform: translate3d(-11px,-9px,0) scale(1); }
        }
        @keyframes lg-flow-c {
          0%,100% { transform: translate3d(0,10px,0) scale(1); }
          50%     { transform: translate3d(6px,-8px,0) scale(1.03); }
        }
        @keyframes lg-hi {
          0%, 88%, 100% { opacity: 0; transform: scale(0.8); }
          44%           { opacity: 0.55; transform: scale(1); }
        }
        @keyframes lg-pulse {
          0%   { opacity: 0; transform: scale(0.4); }
          25%  { opacity: 0.9; }
          70%  { opacity: 0; transform: scale(1.15); }
          100% { opacity: 0; transform: scale(1.15); }
        }
        @media (prefers-reduced-motion: reduce) {
          .lg-l1, .lg-l2, .lg-hi, .lg-pulse { animation: none !important; }
        }
        @media (max-width: 900px) {
          .lg-root { display: none; }
        }
      `}</style>
    </div>
  );
}
