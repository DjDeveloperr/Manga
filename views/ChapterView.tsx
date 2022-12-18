import App from "../components/App.tsx";
import { Link } from "../components/Link.tsx";
import { MainView } from "../components/MainView.tsx";
import { MaterialIcon } from "../components/MaterialIcon.tsx";
import { ChapterPage, Manga } from "../src/types.ts";

export function ChapterView(
  { chapterID, chapter, manga }: {
    chapterID: string;
    chapter: ChapterPage[];
    manga: Manga;
  },
) {
  const chIndex = manga.chapters.findIndex((ch) => ch.id === chapterID);
  const prevChapter = manga.chapters[chIndex + 1];
  const nextChapter = manga.chapters[chIndex - 1];
  return (
    <App>
      <MainView
        title={manga.chapters[chIndex].title}
      >
        {chapter.map((page) => (
          <img
            class="page"
            alt={page.title}
            src={page.proxyURL}
            loading="lazy"
          />
        ))}
        <div class="chapter-nav">
          {prevChapter
            ? (
              <Link
                extendClass="chapter-nav-btn"
                href={`/manga/${manga.id}/${prevChapter.id}`}
              >
                <MaterialIcon icon="arrow_back_ios" /> Prev Chapter
              </Link>
            )
            : null}
          {nextChapter
            ? (
              <Link
                extendClass="chapter-nav-btn"
                href={`/manga/${manga.id}/${nextChapter.id}`}
              >
                Next Chapter <MaterialIcon icon="arrow_forward_ios" />
              </Link>
            )
            : null}
        </div>
      </MainView>
    </App>
  );
}
