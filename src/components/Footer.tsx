"use client";

import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import { useSite } from "@/components/site-context";

export default function Footer() {
  const SITE = useSite();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--hairline)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <p
          className="text-lg font-medium tracking-tight text-[var(--ink)]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {SITE.name.split(" ")[0]}
          <span className="text-[var(--ultra)]">.</span>
        </p>

        <div className="flex items-center gap-5 text-sm text-[var(--graphite)]">
          <a
            href={SITE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[var(--ink)]"
          >
            GitHub
          </a>
          <a
            href={SITE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[var(--ink)]"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${SITE.email}`}
            className="inline-flex items-center gap-1.5 transition-colors hover:text-[var(--ink)]"
          >
            <Mail size={14} />
            Email
          </a>
        </div>

        <p className="text-xs text-[var(--graphite)]">
          © {year} {SITE.name}
        </p>
      </div>
    </footer>
  );
}
