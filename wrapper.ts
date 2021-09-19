import { ChapterPage, Home, Manga, SearchResult } from "./src/types.ts";

export const API_BASE = "https://manga.deno.dev/api";

export async function request<T = any>(
  path: string,
  params: Record<string, any>,
): Promise<T> {
  let url = API_BASE + path;
  const query = Object.entries(params);
  if (query.length !== 0) {
    url += "?";
    url += query
      .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
      .join("&");
  }

  const r = await fetch(url);
  return await r.json();
}

export async function home() {
  const data = await request<Home>("/home", {});
  return data;
}

export async function search(q: string) {
  const data = await request<SearchResult[]>("/search", { q });
  return data;
}

export async function fetchManga(name: string) {
  const data = await request<Manga>("/manga", { id: name });
  return data;
}

export async function fetchChapter(manga: string, number: number) {
  const data = await request("/chapter", { id: manga, chapter: number }).then(
    (e) => e.pages as ChapterPage[],
  );
  return data;
}
