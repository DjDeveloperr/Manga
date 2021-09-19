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

export function home() {
  return request<Home>("/home", {});
}

export function search(q: string) {
  return request<SearchResult[]>("/search", { q });
}

export function manga(name: string) {
  return request<Manga>("/manga", { id: name });
}

export function chapter(manga: string, number: number) {
  return request<ChapterPage[]>("/chapter", { id: manga, chapter: number });
}
