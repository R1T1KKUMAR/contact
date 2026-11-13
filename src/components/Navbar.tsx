"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useSite } from "@/components/site-context";

const LINKS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const chipColors = ["var(--butter)", "var(--pink)", "var(--violet)", "var(--orange)"];

export default function Navbar() {
  const SITE = useSite();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  if (pathname?.startsWith("/admin")) return null;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b-2 border-[var(--ink)] bg-[rgba(255,248,238,0.9)] backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a
          href="#top"
          className="text-xl font-bold tracking-tight"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {SITE.name.split(" ")[0]}
          <span className="text-[var(--orange)]">.</span>
        </a>

        <div className="hidden items-center gap-2 md:flex">
          {LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full border-2 border-transparent px-4 py-1.5 text-sm font-medium text-[var(--ink)] transition-all hover:border-[var(--ink)]"
              style={{ backgroundColor: "transparent" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = chipColors[i % chipColors.length])}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              {link.label}
            </a>
          ))}
          {SITE.resumeUrl && (
            <a
              href={SITE.resumeUrl}
              className="hard-shadow-sm ml-2 rounded-full border-2 border-[var(--ink)] bg-[var(--pink)] px-4 py-1.5 text-sm font-semibold text-[var(--ink)] transition-transform hover:-translate-y-0.5"
            >
              Resume
            </a>
          )}
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="text-[var(--ink)] md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open && (
        <div className="border-t-2 border-[var(--ink)] bg-[var(--paper)] px-6 py-4 md:hidden">
          <div className="flex flex-col gap-2">
            {LINKS.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl border-2 border-[var(--ink)] px-4 py-2 text-sm font-medium"
                style={{ backgroundColor: chipColors[i % chipColors.length] }}
              >
                {link.label}
              </a>
            ))}
            {SITE.resumeUrl && (
              <a
                href={SITE.resumeUrl}
                onClick={() => setOpen(false)}
                className="hard-shadow-sm rounded-xl border-2 border-[var(--ink)] bg-[var(--card)] px-4 py-2 text-center text-sm font-semibold"
              >
                Resume
              </a>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
