import { Link } from "./Link.tsx";

export interface MangaCardInfo {
  name: string;
  id: string;
  thumbnail: string;
}

export function MangaCard({ manga }: {
  manga: MangaCardInfo;
}) {
  return (
    <Link href={`/manga/${manga.id}`}>
      <div class="manga-card" id={manga.id} title={manga.name}>
        <img
          class="manga-card-thumbnail"
          src={manga.thumbnail}
          alt={manga.name}
        />
        <div class="manga-card-info">
          <span class="manga-card-name">{manga.name}</span>
        </div>
      </div>
    </Link>
  );
}
