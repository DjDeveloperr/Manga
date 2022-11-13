import { Genre } from "../src/advanced_search.ts";
import { Home } from "../src/types.ts";
import App from "../components/App.tsx";
import { HScroll } from "../components/HScroll.tsx";
import { Link } from "../components/Link.tsx";
import { MainView } from "../components/MainView.tsx";
import { MainViewBlock } from "../components/MainViewBlock.tsx";
import { PopularMangaCard } from "../components/MangaCard.tsx";

export function HomeView(
  { home }: { home: Home }
) {
  return (
    <App>
      <MainView title="Home">
        <MainViewBlock id="popular" title="Popular">
          <HScroll>
            {home.popular.map((manga) => (
              <PopularMangaCard manga={manga} />
            ))}
          </HScroll>
        </MainViewBlock>
        <MainViewBlock id="recent" title="Recent">
          <HScroll>
            {home.recent.map((manga) => (
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
  )
}
