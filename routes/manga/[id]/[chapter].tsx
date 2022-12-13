import { Handlers, PageProps } from "$fresh/server.ts";
import { fetchChapter } from "../../../src/chapter.ts";
import { ChapterPage } from "../../../src/types.ts";
import { ChapterView } from "../../../views/ChapterView.tsx";

export const handler: Handlers<ChapterPage[]> = {
  async GET(_, ctx) {
    const resp = await fetchChapter(ctx.params.id, ctx.params.chapter);
    return ctx.render(resp);
  },
};

export default function Manga(props: PageProps<ChapterPage[]>) {
  return <ChapterView chapter={props.data} />;
}
