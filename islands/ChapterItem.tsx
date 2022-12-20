import { MaterialIcon } from "../components/MaterialIcon.tsx";
import { Manga, MangaChapter } from "../src/types.ts";

export default function ChapterItem({ chapter, manga }: {
  chapter: MangaChapter;
  manga: Manga;
}) {
  return (
    <div
      class="chapter"
      onClick={() => location.href = `/manga/${manga.id}/${chapter.id}`}
    >
      <h3 class="chapter-title">{chapter.title}</h3>
      <div class="chapter-info">
        <span class="chapter-views">
          <MaterialIcon
            extendClass="chapter-icon"
            icon="visibility"
          />{" "}
          {chapter.views}
        </span>
        <span class="chapter-date">
          <MaterialIcon
            extendClass="chapter-icon"
            icon="calendar_month"
          />{" "}
          {chapter.uploaded}
        </span>
      </div>
    </div>
  );
}
