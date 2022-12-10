import { MangaCard, MangaCardInfo } from "./MangaCard.tsx";

export function MangaCardGrid({ mangas }: { mangas: MangaCardInfo[] }) {
  return (
    <div className="manga-card-grid">
      {mangas.map((manga) => <MangaCard manga={manga} />)}
    </div>
  );
}
