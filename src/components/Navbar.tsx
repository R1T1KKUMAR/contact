"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useSite } from "@/components/site-context";

const SHEETS: { no: string; label: string; href: string }[] = [
  { no: "01", label: "Cover", href: "#top" },
  { no: "02", label: "About", href: "#about" },
  { no: "03", label: "Parts list", href: "#skills" },
  { no: "04", label: "Assembly", href: "#projects" },
  { no: "05", label: "Revisions", href: "#experience" },
  { no: "06", label: "Materials", href: "#stack" },
  { no: "07", label: "Inspection", href: "#achievements" },
  { no: "08", label: "Activity", href: "#github" },
  { no: "09", label: "Request build", href: "#contact" },
];

export default function Navbar() {
  const SITE = useSite();
  const pathname = usePathname();
  const [active, setActive] = useState("#top");

  useEffect(() => {
    const ids = SHEETS.map((s) => s.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-30% 0px -55% 0px" }
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  if (pathname?.startsWith("/admin")) return null;

  const brand = (
    <a href="#top" className="font-mono text-sm font-semibold tracking-tight text-[var(--bp-white)]">
      {SITE.name.split(" ")[0].toUpperCase()}
      <span className="text-[var(--bp-cyan)]">.</span>
    </a>
  );

  // Desktop: fixed sheet-index rail
  const rail = (
    <nav
      aria-label="Sheet index"
      className="fixed left-0 top-0 bottom-0 z-50 hidden w-44 flex-col justify-between border-r border-[var(--bp-line-soft)] bg-[rgba(10,32,56,0.7)] px-5 py-6 backdrop-blur-sm lg:flex"
    >
      <div>
        {brand}
        <ul className="mt-10 space-y-1">
          {SHEETS.map((sheet) => {
            const isActive = active === sheet.href;
            return (
              <li key={sheet.href}>
                <a
                  href={sheet.href}
                  className={`group flex items-baseline gap-2 border-l-2 py-1.5 pl-3 text-[11px] font-mono transition-colors ${
                    isActive
                      ? "border-[var(--bp-cyan)] text-[var(--bp-white)]"
                      : "border-transparent text-[var(--bp-graphite)] hover:text-[var(--bp-white)]"
                  }`}
                >
                  <span className={isActive ? "text-[var(--bp-cyan)]" : "text-[var(--bp-graphite)] opacity-60"}>
                    {sheet.no}
                  </span>
                  <span>{sheet.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="space-y-1 font-mono text-[10px] leading-relaxed text-[var(--bp-graphite)]">
        <p className="flex items-center gap-1.5">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--bp-cyan)]" />
          Open to work
        </p>
        <p>{SITE.location}</p>
      </div>
    </nav>
  );

  // Mobile: compact top bar with the same index, scrollable
  const topbar = (
    <nav
      aria-label="Sheet index"
      className="fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between gap-4 border-b border-[var(--bp-line-soft)] bg-[rgba(10,32,56,0.85)] px-4 backdrop-blur-sm lg:hidden"
    >
      {brand}
      <div className="flex gap-4 overflow-x-auto font-mono text-[11px] text-[var(--bp-graphite)] [scrollbar-width:none]">
        {SHEETS.map((sheet) => (
          <a
            key={sheet.href}
            href={sheet.href}
            className={`whitespace-nowrap transition-colors ${
              active === sheet.href ? "text-[var(--bp-cyan)]" : "hover:text-[var(--bp-white)]"
            }`}
          >
            {sheet.no}
          </a>
        ))}
      </div>
    </nav>
  );

  return (
    <>
      {rail}
      {topbar}
    </>
  );
}
