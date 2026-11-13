"use client";

import { useSite } from "@/components/site-context";

/** Scrolling strip of technologies between the hero and the rest of the page. */
export default function Ticker() {
  const SITE = useSite();
  const items = SITE.techStack.map((t) => t.name);
  const doubled = [...items, ...items];

  return (
    <div
      aria-hidden="true"
      className="overflow-hidden border-y-2 border-[var(--ink)] bg-[var(--butter)] py-3"
    >
      <div className="marquee-track flex w-max items-center gap-8">
        {doubled.map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="flex items-center gap-8 whitespace-nowrap font-semibold text-[var(--ink)]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {name}
            <svg width="14" height="14" viewBox="0 0 14 14" className="text-[var(--ink)]">
              <path
                d="M7 0 L8.6 5.4 L14 7 L8.6 8.6 L7 14 L5.4 8.6 L0 7 L5.4 5.4 Z"
                fill="currentColor"
              />
            </svg>
          </span>
        ))}
      </div>
    </div>
  );
}
