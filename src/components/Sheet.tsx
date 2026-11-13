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
        className="text-2xl font-extrabold tracking-tight sm:text-4xl"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        {title}
      </h2>
      {blurb && (
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[var(--graphite)]">
          {blurb}
        </p>
      )}
      <div className="mt-7 h-1 w-14 rounded-full bg-[var(--orange)]" />
    </header>
  );
}
