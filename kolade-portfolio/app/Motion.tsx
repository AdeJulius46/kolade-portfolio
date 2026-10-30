"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/* One scroll-and-pointer loop for the page's motion:
   - a ring-and-dot cursor that trails the pointer and grows over links (mouse devices only)
   - [data-speed] elements drift at their own speed as the page scrolls (parallax)
   - [data-drift] lines slide sideways with the scroll, opposite directions, and lean with its speed
   - the nav link for the section in view is marked active
   Nothing runs under prefers-reduced-motion except the nav marker. */
export default function Motion() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const root = document.documentElement;
    const speeds = [...document.querySelectorAll<HTMLElement>("[data-speed]")];
    const drifts = [...document.querySelectorAll<HTMLElement>("[data-drift]")];
    const links = [...document.querySelectorAll<HTMLAnchorElement>(".bar nav a[href^='/#']")];
    const targets = links.map((a) => document.getElementById(a.getAttribute("href")!.slice(2))).filter(Boolean) as HTMLElement[];

    let mx = -100, my = -100, rx = -100, ry = -100, lastY = window.scrollY, skew = 0, raf = 0;
    const useCursor = fine && !reduce && !!ring.current && !!dot.current;
    if (useCursor) root.classList.add("has-cursor");

    const onMove = (e: PointerEvent) => {
      mx = e.clientX; my = e.clientY;
      const hot = (e.target as Element)?.closest?.("a, button, input, [role='button']");
      ring.current?.classList.toggle("is-hot", !!hot);
      dot.current?.style.setProperty("transform", `translate(${mx}px, ${my}px)`);
    };
    const onDown = () => ring.current?.classList.add("is-down");
    const onUp = () => ring.current?.classList.remove("is-down");
    const onLeave = () => { mx = my = -100; };

    const frame = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;
      if (!reduce) {
        skew += ((y - lastY) * 0.12 - skew) * 0.12;
        skew = Math.max(-8, Math.min(8, skew));
        lastY = y;
        for (const el of speeds) {
          const r = el.parentElement!.getBoundingClientRect();
          const off = (r.top + r.height / 2 - vh / 2) * Number(el.dataset.speed);
          el.style.transform = `translate3d(0, ${off.toFixed(1)}px, 0)`;
        }
        for (const el of drifts) {
          const r = el.getBoundingClientRect();
          const dir = Number(el.dataset.drift);
          const x = (r.top - vh) * 0.35 * dir;
          el.style.transform = `translate3d(${x.toFixed(1)}px, 0, 0) skewX(${(-skew * dir).toFixed(2)}deg)`;
        }
        if (useCursor) {
          rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
          ring.current!.style.transform = `translate(${rx}px, ${ry}px)`;
        }
      }
      let active = -1;
      targets.forEach((t, i) => { if (t.getBoundingClientRect().top < vh * 0.45) active = i; });
      links.forEach((a, i) => a.classList.toggle("is-active", i === active));
      raf = requestAnimationFrame(frame);
    };

    if (useCursor) {
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerdown", onDown);
      window.addEventListener("pointerup", onUp);
      document.addEventListener("pointerleave", onLeave);
    }
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
      root.classList.remove("has-cursor");
    };
  }, [pathname]);

  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden="true" />
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
