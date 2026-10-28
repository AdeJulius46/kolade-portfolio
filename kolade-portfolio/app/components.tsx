"use client";

import { useEffect, useRef, useState } from "react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  useEffect(() => {
    const t = document.documentElement.dataset.theme;
    if (t === "light" || t === "dark") setTheme(t);
  }, []);
  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch {}
  };
  return (
    <button className="theme-toggle" onClick={toggle} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}>
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  );
}

function useInView<T extends Element>(threshold = 0.2) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") { setSeen(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, seen] as const;
}

/* Children rise in one after another as the block enters; hidden only under html.js, so nothing stays invisible without script */
export function Reveal({ children, className = "", delay = 0, as = "div" }: { children: React.ReactNode; className?: string; delay?: number; as?: "div" | "section" | "article" }) {
  const [ref, seen] = useInView<HTMLDivElement>(0.12);
  const Tag = as as "div";
  return (
    <Tag ref={ref} className={`reveal ${seen ? "in" : ""} ${className}`} style={{ ["--delay" as string]: `${delay}ms` } as React.CSSProperties}>
      {children}
    </Tag>
  );
}

/* The loan model's recall, shown as 100 borrowers: how many of each group it actually recognised */
const groups = {
  repaid: { caught: 99, label: "Repaid", sentence: "borrowers who repaid were recognised by the model." },
  defaulted: { caught: 10, label: "Defaulted", sentence: "borrowers who defaulted were flagged. The other 90 looked safe to it." },
} as const;

export function RecallGrid() {
  const [group, setGroup] = useState<keyof typeof groups>("repaid");
  const g = groups[group];
  return (
    <div className="recall" data-ui>
      <div className="recall-switch" role="group" aria-label="Borrowers who">
        {(Object.keys(groups) as (keyof typeof groups)[]).map((k) => (
          <button key={k} aria-pressed={k === group} onClick={() => setGroup(k)}>{groups[k].label}</button>
        ))}
      </div>
      <div className="recall-grid" aria-hidden="true">
        {Array.from({ length: 100 }).map((_, i) => (
          <i key={i} className={i < g.caught ? "hit" : ""} style={{ ["--i" as string]: i } as React.CSSProperties} />
        ))}
      </div>
      <p className="recall-text" aria-live="polite"><b>{g.caught} of 100</b> {g.sentence}</p>
    </div>
  );
}
