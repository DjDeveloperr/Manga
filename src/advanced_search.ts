import { cheerio } from "../deps.ts";
import { AdvancedSearchResult } from "./types.ts";
import { scrape } from "./util.ts";

export enum Genre {
  Action = 2,
  Adult = 3,
  Adventure = 4,
  Comedy = 6,
  Cooking = 7,
  Doujinshi = 9,
  Drama = 10,
  Ecchi = 11,
  Erotica = 48,
  Fantasy = 12,
  GenderBender = 13,
  Harem = 14,
  Historical = 15,
  Horror = 16,
  Isekai = 45,
  Josei = 17,
  Manhua = 44,
  Manhwa = 43,
  MartialArts = 19,
  Mature = 20,
  Mecha = 21,
  Medical = 22,
  Mystery = 24,
  OneShot = 25,
  Pornographic = 47,
  Psychological = 26,
  Romance = 27,
  SchoolLife = 28,
  SciFi = 29,
  Seinen = 30,
  Shoujo = 31,
  SoujoAi = 32,
  Shounen = 33,
  ShounenAi = 34,
  SliceOfLife = 35,
  Smut = 36,
  Sports = 37,
  Supernatural = 38,
  Tragedy = 39,
  Webtoons = 40,
  Yaoi = 41,
  Yuri = 42,
}

export enum OrderBy {
  LatestUpdates,
  TopView,
  NewManga,
  AZ,
}

export enum Status {
  OngoingAndComplete,
  Ongoing,
  Completed,
}

export enum Keywords {
  Everything,
  NameTitle,
  AlternativeName,
  Author,
}

export interface AdvancedSearchOptions {
  included?: Genre[];
  excluded?: Genre[];
  orderBy?: OrderBy;
  status?: Status;
  keyword?: Keywords;
  query?: string;
  page?: number;
}

export async function advancedSearch(options: AdvancedSearchOptions = {}) {
  const params = new URLSearchParams({
    s: "all",
    page: (options.page ?? 1).toString(),
  });

  if (options.included?.length) {
    params.set("g_i", `_${options.included.join("_")}_`);
  }

  if (options.excluded?.length) {
    params.set("g_e", `_${options.excluded.join("_")}_`);
  }

  if (
    options.orderBy !== undefined && options.orderBy !== OrderBy.LatestUpdates
  ) {
    let v: string;
    switch (options.orderBy) {
      case OrderBy.TopView:
        v = "topview";
        break;

      case OrderBy.NewManga:
        v = "newest";
        break;

      case OrderBy.AZ:
        v = "az";
        break;
    }
    params.set("orby", v!);
  }

  if (
    options.status !== undefined && options.status !== Status.OngoingAndComplete
  ) {
    let v: string;
    switch (options.status) {
      case Status.Ongoing:
        v = "ongoing";
        break;

      case Status.Completed:
        v = "completed";
        break;
    }
    params.set("sts", v!);
  }

  if (options.query) {
    params.set("keyw", options.query);

    if (
      options.keyword !== undefined && options.keyword !== Keywords.Everything
    ) {
      switch (options.keyword) {
        case Keywords.NameTitle:
          params.set("keyt", "title");
          break;

        case Keywords.Author:
          params.set("keyt", "author");
          break;

        case Keywords.AlternativeName:
          params.set("keyt", "alternative");
          break;
      }
    }
  }

  const $ = await scrape(
    `/advanced_search?${params.toString()}`,
  );

  const results: AdvancedSearchResult[] = [];

  $(".content-genres-item").each((_, e) => {
    const tags = e.childNodes.filter((e) => e.type === "tag");
    const l = tags[0] as cheerio.Element;
    const r = tags[1] as cheerio.Element;

    const ltags = l.childNodes.filter((e) => e.type === "tag");
    const rtags = r.childNodes.filter((e) => e.type === "tag");

    const li = ltags[0] as cheerio.Element;
    const le = ltags[1] as cheerio.Element;

    const rt = rtags[0] as cheerio.Element;
    const ra = rtags[1] as cheerio.Element;
    const rp = rtags[2] as cheerio.Element;
    const rd = rtags[3] as cheerio.Element;

    const rptags = rp.childNodes.filter((e) => e.type === "tag");
    const rpv = rptags[0] as cheerio.Element;
    const rpd = rptags[1] as cheerio.Element;
    const rpa = rptags[2] as cheerio.Element;

    const result: any = {};

    const url = l.attribs.href;
    result.id = url.split("/").pop()!;
    result.title = (rt.firstChild as any).firstChild.data.trim();
    result.description = (rd.firstChild as any).data.trim();
    result.views = (rpv.firstChild as any).data.trim();
    result.lastUpdated = (rpd.firstChild as any).data.trim();
    result.author = (rpa.firstChild as any).data.trim();
    result.latestChapter = {
      id: (ra.attribs.href as string).split("/").pop()!,
      title: (ra.firstChild as any).data,
    };
    result.thumbnail = li.attribs.src;
    result.rating = le.children[0]
      ? parseFloat((le.children[0] as any).data)
      : null;
    result.url = url;

    results.push(result);
  });

  return results;
}

console.log(
  await advancedSearch({
    included: [Genre.Ecchi],
  }),
);
