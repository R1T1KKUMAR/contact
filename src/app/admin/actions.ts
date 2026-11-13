"use server";

import { cookies } from "next/headers";
import { createHash } from "node:crypto";
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";
import {
  saveSiteContent,
  supabaseConfigured,
  getSupabase,
} from "@/lib/site-data";
import type { SiteData } from "@/config/site";

const SESSION_COOKIE = "admin_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function sessionToken(): string {
  const password = process.env.ADMIN_PASSWORD || "";
  return createHash("sha256").update(`admin-session:${password}`).digest("hex");
}

export async function isAuthed(): Promise<boolean> {
  const store = await cookies();
  return store.get(SESSION_COOKIE)?.value === sessionToken();
}

export async function loginAction(
  _prevState: { error?: string } | undefined,
  formData: FormData
): Promise<{ error?: string }> {
  const password = String(formData.get("password") || "");
  const expected = process.env.ADMIN_PASSWORD;

  if (!expected) {
    return { error: "ADMIN_PASSWORD is not set in the environment." };
  }

  // Constant-time-ish comparison to avoid trivial timing attacks.
  const a = Buffer.from(createHash("sha256").update(password).digest("hex"));
  const b = Buffer.from(createHash("sha256").update(expected).digest("hex"));
  if (a.length !== b.length || !a.every((byte, i) => byte === b[i])) {
    return { error: "Incorrect password." };
  }

  const store = await cookies();
  store.set(SESSION_COOKIE, sessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: SESSION_MAX_AGE,
    path: "/",
  });

  redirect("/admin");
}

export async function logoutAction(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
  redirect("/admin");
}

const ASSETS_BUCKET = "site-assets";
const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5MB

/** Uploads an image to Supabase Storage and returns its public URL. */
export async function uploadImageAction(
  formData: FormData
): Promise<{ ok: boolean; url?: string; error?: string }> {
  if (!(await isAuthed())) {
    return { ok: false, error: "Not authorized. Please log in again." };
  }
  if (!supabaseConfigured) {
    return { ok: false, error: "Supabase is not configured." };
  }

  const supabase = getSupabase();
  if (!supabase) return { ok: false, error: "Supabase is not configured." };

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, error: "No file provided." };
  }
  if (!file.type.startsWith("image/")) {
    return { ok: false, error: "Only image files are allowed." };
  }
  if (file.size > MAX_IMAGE_BYTES) {
    return { ok: false, error: "Image must be smaller than 5MB." };
  }

  try {
    // Ensure a public bucket exists (first upload creates it).
    const { data: buckets } = await supabase.storage.listBuckets();
    if (!buckets?.some((b) => b.name === ASSETS_BUCKET)) {
      const { error: createError } = await supabase.storage.createBucket(ASSETS_BUCKET, {
        public: true,
      });
      if (createError && !createError.message.includes("already exists")) {
        return { ok: false, error: createError.message };
      }
    }

    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
    const path = `${Date.now()}-${safeName}`;
    const { error } = await supabase.storage
      .from(ASSETS_BUCKET)
      .upload(path, file, { contentType: file.type });

    if (error) return { ok: false, error: error.message };

    const { data } = supabase.storage.from(ASSETS_BUCKET).getPublicUrl(path);
    return { ok: true, url: data.publicUrl };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Upload failed." };
  }
}

export async function saveSiteAction(
  content: SiteData
): Promise<{ ok: boolean; error?: string }> {
  if (!(await isAuthed())) {
    return { ok: false, error: "Not authorized. Please log in again." };
  }

  if (!supabaseConfigured) {
    return { ok: false, error: "Supabase is not configured (missing SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY)." };
  }

  if (
    !content ||
    typeof content !== "object" ||
    typeof content.name !== "string" ||
    typeof content.email !== "string"
  ) {
    return { ok: false, error: "Content is missing required fields (name, email)." };
  }

  const result = await saveSiteContent(content);
  if (result.ok) revalidateTag("site-content");
  return result;
}
