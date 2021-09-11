import { json, serve } from "./deps.ts";
import { cheerio } from "https://deno.land/x/cheerio@1.0.2/mod.ts";

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0";

serve({
  "/": () =>
    json({
      endpoints: [
        {
          name: "Search for Manga",
          path: "/api/search",
          params: {
            q: "Query for search",
          },
        },
        {
          name: "Get Manga info (including chapters)",
          path: "/api/manga",
          params: {
            name: "Manga's Unsigned name (obtained from search)",
          },
        },
        {
          name: "Get Chapter info (including pages)",
          path: "/api/chapter",
          params: {
            number: "Chapter number",
            manga: "Manga's Unsigned name (obtained from search)",
          },
        },
      ],
    }),
  "/api/popular": async (_) => {
    const html = await fetch("https://manganato.com", {
      headers: {
        "User-Agent": USER_AGENT,
      },
    }).then((e) => e.text());
    const $ = cheerio.load(html);
    const popular: any[] = [];
    const sel = $(".owl-carousel > .item");
    sel.each((_, e) => {
      if (e.type !== "tag") return popular.push("err: e not tag");
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
        name: img.attribs.alt,
        thumbnail: img.attribs.src,
        url: link.attribs.href,
        chapter: parseInt(urlCont3.attribs.title.replaceAll(/\D/g, "").trim()),
      });
    });
    return json(popular as any);
  },
  "/api/home": async (_) => {
    const html = await fetch("https://manganato.com", {
      headers: {
        "User-Agent": USER_AGENT,
      },
    }).then((e) => e.text());
    const $ = cheerio.load(html);
    const popular: any[] = [];
    let sel = $(".owl-carousel > .item");
    sel.each((_, e) => {
      if (e.type !== "tag") return popular.push("err: e not tag");
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
        name: img.attribs.alt,
        thumbnail: img.attribs.src,
        url: link.attribs.href,
        chapter: parseInt(urlCont3.attribs.title.replaceAll(/\D/g, "").trim()),
      });
    });
    const recent: any[] = [];
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
            (link.data || "0").split(" ").pop()!.replaceAll(/\D/g, ""),
          ),
          ago: ago.children[0].data,
        });
      });

      return {
        name: img.attribs.alt,
        author: author.attribs.title,
        thumbnail: img.attribs.src,
        url: link.attribs.href,
        chapters,
      };
    });
    return json({ popular, recent });
  },
  "/api/search": async (req) => {
    const q = new URL(req.url).searchParams;
    const name = q.get("q");
    if (!name) {
      return json({ error: "Name not present in query" }, { status: 400 });
    }

    return json(
      await fetch("https://manganato.com/home_json_search", {
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          "user-agent": USER_AGENT,
        },
        body: `searchword=${encodeURIComponent(name)}`,
      })
        .then((e) => e.json())
        .then((e) =>
          e.map((e: any) => {
            e.name = e.name
              .replace(/\<span( class="[a-zA-Z0-9_\- ]+")?\>/g, "")
              .replace(/\<\/span\>/g, "");
            e.author = e.author
              .replace(/\<span( class="[a-zA-Z0-9_\- ]+")?\>/g, "")
              .replace(/\<\/span\>/g, "");
            e.nameUnsigned = e.nameunsigned;
            delete e.nameunsigned;
            e.storyLink = e.story_link;
            delete e.story_link;
            e.lastChapter = e.lastchapter;
            delete e.lastchapter;
            return e;
          })
        ),
    );
  },
  "/api/manga": async (req) => {
    const q = new URL(req.url).searchParams;
    const name = q.get("name");
    if (!name) {
      return json({ error: "Name not present in query" }, { status: 400 });
    }

    const res = await fetch("https://manganato.com/manga/" + name);
    if (!res.ok) return json({ error: "Manga not found" }, { status: 404 });
    const html = await res.text();
    const $ = cheerio.load(html);
    const manga: any = {};
    manga.title = $(".story-info-right > h1:nth-child(1)").text().trim();
    manga.description = $("#panel-story-info-description")
      .text()
      .trim()
      .slice("Description :\n".length);
    manga.thumbnail = $(".info-image > img:nth-child(1)").attr("src");
    manga.authors = $(
      ".variations-tableInfo > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(2)",
    )
      .text()
      .trim();
    manga.status = $(
      ".variations-tableInfo > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(2)",
    )
      .text()
      .trim();
    manga.genres = $(
      ".variations-tableInfo > tbody:nth-child(1) > tr:nth-child(4) > td:nth-child(2)",
    )
      .text()
      .trim()
      .split("-")
      .map((e) => e.trim());
    manga.updated = $(
      ".story-info-right-extent > p:nth-child(1) > span:nth-child(2)",
    )
      .text()
      .trim();
    manga.views = parseInt(
      $(".story-info-right-extent > p:nth-child(2) > span:nth-child(2)")
        .text()
        .trim()
        .replaceAll(/\D/g, ""),
    ) ?? 0;
    manga.rating = $("#rate_row_cmd > em:nth-child(1)")
      .text()
      .replaceAll("\n", "")
      .split(".comrate :")
      .pop()!
      .trim();

    manga.chapters = $(".row-content-chapter")
      .text()
      .trim()
      .split("\n\n\n")
      .map((e) => {
        let s = e.split("\n").map((e) => e.trim());
        let c: any = {};
        c.title = s[0];
        if (c.title.includes("Vol") || c.title.includes("Chapter")) {
          if (c.title.includes("Vol")) {
            let match = c.title.match(/Vol(\.)?\d+/);
            if (match) {
              c.volume = parseInt(match[0].replaceAll(/\D/g, "").trim()) ??
                undefined;
            }
          }
          if (c.title.includes("Chapter")) {
            let match = c.title.match(/Chapter \d+/);
            if (match) {
              c.chapter = parseInt(match[0].replaceAll(/\D/g, "").trim()) ??
                undefined;
            }
          }
          if (c.title.includes(":")) {
            let spl = c.title.split(":");
            spl.shift();
            c.title = spl.join(":").trim();
          }
        }
        c.views = parseInt(s[1]?.replaceAll(/\D/g, "").trim()) ?? 0;
        c.uploaded = s[2];
        return c;
      });

    return json(manga);
  },
  "/api/chapter": async (req) => {
    const q = new URL(req.url).searchParams;
    const name = q.get("number");
    const manga = q.get("manga");
    if (!name) {
      return json({ error: "Name not present in query" }, { status: 400 });
    }

    const res = await fetch(
      "https://manganato.com/chapter/" + manga + "/chapter_" + name,
    );
    if (!res.ok) return json({ error: "Manga not found" }, { status: 404 });
    const html = await res.text();
    const $ = cheerio.load(html);
    const chapter: any = { pages: [] };
    const pages = $(".container-chapter-reader").children("img");
    pages.each((i, e) => {
      if (e.type == "tag") {
        chapter.pages.push({
          number: (e.attribs.title ?? "").match(/page \d+/)
            ? parseInt(
              (e.attribs.title ?? "")
                .match(/page \d+/)![0]
                .replaceAll(/\D/g, ""),
            )
            : 0,
          title: (e.attribs.title ?? "")
            .replaceAll(" - MangaNelo.com", "")
            .trim(),
          src: e.attribs.src,
        });
      }
    });
    return json(chapter);
  },
});
