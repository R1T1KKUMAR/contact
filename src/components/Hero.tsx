"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useSite } from "@/components/site-context";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
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
    <section id="top" className="relative flex min-h-[82vh] items-center px-6 pb-16 pt-28">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1fr_330px]">
        <motion.div {...animationProps}>
          <motion.p
            {...reveal}
            className="flex items-center gap-2.5 text-sm text-[var(--graphite)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--grow)] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--grow)]" />
            </span>
            Available for opportunities
          </motion.p>

          <motion.h1
            {...reveal}
            className="mt-6 text-4xl font-medium leading-[1.05] tracking-tight text-[var(--ink)] sm:text-6xl lg:text-[4.25rem]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {SITE.name}
            <span className="text-[var(--ultra)]">.</span>
          </motion.h1>

          <motion.p
            {...reveal}
            className="mt-4 text-lg text-[var(--graphite)] sm:text-xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {SITE.role} &amp; {SITE.roleAlt}
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
              className="rounded-full bg-[var(--ink)] px-6 py-3 text-sm font-medium text-[var(--paper)] transition-colors hover:bg-[var(--ultra-deep)]"
            >
              View projects
            </a>
            <a
              href="#contact"
              className="text-sm font-medium text-[var(--ink)] underline decoration-[var(--hairline)] underline-offset-8 transition-colors hover:decoration-[var(--ultra)]"
            >
              Get in touch
            </a>
            {SITE.resumeUrl && (
              <a
                href={SITE.resumeUrl}
                className="text-sm font-medium text-[var(--graphite)] underline decoration-[var(--hairline)] underline-offset-8 transition-colors hover:text-[var(--ink)] hover:decoration-[var(--ultra)]"
              >
                Download resume
              </a>
            )}
          </motion.div>
        </motion.div>

        {/* Portrait */}
        <motion.div
          {...reveal}
          className="hidden lg:block"
        >
          <div className="overflow-hidden rounded-2xl ring-1 ring-black/5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={SITE.profileImage || "/images/Profile.jpeg"}
              alt={SITE.name}
              className="aspect-[3/4] w-full object-cover grayscale-[25%] transition-all duration-700 hover:grayscale-0"
            />
          </div>
          <p className="mt-3 text-center text-xs text-[var(--graphite)]">
            {SITE.location}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
