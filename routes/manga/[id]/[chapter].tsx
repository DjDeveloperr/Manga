import { Handlers, PageProps } from "$fresh/server.ts";
import { fetchChapter } from "../../../src/chapter.ts";
import { fetchManga } from "../../../src/manga.ts";
import type { ChapterPage, Manga } from "../../../src/types.ts";
import { ChapterView } from "../../../views/ChapterView.tsx";

export interface MangaAndChapter {
  chapterID: string;
  manga: Manga;
  chapter: ChapterPage[];
}

export const handler: Handlers<MangaAndChapter> = {
  async GET(_, ctx) {
    const manga = await fetchManga(ctx.params.id);
    const chapter = await fetchChapter(ctx.params.id, ctx.params.chapter);
    return ctx.render({ manga, chapter, chapterID: ctx.params.chapter });
  },
};

export default function Manga(props: PageProps<MangaAndChapter>) {
  return (
    <ChapterView
      chapterID={props.data.chapterID}
      manga={props.data.manga}
      chapter={props.data.chapter}
    />
  );
}
