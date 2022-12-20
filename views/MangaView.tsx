import App from "../components/App.tsx";
import { Link } from "../components/Link.tsx";
import { MainView } from "../components/MainView.tsx";
import { MainViewBlock } from "../components/MainViewBlock.tsx";
import { MaterialIcon } from "../components/MaterialIcon.tsx";
import ChapterItem from "../islands/ChapterItem.tsx";
import { Manga as ApiManga } from "../src/types.ts";

export function MangaView(
  { manga }: { manga: ApiManga },
) {
  return (
    <App>
      <div class="manga-header-mobile">
        <div
          class="manga-header-mobile-image"
          style={`background-image: url("${manga.thumbnail}");`}
        >
        </div>
        <div class="manga-header-mobile-content">
          <div class="manga-header-mobile-content-bg"></div>
          <h2 class="mhm-field">{manga.title}</h2>
          <h3 class="mhm-field" style="font-weight: lighter">
            By {manga.authors}
          </h3>
          <p class="mhm-field" style="padding: 10px">
            {manga.genres.join(", ")}
          </p>
          <Link
            extendClass="manga-read-btn-mobile mhm-field"
            href={`/manga/${manga.id}/${
              manga.chapters[manga.chapters.length - 1].id
            }`}
          >
            Read
          </Link>
          <MaterialIcon
            icon="arrow_forward_ios"
            extendClass="read-more mhm-field no-select"
          />
          <img
            class="manga-header-mobile-thumbnail mhm-field"
            alt={manga.title}
            src={manga.thumbnail}
          />
        </div>
      </div>
      <MainView title={manga.title} hiddenTitle>
        <div class="manga-header-desktop">
          <h1>{manga.title}</h1>
        </div>
        <div class="manga-header-desktop">
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
            <Link
              extendClass="manga-read-btn"
              href={`/manga/${manga.id}/${
                manga.chapters[manga.chapters.length - 1].id
              }`}
            >
              Read
            </Link>
          </div>
        </div>
        <div class="manga-fields-mobile">
          <div class="manga-field">
            <div class="manga-field-title">Status</div>
            <div class="manga-field-value">{manga.status}</div>
          </div>
          <div class="manga-field">
            <div class="manga-field-title">Rating</div>
            <div class="manga-field-value">
              {manga.rating.split("-")[0].trim()}
            </div>
          </div>
          <div class="manga-field">
            <div class="manga-field-title">Views</div>
            <div class="manga-field-value">{manga.views}</div>
          </div>
        </div>
        <MainViewBlock title="Description" id="description">
          <p class="manga-description">{manga.description}</p>
        </MainViewBlock>
        <MainViewBlock title="Chapters" id="chapters">
          <div class="chapters">
            {manga.chapters.map((chapter) => (
              <ChapterItem chapter={chapter} manga={manga} />
            ))}
          </div>
        </MainViewBlock>
      </MainView>
    </App>
  );
}
