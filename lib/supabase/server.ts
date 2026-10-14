import { createClient } from "@supabase/supabase-js";

/** 공개 읽기 전용. 비밀키는 이 모듈에서 읽지 않는다. */
export function createPublicClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) =>
        fetch(input, {
          ...init,
          signal: init?.signal ?? AbortSignal.timeout(4000),
        }),
    },
  });
}

export function storagePublicUrl(storagePath: string) {
  const url = process.env.SUPABASE_URL;
  if (!url || !storagePath) return "";
  return `${url.replace(/\/$/, "")}/storage/v1/object/public/project-images/${storagePath}`;
}
