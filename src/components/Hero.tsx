"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FileText } from "lucide-react";
import { useSite } from "@/components/site-context";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

function DimensionLine({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 font-mono text-[11px] text-[var(--bp-graphite)]" aria-hidden="true">
      <span className="h-px flex-1 bg-[var(--bp-line)]" />
      <span className="h-px w-2 bg-[var(--bp-line)]" />
      <span className="whitespace-nowrap">{label}</span>
      <span className="h-px w-2 bg-[var(--bp-line)]" />
      <span className="h-px flex-1 bg-[var(--bp-line)]" />
    </div>
  );
}

export default function Hero() {
  const SITE = useSite();
  const reduceMotion = useReducedMotion();

  const animationProps = reduceMotion
    ? {}
    : {
        variants: container,
        initial: "hidden" as const,
        animate: "show" as const,
      };

  const firstName = SITE.name.split(" ")[0];
  const rest = SITE.name.split(" ").slice(1).join(" ");

  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col justify-center px-6 pt-24 pb-16 lg:pt-16"
    >
      <motion.div className="mx-auto w-full max-w-5xl" {...animationProps}>
        {/* Drawing header annotation */}
        <motion.div variants={reduceMotion ? undefined : item} className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--bp-line-soft)] pb-4 font-mono text-[11px] text-[var(--bp-graphite)]">
          <span>DWG NO. RK-2026-001</span>
          <span className="flex items-center gap-2 text-[var(--bp-cyan)]">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--bp-cyan)]" />
            STATUS: OPEN TO WORK
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={reduceMotion ? undefined : item}
          className="mt-10 text-[13vw] font-semibold leading-[0.95] tracking-tight text-[var(--bp-white)] sm:text-7xl lg:text-8xl"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {firstName.toUpperCase()}
          {rest ? <span className="text-[var(--bp-graphite)]"> {rest.toUpperCase()}</span> : null}
          <span className="text-[var(--bp-cyan)]">.</span>
        </motion.h1>

        <motion.p
          variants={reduceMotion ? undefined : item}
          className="mt-5 font-mono text-sm text-[var(--bp-graphite)] sm:text-base"
        >
          {SITE.role} <span className="text-[var(--bp-cyan)]">&amp;</span> {SITE.roleAlt}
        </motion.p>

        <motion.div variants={reduceMotion ? undefined : item} className="mt-8 max-w-xl">
          <DimensionLine label={SITE.location.toUpperCase()} />
        </motion.div>

        <motion.p
          variants={reduceMotion ? undefined : item}
          className="mt-8 max-w-[60ch] text-base leading-relaxed text-[var(--bp-graphite)] sm:text-lg"
        >
          {SITE.tagline}
        </motion.p>

        {/* CTAs */}
        <motion.div variants={reduceMotion ? undefined : item} className="mt-10 flex flex-wrap gap-4">
          <a
            href="#projects"
            className="border border-[var(--bp-line)] px-6 py-3 font-mono text-sm text-[var(--bp-white)] transition-colors hover:border-[var(--bp-cyan)] hover:text-[var(--bp-cyan)]"
          >
            View drawings
          </a>
          {SITE.resumeUrl && (
            <a
              href={SITE.resumeUrl}
              className="flex items-center gap-2 border border-transparent px-6 py-3 font-mono text-sm text-[var(--bp-graphite)] transition-colors hover:border-[var(--bp-line)] hover:text-[var(--bp-white)]"
            >
              <FileText size={14} />
              Download resume
            </a>
          )}
        </motion.div>

        {/* Title block */}
        <motion.dl
          variants={reduceMotion ? undefined : item}
          className="mt-14 grid max-w-2xl grid-cols-2 gap-px border border-[var(--bp-line)] bg-[var(--bp-line)] sm:grid-cols-3"
        >
          {[
            ["DRAWN BY", SITE.name],
            ["ROLE", `${SITE.role} / ${SITE.roleAlt}`],
            ["SCALE", "1:1"],
            ["REV", "2026.11"],
            ["SHEET", "1 OF 9"],
            ["STATUS", "OPEN TO WORK"],
          ].map(([term, value]) => (
            <div key={term} className="bg-[var(--bp-ink)] p-3">
              <dt className="font-mono text-[9px] tracking-[0.2em] text-[var(--bp-cyan)]">{term}</dt>
              <dd className="mt-1 text-sm text-[var(--bp-white)]">{value}</dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>

      {/* Scroll hint */}
      <motion.a
        href="#about"
        variants={reduceMotion ? undefined : item}
        className="absolute bottom-8 right-6 hidden font-mono text-[11px] text-[var(--bp-graphite)] transition-colors hover:text-[var(--bp-white)] lg:block"
      >
        SCROLL ↓
      </motion.a>
    </section>
  );
}
