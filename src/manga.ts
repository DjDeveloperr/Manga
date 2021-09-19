import { Manga, READ_BASE_URL } from "./types.ts";
import { scrape } from "./util.ts";

export async function scrapeManga(id: string): Promise<Manga> {
  const $ = await scrape(READ_BASE_URL + "/" + id);

  const manga: Manga = {
    id,
    title: $(".story-info-right > h1:nth-child(1)").text().trim(),

    description: $("#panel-story-info-description")
      .text()
      .trim()
      .slice("Description :\n".length),

    thumbnail: $(".info-image > img:nth-child(1)").attr("src")!,

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

    views: parseInt(
      $(".story-info-right-extent > p:nth-child(2) > span:nth-child(2)")
        .text()
        .trim()
        .replaceAll(/\D/g, ""),
    ) ?? 0,

    rating: $("#rate_row_cmd > em:nth-child(1)")
      .text()
      .replaceAll("\n", "")
      .split(".comrate :")
      .pop()!
      .trim(),

    chapters: $(".row-content-chapter")
      .text()
      .trim()
      .split("\n\n\n")
      .map((e) => {
        let s = e.split("\n").map((e) => e.trim());
        let c: any = {};
        c.title = s[0];

        // if (c.title.includes("Vol") || c.title.includes("Chapter")) {
        //   if (c.title.includes("Vol")) {
        //     let match = c.title.match(/Vol(\.)?\d+/);
        //     if (match) {
        //       c.volume = parseInt(match[0].replaceAll(/\D/g, "").trim()) ??
        //         undefined;
        //     }
        //   }
        //   if (c.title.includes("Chapter")) {
        //     let match = c.title.match(/Chapter \d+/);
        //     if (match) {
        //       c.chapter = parseInt(match[0].replaceAll(/\D/g, "").trim()) ??
        //         undefined;
        //     }
        //   }
        //   if (c.title.includes(":")) {
        //     let spl = c.title.split(":");
        //     spl.shift();
        //     c.title = spl.join(":").trim();
        //   }
        // }
        c.views = parseInt(s[1]?.replaceAll(/\D/g, "").trim()) ?? 0;
        c.uploaded = s[2];
        return c;
      }),
  };

  return manga;
}
