"use client";

export function SheetHeader({
  no,
  title,
  blurb,
}: {
  no: string;
  title: string;
  blurb?: string;
}) {
  return (
    <header className="mb-12 md:mb-16">
      <p className="font-mono text-[11px] tracking-[0.25em] text-[var(--bp-cyan)]">
        SHEET {no}
      </p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--bp-white)] sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {blurb && (
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[var(--bp-graphite)]">
          {blurb}
        </p>
      )}
      <div className="mt-8 h-px bg-[var(--bp-line-soft)]" />
    </header>
  );
}
