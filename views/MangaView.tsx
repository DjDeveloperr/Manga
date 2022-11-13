import App from "../components/App.tsx";
import { MainView } from "../components/MainView.tsx";
import { Manga as ApiManga } from "../src/types.ts";

export function MangaView(
  { manga }: { manga: ApiManga },
) {
  return (
    <App>
      <MainView title="Manga">
        <h1>{manga.title}</h1>
      </MainView>
    </App>
  )
}
