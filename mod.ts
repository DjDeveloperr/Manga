import { json, serve, html } from "./deps.ts";
import { scrapeChapter, scrapeHome, scrapeManga, search } from "./src/mod.ts";

function html(title: string, str: string) {
  return new Response(`<!DOCTYPE HTML>
<html lang="en-US">
  <head>
    <meta charset="utf-8" />
    <title>${title}</title>
    <style>
      body {
        background-color: black;
        color: white;
        font: sans-serif;
      }
    </style>
  </head>
  <body>
    <h2>Manga Reader</h2>
    ${str}
  </body>
</html>`, {
    headers: {
      "content-type": "text/html; charset=UTF-8",
    },
  });
}

serve({
  "/": () => scrapeHome().then(home => html("Home", `<h3>Popular Manga</h3><ul>${
    home.popular.map(manga => `<li><a href="/manga/${manga.id}">${manga.name}</a></li>`)
  }</ul>`)),
  "/api": () =>
    json({
      endpoints: [
        {
          name: "Home - Popular and Recent Mangas",
          path: "/api/home",
        },
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
            id: "Manga ID",
          },
        },
        {
          name: "Get Chapter Pages",
          path: "/api/chapter",
          params: {
            chapter: "Chapter ID",
            id: "Manga ID",
          },
        },
      ],
    }),

  "/api/home": async (_) => {
    const home = await scrapeHome();
    return json(home as any);
  },

  "/api/search": async (req) => {
    const q = new URL(req.url).searchParams;
    const name = q.get("q");
    if (!name) {
      return json({ error: "Name not present in query" }, { status: 400 });
    }

    return json(
      await search(name) as any,
    );
  },

  "/api/manga": async (req) => {
    const q = new URL(req.url).searchParams;
    const id = q.get("id");
    if (!id) {
      return json({ error: "ID not present in query" }, {
        status: 404,
      });
    }

    const manga = await scrapeManga(id);
    return json(manga as any);
  },

  "/api/chapter": async (req) => {
    const q = new URL(req.url).searchParams;
    const chapter = q.get("chapter");
    const manga = q.get("id");
    if (!chapter || !manga) {
      return json({ error: "Chapter ID or Manga ID not present in query" }, {
        status: 404,
      });
    }

    return json(await scrapeChapter(manga, chapter) as any);
  },
});
