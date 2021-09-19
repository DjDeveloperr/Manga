import { Home, PopularManga, RecentManga } from "./types.ts";
import { scrape } from "./util.ts";

export async function scrapeHome(): Promise<Home> {
  const $ = await scrape("/");

  const popular: PopularManga[] = [];
  let sel = $(".owl-carousel > .item");
  sel.each((_, e) => {
    if (e.type !== "tag") return;
    const img = e.children.filter((e) => e.type === "tag")[0];
    const urlCont = e.children.filter((e) => e.type === "tag")[1];
    if (urlCont?.type !== "tag" || img?.type !== "tag") {
      return;
    }

    const urlCont2 = urlCont.children.filter((e) => e.type === "tag")[0];
    const urlCont3 = urlCont.children.filter((e) => e.type === "tag")[1];
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
      chapter: parseInt(urlCont3.attribs.title.replaceAll(/\D/g, "").trim()),
    });
  });

  const recent: RecentManga[] = [];
  sel = $(".content-homepage-item");
  sel.each((_, e) => {
    if (e.type !== "tag") return;
    const link = e.children.filter((e) => e.type === "tag")[0];
    const info = e.children.filter((e) => e.type === "tag")[1];

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
        chapter: parseInt(
          (link.attribs.title || "0").split(" ").pop()!.replaceAll(/\D/g, ""),
        ),
        ago: ago.children[0].data?.trim(),
      });
    });

    recent.push({
      id: link.attribs.href.split("/").pop()!,
      name: img.attribs.alt,
      author: author.attribs.title,
      thumbnail: img.attribs.src,
      url: link.attribs.href,
      chapters,
    });
  });

  return { popular, recent };
}
