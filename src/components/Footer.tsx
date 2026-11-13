"use client";

import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import { useSite } from "@/components/site-context";

export default function Footer() {
  const SITE = useSite();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--bp-line-soft)]">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-8 font-mono text-[11px] text-[var(--bp-graphite)] sm:flex-row sm:items-center sm:justify-between">
        <p>
          SHEET 09 / 09 — {SITE.name}
        </p>
        <div className="flex items-center gap-5">
          <a
            href={SITE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[var(--bp-white)]"
            aria-label="GitHub"
          >
            <GithubIcon size={15} />
          </a>
          <a
            href={SITE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[var(--bp-white)]"
            aria-label="LinkedIn"
          >
            <LinkedinIcon size={15} />
          </a>
          <a
            href={`mailto:${SITE.email}`}
            className="transition-colors hover:text-[var(--bp-white)]"
            aria-label="Email"
          >
            <Mail size={15} />
          </a>
        </div>
        <p>&copy; {year} — drawn in Next.js</p>
      </div>
    </footer>
  );
}
