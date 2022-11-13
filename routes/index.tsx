import App from "../components/App.tsx";
import { MainView } from "../components/MainView.tsx";
import { MainViewBlock } from "../components/MainViewBlock.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import { scrapeHome, Home as MangaHome } from "../src/mod.ts";
import { HScroll } from "../components/HScroll.tsx";
import { PopularMangaCard } from "../components/MangaCard.tsx";
import { Genre } from "../src/advanced_search.ts";
import { Link } from "../components/Link.tsx";

export const handler: Handlers<MangaHome> = {
  async GET(_, ctx) {
    const resp = await scrapeHome();
    return ctx.render(resp);
  },
};

export default function Home({ data }: PageProps<MangaHome>) {
  return (
    <App>
      <MainView title="Home">
        <MainViewBlock id="popular" title="Popular">
          <HScroll>
            {data.popular.map((manga) => (
              <PopularMangaCard manga={manga} />
            ))}
          </HScroll>
        </MainViewBlock>
        <MainViewBlock id="recent" title="Recent">
          <HScroll>
            {data.recent.map((manga) => (
              <PopularMangaCard manga={manga} />
            ))}
          </HScroll>
        </MainViewBlock>
        <MainViewBlock id="genres" title="Browse by Genre">
          {Object.keys(Genre).filter(e => typeof Genre[e as keyof typeof Genre] === "number").map(
            (genre) => (
              <Link href={`/browse/${genre}`}>
                <div class="genre">{genre}</div>
              </Link>
            ))}
        </MainViewBlock>
      </MainView>
    </App>
  );
}
