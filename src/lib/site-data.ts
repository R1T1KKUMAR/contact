import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { unstable_cache } from "next/cache";
import { SITE, type SiteData } from "@/config/site";

/**
 * Server-only data layer for site content.
 *
 * Content lives in a single JSONB row in Supabase (table `site_content`).
 * If Supabase is not configured (missing env vars) or unreachable, we fall
 * back to the static defaults in `src/config/site.ts` so the public site
 * never breaks.
 */

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const supabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY);

/**
 * Users often paste a deeper URL (e.g. ".../rest/v1" or ".../storage/v1")
 * into SUPABASE_URL. The SDK appends "/storage/v1" etc. itself, so any
 * suffix breaks every request. Normalize down to the bare project URL.
 */
function normalizeSupabaseUrl(raw: string): string {
  return raw
    .trim()
    .replace(/\/+(rest|storage|auth|realtime|functions)\/v1.*$/i, "")
    .replace(/\/+$/, "");
}

let client: SupabaseClient | null = null;

function getSupabase(): SupabaseClient | null {
  if (!supabaseConfigured) return null;
  if (!client) {
    const url = normalizeSupabaseUrl(SUPABASE_URL!);
    if (url !== SUPABASE_URL!.trim()) {
      console.warn(`[site-data] SUPABASE_URL had extra path, normalized to: ${url}`);
    }
    client = createClient(url, SUPABASE_SERVICE_ROLE_KEY!, {
      auth: { persistSession: false },
    });
  }
  return client;
}

export { getSupabase };

/** Merges saved content over the defaults so new fields added to site.ts always have values. */
function withDefaults(saved: Partial<SiteData> | null | undefined): SiteData {
  if (!saved || typeof saved !== "object") return SITE;
  return { ...SITE, ...saved };
}

export const getSiteContent = unstable_cache(
  async (): Promise<SiteData> => {
    const supabase = getSupabase();
    if (!supabase) return SITE;

    try {
      const { data, error } = await supabase
        .from("site_content")
        .select("data")
        .eq("id", "site")
        .maybeSingle();

      if (error) {
        console.error("[site-data] failed to read site_content:", error.message);
        return SITE;
      }
      if (!data) return SITE;
      return withDefaults(data.data);
    } catch (err) {
      console.error("[site-data] Supabase unreachable:", err instanceof Error ? err.message : err);
      return SITE;
    }
  },
  ["site-content"],
  { revalidate: 60, tags: ["site-content"] }
);

export async function saveSiteContent(content: Partial<SiteData>): Promise<{ ok: boolean; error?: string }> {
  const supabase = getSupabase();
  if (!supabase) {
    return {
      ok: false,
      error:
        "Supabase is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables.",
    };
  }

  if (!content || typeof content !== "object" || Array.isArray(content)) {
    return { ok: false, error: "Invalid content payload." };
  }

  const { error } = await supabase
    .from("site_content")
    .upsert({ id: "site", data: content, updated_at: new Date().toISOString() });

  if (error) {
    return { ok: false, error: error.message };
  }

  // Bust the public site cache so changes appear immediately.
  const { revalidateTag } = await import("next/cache");
  revalidateTag("site-content");

  return { ok: true };
}
