import { Genre } from "../src/advanced_search.ts";
import App from "../components/App.tsx";
import { HScroll } from "../components/HScroll.tsx";
import { Link } from "../components/Link.tsx";
import { MainView } from "../components/MainView.tsx";
import { MainViewBlock } from "../components/MainViewBlock.tsx";
import { MangaCard } from "../components/MangaCard.tsx";
import type { HomeData } from "../routes/index.tsx";

export function HomeView(
  { home }: { home: HomeData },
) {
  return (
    <App active="Home">
      <MainView title="Home">
        <MainViewBlock id="popular" title="Top Viewed">
          <HScroll>
            {home.topViewed.results.map((manga) => (
              <MangaCard
                manga={{
                  id: manga.id,
                  name: manga.title,
                  thumbnail: manga.thumbnail,
                }}
              />
            ))}
          </HScroll>
        </MainViewBlock>
        <MainViewBlock id="popular" title="Popular">
          <HScroll>
            {home.main.popular.map((manga) => <MangaCard manga={manga} />)}
          </HScroll>
        </MainViewBlock>
        <MainViewBlock id="recent" title="Recent">
          <HScroll>
            {home.main.recent.map((manga) => <MangaCard manga={manga} />)}
          </HScroll>
        </MainViewBlock>
        <MainViewBlock id="genres" title="Browse by Genre">
          {Object.keys(Genre).filter((e) =>
            typeof Genre[e as keyof typeof Genre] === "number"
          ).map(
            (genre) => (
              <Link href={`/browse?included=${genre}`}>
                <div class="genre">{genre}</div>
              </Link>
            ),
          )}
        </MainViewBlock>
      </MainView>
    </App>
  );
}
