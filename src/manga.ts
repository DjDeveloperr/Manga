import { Manga, READ_BASE_URL } from "./types.ts";
import { assertTag, scrape } from "./util.ts";
import { cheerio } from "../deps.ts";

export async function fetchManga(id: string): Promise<Manga> {
  const $ = await scrape(READ_BASE_URL + "/" + id);

  const manga: Manga = {
    id,
    title: $(".story-info-right > h1:nth-child(1)").text().trim(),

    description: $("#panel-story-info-description")
      .text()
      .trim()
      .slice("Description :\n".length),

    thumbnail: $(".info-image > img:nth-child(1)").attr("src")!,

    alternative: $(
      ".variations-tableInfo > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2)",
    )
      .text()
      .trim(),

    authors: $(
      ".variations-tableInfo > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(2)",
    )
      .text()
      .trim(),

    status: $(
      ".variations-tableInfo > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(2)",
    )
      .text()
      .trim(),

    genres: $(
      ".variations-tableInfo > tbody:nth-child(1) > tr:nth-child(4) > td:nth-child(2)",
    )
      .text()
      .trim()
      .split("-")
      .map((e) => e.trim()),

    lastUpdated: $(
      ".story-info-right-extent > p:nth-child(1) > span:nth-child(2)",
    )
      .text()
      .trim(),

    views: $(".story-info-right-extent > p:nth-child(2) > span:nth-child(2)")
      .text()
      .trim(),

    rating: $("#rate_row_cmd > em:nth-child(1)")
      .text()
      .replaceAll("\n", "")
      .split(".comrate :")
      .pop()!
      .trim(),

    chapters: [],
  };

  $(".row-content-chapter").children(".a-h").each((_, e) => {
    assertTag(e);
    const children = e.children.filter((e) => e.type === "tag");
    const link = children[0] as cheerio.Element;
    const viewsE = children[1] as cheerio.Element;
    const uploadedE = children[2] as cheerio.Element;
    assertTag(link);
    assertTag(viewsE);
    assertTag(uploadedE);
    const title = (link.firstChild! as any).data! ?? "";
    const url = link.attribs.href;
    const views = (viewsE.firstChild! as any).data!.trim();
    const uploaded = ((uploadedE.firstChild! as any).data) ?? "";
    manga.chapters.push({
      id: url.split("/").pop()!,
      title,
      views,
      uploaded,
    });
  });

  return manga;
}
