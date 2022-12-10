import App from "../components/App.tsx";
import { MainView } from "../components/MainView.tsx";
import { ChapterPage } from "../src/types.ts";

export function ChapterView(
  { chapter }: { chapter: ChapterPage[] },
) {
  return (
    <App>
      <MainView title="Manga Reader" hiddenTitle>
        {chapter.map((page) => (
          <img class="page" alt={page.title} src={page.proxyURL} />
        ))}
      </MainView>
    </App>
  );
}
