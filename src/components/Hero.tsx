"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useSite } from "@/components/site-context";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

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

  const reveal = reduceMotion ? {} : { variants: item };

  return (
    <section id="top" className="relative overflow-hidden px-6 pb-16 pt-28">
      {/* Soft background blobs — two, quiet */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[var(--butter)] opacity-50 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-1/2 h-72 w-72 rounded-full bg-[var(--violet)] opacity-10 blur-3xl"
      />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1fr_360px]">
        <motion.div {...animationProps}>
          {/* Sticker badge */}
          <motion.p
            {...reveal}
            className="hard-shadow-sm inline-block -rotate-2 rounded-full border-2 border-[var(--ink)] bg-[var(--pink)] px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-[var(--ink)]"
          >
            Open to work
          </motion.p>

          <motion.h1
            {...reveal}
            className="mt-7 text-[2.9rem] font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {SITE.name.split(" ")[0]}{" "}
            <span className="squiggle">{SITE.name.split(" ").slice(1).join(" ")}</span>
            <span className="text-[var(--orange)]">.</span>
          </motion.h1>

          <motion.p
            {...reveal}
            className="mt-5 text-lg font-medium sm:text-xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {SITE.role} <span className="text-[var(--violet)]">&amp;</span> {SITE.roleAlt}
          </motion.p>

          <motion.p
            {...reveal}
            className="mt-6 max-w-[58ch] text-[15px] leading-relaxed text-[var(--graphite)] sm:text-base"
          >
            {SITE.tagline}
          </motion.p>

          <motion.div {...reveal} className="mt-9 flex flex-wrap items-center gap-5">
            <a
              href="#projects"
              className="hard-shadow-sm rounded-full border-2 border-[var(--ink)] bg-[var(--orange)] px-6 py-3 text-sm font-bold text-[var(--ink)] transition-transform hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5"
            >
              See my work
            </a>
            <a
              href="#contact"
              className="text-sm font-semibold text-[var(--ink)] underline decoration-[var(--violet)] decoration-2 underline-offset-8 transition-colors hover:text-[var(--violet)]"
            >
              Get in touch
            </a>
            {SITE.resumeUrl && (
              <a
                href={SITE.resumeUrl}
                className="text-sm font-semibold text-[var(--graphite)] underline decoration-[var(--hairline)] decoration-2 underline-offset-8 transition-colors hover:text-[var(--ink)]"
              >
                Download resume
              </a>
            )}
          </motion.div>
        </motion.div>

        {/* Portrait with sticker */}
        <motion.div {...reveal} className="hidden lg:block">
          <div className="relative">
            <div className="hard-shadow overflow-hidden rounded-2xl border-2 border-[var(--ink)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={SITE.profileImage || "/images/Profile.jpeg"}
                alt={SITE.name}
                className="aspect-[3/4] w-full object-cover"
              />
            </div>
            <p className="hard-shadow-sm absolute -bottom-4 -left-4 -rotate-3 rounded-full border-2 border-[var(--ink)] bg-[var(--butter)] px-3.5 py-1.5 text-xs font-bold">
              {SITE.location}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
