import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://github.com/users/R1T1KKUMAR/contributions", {
      next: { revalidate: 3600 },
    });
    const html = await res.text();

    const days: { date: string; count: number; level: number }[] = [];

    const tdRegex = /<td[^>]*data-date="([^"]*)"[^>]*data-level="(\d)"[^>]*>/g;
    let match;
    while ((match = tdRegex.exec(html)) !== null) {
      const level = parseInt(match[2], 10);
      days.push({
        date: match[1],
        count: level,
        level,
      });
    }

    const totalMatch = html.match(/([\d,]+)\s+contributions\s+in\s+the\s+last\s+year/);
    const total = totalMatch ? parseInt(totalMatch[1].replace(/,/g, ""), 10) : 0;

    return NextResponse.json({ contributions: days, total });
  } catch {
    return NextResponse.json({ contributions: [], total: 0 }, { status: 500 });
  }
}
