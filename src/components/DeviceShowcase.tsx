import heroDevices from "@/assets/hero-devices.png";

/**
 * Photorealistic hero device composition.
 * Uses a high-quality rendered image of MacBook Pro + iPhone Pro + Apple Watch Ultra
 * displaying the Aim fintech dashboard, with subtle floating financial motion
 * elements layered over it for life.
 */
export function DeviceShowcase() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none select-none hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-[58%] max-w-[820px] pr-4"
    >
      <style>{`
        @keyframes hd-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes hd-pulse { 0%,100% { opacity: .35; transform: scale(1); } 50% { opacity: .75; transform: scale(1.06); } }
        @keyframes hd-drift { 0% { transform: translate(0,0); } 50% { transform: translate(6px,-4px); } 100% { transform: translate(0,0); } }
        .hd-float { animation: hd-float 7s ease-in-out infinite; }
        .hd-pulse { animation: hd-pulse 4.5s ease-in-out infinite; }
        .hd-drift { animation: hd-drift 9s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .hd-float,.hd-pulse,.hd-drift { animation: none !important; }
        }
      `}</style>

      <div className="relative hd-float">
        {/* Ambient emerald under-glow */}
        <div
          className="absolute -inset-8 -z-10 opacity-70 blur-3xl"
          style={{
            background:
              "radial-gradient(60% 55% at 50% 60%, rgba(120,255,210,0.18), transparent 70%)",
          }}
        />
        <img
          src={heroDevices}
          alt=""
          className="w-full h-auto drop-shadow-[0_40px_80px_rgba(0,0,0,0.55)]"
          draggable={false}
        />

        {/* Subtle floating finance motifs */}
        <div className="absolute -top-2 left-6 hd-drift">
          <div className="rounded-xl bg-white/[0.06] ring-1 ring-white/10 backdrop-blur-md px-2.5 py-1.5 text-[10px] text-white/85 flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#7AF4CF] hd-pulse" />
            Open Banking synced
          </div>
        </div>
        <div className="absolute top-10 -right-2 hd-drift" style={{ animationDelay: "1.2s" }}>
          <div className="rounded-xl bg-white/[0.06] ring-1 ring-white/10 backdrop-blur-md px-2.5 py-1.5 text-[10px] text-white/85 flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#9B8CFF] hd-pulse" />
            AI analyzing spending
          </div>
        </div>
        <div className="absolute bottom-6 left-2 hd-drift" style={{ animationDelay: "2.4s" }}>
          <div className="rounded-xl bg-white/[0.06] ring-1 ring-white/10 backdrop-blur-md px-2.5 py-1.5 text-[10px] text-white/85 flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#7AF4CF] hd-pulse" />
            Portfolio +12.4%
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeviceShowcase;
