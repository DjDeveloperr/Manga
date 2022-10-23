export const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0";

export const BASE_URL = "https://manganato.com";
export const READ_BASE_URL = "https://readmanganato.com";

export interface RecentMangaChapter {
  id: string;
  chapter: string;
  ago: string;
}

export interface RecentManga {
  id: string;
  name: string;
  url: string;
  author: string;
  thumbnail: string;
  chapters: RecentMangaChapter[];
}

export interface PopularManga {
  id: string;
  name: string;
  url: string;
  thumbnail: string;
  chapterId: string;
  chapter: string;
}

export interface Home {
  popular: PopularManga[];
  recent: RecentManga[];
}

export interface SearchResult {
  id: string;
  name: string;
  lastChapter: string;
  thumbnail: string;
  author: string;
  url: string;
}

export interface Manga {
  id: string;
  title: string;
  alternative: string;
  description: string;
  thumbnail: string;
  authors: string;
  status: string;
  genres: string[];
  lastUpdated: string;
  views: string;
  rating: string;
  chapters: MangaChapter[];
}

export interface MangaChapter {
  id: string;
  title: string;
  // chapter: number;
  // vol: number;
  views: string;
  uploaded: string;
}

export interface ChapterPage {
  number: number;
  title: string;
  url: string;
  proxyURL: string;
}

export interface AdvancedSearchResult {
  id: string;
  title: string;
  description: string;
  views: string;
  lastUpdated: string;
  author: string;
  latestChapter: {
    id: string;
    title: string;
  };
  thumbnail: string;
  rating: number | null;
  url: string;
}
