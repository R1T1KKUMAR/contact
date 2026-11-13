"use client";

import { Mail, Heart } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import { useSite } from "@/components/site-context";

const socialStyles = [
  { backgroundColor: "var(--butter)" },
  { backgroundColor: "var(--pink)" },
  { backgroundColor: "var(--violet)", color: "var(--card)" },
];

export default function Footer() {
  const SITE = useSite();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t-2 border-[var(--ink)] bg-[var(--paper)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <p
          className="text-xl font-extrabold tracking-tight text-[var(--ink)]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {SITE.name.split(" ")[0]}
          <span className="text-[var(--orange)]">.</span>
        </p>

        <div className="flex items-center gap-3">
          <a
            href={SITE.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hard-shadow-sm flex h-10 w-10 items-center justify-center rounded-full border-2 border-[var(--ink)] transition-transform hover:-translate-y-0.5"
            style={socialStyles[0]}
          >
            <GithubIcon size={16} />
          </a>
          <a
            href={SITE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hard-shadow-sm flex h-10 w-10 items-center justify-center rounded-full border-2 border-[var(--ink)] transition-transform hover:-translate-y-0.5"
            style={socialStyles[1]}
          >
            <LinkedinIcon size={16} />
          </a>
          <a
            href={`mailto:${SITE.email}`}
            aria-label="Email"
            className="hard-shadow-sm flex h-10 w-10 items-center justify-center rounded-full border-2 border-[var(--ink)] transition-transform hover:-translate-y-0.5"
            style={socialStyles[2]}
          >
            <Mail size={16} />
          </a>
        </div>

        <p className="flex items-center gap-1.5 text-xs font-medium text-[var(--graphite)]">
          © {year} {SITE.name} · made with
          <Heart size={11} className="fill-[var(--pink)] text-[var(--pink)]" />
        </p>
      </div>
    </footer>
  );
}
