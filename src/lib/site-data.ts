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

let client: SupabaseClient | null = null;

function getSupabase(): SupabaseClient | null {
  if (!supabaseConfigured) return null;
  if (!client) {
    client = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!, {
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

      if (error || !data) return SITE;
      return withDefaults(data.data);
    } catch {
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
