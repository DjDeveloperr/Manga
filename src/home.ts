import { Home, PopularManga, RecentManga } from "./types.ts";
import { scrape } from "./util.ts";

export async function scrapeHome(): Promise<Home> {
  const $ = await scrape("/");

  const popular: PopularManga[] = [];
  let sel = $(".owl-carousel > .item");
  sel.each((_, e) => {
    if (e.type !== "tag") return;
    const echildren = e.children.filter((e) => e.type === "tag");
    const [img, urlCont] = echildren;
    if (urlCont?.type !== "tag" || img?.type !== "tag") {
      return;
    }

    const [urlCont2, urlCont3] = urlCont.children.filter((e) =>
      e.type === "tag"
    );
    if (urlCont2?.type !== "tag" || urlCont3?.type !== "tag") {
      return;
    }

    const link = urlCont2.children.filter((e) => e.type === "tag")[0];
    if (link?.type !== "tag") return;
    popular.push({
      id: link.attribs.href.split("/").pop()!,
      name: img.attribs.alt,
      thumbnail: img.attribs.src,
      url: link.attribs.href,
      chapterId: urlCont3.attribs.href.split("/").pop()!,
      chapter: urlCont3.attribs.title,
    });
  });

  const recent: RecentManga[] = [];
  sel = $(".content-homepage-item");
  sel.each((_, e) => {
    if (e.type !== "tag") return;
    const [link, info] = e.children.filter((e) => e.type === "tag");

    if (link?.type !== "tag" || info?.type !== "tag") return;
    const img = link.children.filter((e) => e.type === "tag")[0];
    if (img?.type !== "tag") return;

    const author = info.children.filter((e) => e.type === "tag")[1];
    if (author?.type !== "tag") return;

    const chapters: any[] = [];

    info.children.filter((e) =>
      e.type === "tag" && e.tagName.toLowerCase() === "p"
    ).forEach((el) => {
      if (el.type !== "tag") return;
      const link = el.children.filter((e) => e.type === "tag")[0];
      const ago = el.children.filter((e) => e.type === "tag")[1];
      if (link?.type !== "tag" || ago?.type !== "tag") return;

      chapters.push({
        id: link.attribs.href.split("/").pop()!,
        chapter: link.attribs.title.trim(),
        ago: (ago.children[0] as any).data?.trim(),
      });
    });

    recent.push({
      id: link.attribs.href.split("/").pop()!,
      name: img.attribs.alt,
      author: (author.firstChild as any).data.split(",").map((
        e: string,
      ) => e.trim()).join(", "),
      thumbnail: img.attribs.src,
      url: link.attribs.href,
      chapters,
    });
  });

  return { popular, recent };
}
