"use client";

import { Mail, Heart } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import { SITE } from "@/config/site";

export default function Footer() {
  return (
    <footer className="border-t border-[rgba(255,255,255,0.06)]">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-[#FAFAFA]">
              {SITE.name.split(" ")[0]}
              <span className="text-[#6366F1]">.</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#94A3B8] hover:text-[#FAFAFA] transition-colors"
              aria-label="GitHub"
            >
              <GithubIcon size={16} />
            </a>
            <a
              href={SITE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#94A3B8] hover:text-[#FAFAFA] transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedinIcon size={16} />
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="text-[#94A3B8] hover:text-[#FAFAFA] transition-colors"
              aria-label="Email"
            >
              <Mail size={16} />
            </a>
          </div>

          <div className="flex items-center gap-1 text-xs text-[#94A3B8]">
            <span>&copy; {new Date().getFullYear()} {SITE.name}</span>
            <span className="mx-2">·</span>
            <span className="flex items-center gap-1">
              Made with <Heart size={10} className="text-[#6366F1]" /> using Next.js
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
