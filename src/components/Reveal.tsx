import {
  useEffect,
  useRef,
  type ReactNode,
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type JSX,
} from "react";

type Variant = "up" | "fade" | "zoom-in" | "zoom-out" | "left" | "right" | "roll";

type ElementTag = keyof JSX.IntrinsicElements;

type RevealProps<T extends ElementTag = "div"> = {
  children: ReactNode;
  variant?: Variant;
  delay?: number;
  as?: T;
  className?: string;
  once?: boolean;
} & Omit<ComponentPropsWithoutRef<T>, "children" | "as" | "className" | "variant" | "delay" | "once">;

export function Reveal<T extends ElementTag = "div">({
  children,
  variant = "up",
  delay = 0,
  as,
  className = "",
  once = true,
  ...rest
}: RevealProps<T>) {
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
  const Tag = (as ?? "div") as ElementTag;
  return (
    <Tag
      ref={ref as never}
      data-variant={variant}
      className={`reveal ${className}`}
      style={style}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export default Reveal;
