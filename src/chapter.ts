import { ChapterPage, READ_BASE_URL } from "./types.ts";
import { scrape } from "./util.ts";

export async function scrapeChapter(
  id: string,
  chapter: string,
): Promise<ChapterPage[]> {
  const $ = await scrape(`${READ_BASE_URL}/${id}/${chapter}`);

  const pages: ChapterPage[] = [];
  const sel = $(".container-chapter-reader").children("img");
  sel.each((_, e) => {
    if (e.type == "tag") {
      pages.push({
        number: (e.attribs.title ?? "").match(/page \d+/)
          ? parseInt(
            (e.attribs.title ?? "")
              .match(/page \d+/)![0]
              .replaceAll(/\D/g, ""),
          )
          : 0,
        title: (e.attribs.title ?? "")
          .replaceAll("- MangaNelo.com", "")
          .replaceAll("- MangaNato.com", "")
          .trim(),
        url: e.attribs.src,
        proxyURL: `https://manga-proxy.deno.dev/?q=${
          encodeURIComponent(e.attribs.src)
        }`,
      });
    }
  });

  return pages;
}
