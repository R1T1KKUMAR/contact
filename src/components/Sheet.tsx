"use client";

export function SectionHeader({
  title,
  blurb,
}: {
  title: string;
  blurb?: string;
}) {
  return (
    <header className="mb-10 md:mb-14">
      <h2
        className="text-2xl font-medium tracking-tight text-[var(--ink)] sm:text-3xl lg:text-[2.25rem] lg:leading-[1.15]"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        {title}
      </h2>
      {blurb && (
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[var(--graphite)]">
          {blurb}
        </p>
      )}
      <div className="mt-8 h-px bg-[var(--hairline)]" />
    </header>
  );
}
