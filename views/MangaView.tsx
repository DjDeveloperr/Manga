import App from "../components/App.tsx";
import { Link } from "../components/Link.tsx";
import { MainView } from "../components/MainView.tsx";
import { MainViewBlock } from "../components/MainViewBlock.tsx";
import { Manga as ApiManga } from "../src/types.ts";

export function MangaView(
  { manga }: { manga: ApiManga },
) {
  return (
    <App>
      <MainView title={manga.title}>
        <div class="manga-header">
          <img
            class="manga-thumbnail"
            alt={manga.title}
            src={manga.thumbnail}
          />
          <div class="manga-info">
            <p class="manga-info-field">By {manga.authors}</p>
            <p class="manga-info-field">Alt: {manga.alternative}</p>
            <p class="manga-info-field">Status: {manga.status}</p>
            <p class="manga-info-field">Genres: {manga.genres.join(", ")}</p>
            <p class="manga-info-field">Rating: {manga.rating}</p>
            <p class="manga-info-field">Views: {manga.views}</p>
          </div>
        </div>
        <MainViewBlock title="Description" id="description">
          <p class="manga-description">{manga.description}</p>
        </MainViewBlock>
        <MainViewBlock title="Chapters" id="chapters">
          <table class="chapters" style="whitespace: no-wrap;">
            <thead>
              <tr>
                <th class="chapter-title" style="text-align: left">Title</th>
                <th class="chapter-views" style="text-align: right">Views</th>
                <th class="chapter-date" style="text-align: right">Date</th>
              </tr>
            </thead>
            <tbody>
              {manga.chapters.map((chapter) => (
                <tr>
                  <td class="chapter-title" style="text-align: left">
                    <Link href={`/manga/${manga.id}/${chapter.id}`}>
                      {chapter.title}
                    </Link>
                  </td>
                  <td
                    class="chapter-views"
                    style="text-align: right; width: auto"
                  >
                    {chapter.views}
                  </td>
                  <td
                    class="chapter-date"
                    style="text-align: right; width: auto"
                  >
                    {chapter.uploaded}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </MainViewBlock>
      </MainView>
    </App>
  );
}
