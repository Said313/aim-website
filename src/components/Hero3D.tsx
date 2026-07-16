import { lazy, Suspense, useEffect, useState } from "react";

/**
 * SSR-safe wrapper for the R3F hero scene.
 * three.js touches `window` at module scope, so we mount only after hydration.
 */
const Hero3DScene = lazy(() => import("./Hero3DScene"));

export function Hero3D({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div
      className={className}
      style={{ position: "relative", width: "100%", height: "100%", minHeight: 420 }}
      aria-hidden="true"
    >
      {mounted ? (
        <Suspense fallback={null}>
          <Hero3DScene />
        </Suspense>
      ) : null}
    </div>
  );
}

export default Hero3D;
