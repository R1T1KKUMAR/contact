"use client";

import { createContext, useContext, type ReactNode } from "react";
import { SITE, type SiteData } from "@/config/site";

const SiteContext = createContext<SiteData>(SITE);

export function SiteProvider({
  site,
  children,
}: {
  site: SiteData;
  children: ReactNode;
}) {
  return <SiteContext.Provider value={site}>{children}</SiteContext.Provider>;
}

/** Access the live site content (Supabase-backed, falls back to src/config/site.ts). */
export function useSite(): SiteData {
  return useContext(SiteContext);
}
