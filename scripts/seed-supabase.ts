/**
 * crawl/ 사진 90장과 시공 사실 문구를 Supabase에 넣습니다.
 * 같은 블로그 ID, 같은 이미지 경로가 있으면 건너뜁니다. 기존 행은 수정하지 않습니다.
 * 블로그 원문은 저장하지 않고, crawl/ 파일도 바꾸지 않습니다.
 *
 * 검토 후에만 실행하세요: npm run seed
 */
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { readFileSync, readdirSync } from "fs";
import path from "path";
import { blogUrl, projectsCopy, servicesCopy, settingsCopy } from "../content/copy";

type Post = { id: string; images: string[] };

function loadEnv() {
  const file = readFileSync(path.join(process.cwd(), ".env"), "utf8");
  for (const line of file.split(/\r?\n/)) {
    const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (!match || process.env[match[1]]) continue;
    process.env[match[1]] = match[2];
  }
}

function contentType(ext: string) {
  if (ext === ".png") return "image/png";
  if (ext === ".webp") return "image/webp";
  return "image/jpeg";
}

function storedName(sortOrder: number, filename: string) {
  const ext = path.extname(filename).toLowerCase() || ".jpg";
  return `${String(sortOrder).padStart(2, "0")}${ext}`;
}

function postFiles(post: Post, folder: string) {
  const files = readdirSync(path.join(process.cwd(), "crawl", folder, "images")).sort((a, b) =>
    a.localeCompare(b, undefined, { numeric: true }),
  );
  if (files.length !== post.images.length) {
    throw new Error(`${post.id} 사진 수가 맞지 않습니다. 파일 ${files.length}, 주소 ${post.images.length}`);
  }
  return files;
}

async function existingProjectId(supabase: SupabaseClient, blogId: string) {
  const { data, error } = await supabase.from("projects").select("id").eq("original_blog_id", blogId).maybeSingle();
  if (error) throw new Error(`${blogId} 조회 실패: ${error.message}`);
  return data?.id ?? null;
}

async function main() {
  loadEnv();
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) throw new Error("SUPABASE_URL 또는 SUPABASE_SECRET_KEY 가 없습니다.");

  const supabase = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
  const { error: probeError } = await supabase.from("projects").select("id").limit(1);
  if (probeError) throw new Error("projects 테이블이 없습니다. 마이그레이션을 검토한 뒤 적용하세요.");

  const posts = JSON.parse(readFileSync(path.join(process.cwd(), "crawl", "posts.json"), "utf8")) as Post[];
  const folders = readdirSync(path.join(process.cwd(), "crawl"), { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);

  for (const [index, service] of servicesCopy.entries()) {
    const project = projectsCopy.find((item) => item.logNo === service.cover.logNo);
    const post = posts.find((item) => item.id === service.cover.logNo);
    const folder = folders.find((name) => name.endsWith(service.cover.logNo));
    let imagePath: string | null = null;
    if (project && post && folder) {
      const files = postFiles(post, folder);
      const file = files[service.cover.sortOrder - 1];
      if (file) imagePath = `${project.slug}/${storedName(service.cover.sortOrder, file)}`;
    }
    const { error } = await supabase.from("services").upsert(
      {
        name: service.name,
        slug: service.category,
        description: service.description,
        image_path: imagePath,
        sort_order: index + 1,
        is_active: true,
      },
      { onConflict: "slug", ignoreDuplicates: true },
    );
    if (error) throw new Error(`서비스 저장 실패: ${error.message}`);
  }

  let uploaded = 0;
  let skipped = 0;
  let images = 0;

  for (const copy of projectsCopy) {
    const post = posts.find((item) => item.id === copy.logNo);
    const folder = folders.find((name) => name.endsWith(copy.logNo));
    if (!post || !folder) throw new Error(`원본 글을 찾지 못했습니다: ${copy.logNo}`);
    const files = postFiles(post, folder);
    const coverFile = files[copy.coverSortOrder - 1];
    if (!coverFile) throw new Error(`${copy.slug} 대표 사진 순번이 없습니다.`);
    const coverPath = `${copy.slug}/${storedName(copy.coverSortOrder, coverFile)}`;

    const { error: insertError } = await supabase.from("projects").upsert(
      {
        title: copy.title,
        slug: copy.slug,
        summary: copy.summary,
        content: copy.content.join("\n\n"),
        category: copy.category,
        original_blog_id: copy.logNo,
        original_blog_url: blogUrl(copy.logNo),
        original_post_date: copy.date,
        cover_image_path: coverPath,
        is_featured: copy.featuredRank != null,
        published: true,
      },
      { onConflict: "original_blog_id", ignoreDuplicates: true },
    );
    if (insertError) throw new Error(`${copy.slug} 저장 실패: ${insertError.message}`);

    const projectId = await existingProjectId(supabase, copy.logNo);
    if (!projectId) throw new Error(`${copy.slug} 행을 찾지 못했습니다.`);

    const { data: existingFiles } = await supabase.storage.from("project-images").list(copy.slug);
    const existingNames = new Set((existingFiles ?? []).map((file) => file.name));

    for (let index = 0; index < files.length; index += 1) {
      const sortOrder = index + 1;
      const name = storedName(sortOrder, files[index]);
      const storagePath = `${copy.slug}/${name}`;
      images += 1;

      if (existingNames.has(name)) {
        skipped += 1;
      } else {
        const bytes = readFileSync(path.join(process.cwd(), "crawl", folder, "images", files[index]));
        const { error: uploadError } = await supabase.storage.from("project-images").upload(storagePath, bytes, {
          contentType: contentType(path.extname(name)),
          upsert: false,
        });
        if (uploadError && !/already exists|duplicate/i.test(uploadError.message)) {
          throw new Error(`${storagePath} 업로드 실패: ${uploadError.message}`);
        }
        if (uploadError) skipped += 1;
        else uploaded += 1;
      }

      const { error: imageError } = await supabase.from("project_images").upsert(
        {
          project_id: projectId,
          storage_path: storagePath,
          alt_text: `${copy.title} 현장 사진 ${sortOrder}`,
          sort_order: sortOrder,
        },
        { onConflict: "project_id,sort_order", ignoreDuplicates: true },
      );
      if (imageError) throw new Error(`${copy.slug} 이미지 행 저장 실패: ${imageError.message}`);
    }
  }

  const { error: settingsError } = await supabase.from("site_settings").upsert(
    {
      id: 1,
      business_name: settingsCopy.businessName,
      phone: settingsCopy.phone,
      description: settingsCopy.about,
      service_area: settingsCopy.region,
      address: null,
      blog_url: settingsCopy.blogUrl,
    },
    { onConflict: "id", ignoreDuplicates: true },
  );
  if (settingsError) throw new Error(`설정 저장 실패: ${settingsError.message}`);

  console.log(`projects=${projectsCopy.length} images=${images} uploaded=${uploaded} skipped=${skipped}`);
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : "seed failed";
  console.error(message);
  process.exit(1);
});
