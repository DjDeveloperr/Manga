import { Handlers, PageProps } from "$fresh/server.ts";
import {
  advancedSearch,
  AdvancedSearchData,
  fetchHome,
  Home as MangaHome,
  OrderBy,
} from "../src/mod.ts";
import { HomeView } from "../views/HomeView.tsx";

export interface HomeData {
  main: MangaHome;
  topViewed: AdvancedSearchData;
}

export const handler: Handlers<HomeData> = {
  async GET(_, ctx) {
    const main = await fetchHome();
    const topViewed = await advancedSearch({
      orderBy: OrderBy.TopView,
    });
    return ctx.render({
      main,
      topViewed,
    });
  },
};

export default function Home({ data }: PageProps<HomeData>) {
  return <HomeView home={data} />;
}
