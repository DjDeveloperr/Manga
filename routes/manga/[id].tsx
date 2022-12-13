import { Handlers, PageProps } from "$fresh/server.ts";
import { fetchManga } from "../../src/manga.ts";
import { Manga as ApiManga } from "../../src/types.ts";
import { MangaView } from "../../views/MangaView.tsx";

export const handler: Handlers<ApiManga> = {
  async GET(_, ctx) {
    const resp = await fetchManga(ctx.params.id);
    return ctx.render(resp);
  },
};

export default function Manga(props: PageProps<ApiManga>) {
  return <MangaView manga={props.data} />;
}
