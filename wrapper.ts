export const API_BASE = "https://manga.deno.dev/api";

export async function request<T = any>(
  path: string,
  params: Record<string, any>
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

export interface MangaSearchResult {
  id: string;
  name: string;
  nameUnsigned: string;
  lastChapter: string;
  image: string;
  author: string;
  storyLink: string;
  fetch: () => Promise<MangaInfo>;
}

export async function search(q: string) {
  const data = await request<MangaSearchResult[]>("/search", { q });
  data.forEach((e) => {
    e.fetch = () => {
      return fetchManga(e.nameUnsigned);
    };
  });
  return data;
}

export interface MangaChapter {
  title: string;
  chapter: number;
  volume?: number;
  views: number;
  uploaded: string;
  fetch: () => Promise<PageInfo[]>;
}

export interface MangaInfo {
  title: string;
  description: string;
  thumbnail: string;
  authors: string;
  status: string;
  genres: string[];
  updated: string;
  views: number;
  rating: string;
  chapters: MangaChapter[];
}

export async function fetchManga(name: string) {
  const data = await request<MangaInfo>("/manga", { name });
  data.chapters.forEach((e) => {
    e.fetch = () => {
      return fetchChapter(name, e.chapter);
    };
  });
  return data;
}

export interface PageInfo {
  title: string;
  src: string;
  number: number;
}

export async function fetchChapter(manga: string, number: number) {
  const data = await request("/chapter", { manga, number }).then(
    (e) => e.pages as PageInfo[]
  );
  return data;
}
