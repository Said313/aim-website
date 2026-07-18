import { createElement, useEffect, useRef, type ReactNode, type CSSProperties } from "react";

type Variant = "up" | "fade" | "zoom-in" | "zoom-out" | "left" | "right" | "roll";

export function Reveal({
  children,
  variant = "up",
  delay = 0,
  as = "div",
  className = "",
  once = true,
  ...rest
}: {
  children: ReactNode;
  variant?: Variant;
  delay?: number;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  once?: boolean;
} & Record<string, unknown>) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            if (once) io.unobserve(e.target);
          } else if (!once) {
            e.target.classList.remove("in-view");
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  const style: CSSProperties = delay ? { animationDelay: `${delay}ms` } : {};

  return createElement(as, {
    ref,
    "data-variant": variant,
    className: `reveal ${className}`,
    style,
    ...rest,
  }, children);
}

export default Reveal;
