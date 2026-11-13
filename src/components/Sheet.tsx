"use client";

export function SectionHeader({
  title,
  blurb,
}: {
  title: string;
  blurb?: string;
}) {
  return (
    <header className="mb-12 md:mb-16">
      <h2
        className="text-3xl font-medium tracking-tight text-[var(--ink)] sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        {title}
      </h2>
      {blurb && (
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[var(--graphite)] sm:text-base">
          {blurb}
        </p>
      )}
      <div className="mt-10 h-px bg-[var(--hairline)]" />
    </header>
  );
}
