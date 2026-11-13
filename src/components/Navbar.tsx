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

export default function Navbar() {
  const SITE = useSite();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname?.startsWith("/admin")) return null;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-[var(--hairline)] bg-[rgba(250,250,247,0.85)] backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a
          href="#top"
          className="text-lg font-medium tracking-tight text-[var(--ink)]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {SITE.name.split(" ")[0]}
          <span className="text-[var(--ultra)]">.</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-[var(--graphite)] transition-colors hover:text-[var(--ink)]"
            >
              {link.label}
            </a>
          ))}
          {SITE.resumeUrl && (
            <a
              href={SITE.resumeUrl}
              className="rounded-full bg-[var(--ink)] px-5 py-2 text-sm text-[var(--paper)] transition-colors hover:bg-[var(--ultra-deep)]"
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
        <div className="border-t border-[var(--hairline)] bg-[var(--paper)] px-6 py-4 md:hidden">
          <div className="flex flex-col">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-2.5 text-sm text-[var(--graphite)] hover:text-[var(--ink)]"
              >
                {link.label}
              </a>
            ))}
            {SITE.resumeUrl && (
              <a
                href={SITE.resumeUrl}
                onClick={() => setOpen(false)}
                className="mt-2 rounded-full bg-[var(--ink)] px-5 py-2.5 text-center text-sm text-[var(--paper)]"
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
