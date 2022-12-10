import { Handlers, PageProps } from "$fresh/server.ts";
import { Home as MangaHome, scrapeHome } from "../src/mod.ts";
import { HomeView } from "../views/HomeView.tsx";

export const handler: Handlers<MangaHome> = {
  async GET(_, ctx) {
    const resp = await scrapeHome();
    return ctx.render(resp);
  },
};

export default function Home({ data }: PageProps<MangaHome>) {
  return <HomeView home={data} />;
}
