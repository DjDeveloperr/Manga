import { json, serve } from "./deps.ts";
import { advancedSearch } from "./src/advanced_search.ts";
import { scrapeChapter, scrapeHome, scrapeManga, search } from "./src/mod.ts";

function html(title: string, str: string) {
  return new Response(
    `<!DOCTYPE HTML>
<html lang="en-US">
  <head>
    <meta charset="utf-8" />
    <title>${title}</title>
    <style>
      body {
        font: sans-serif;
      }
    </style>
  </head>
  <body>
    <h2 onclick="location.href = '/';">Manga Reader</h2>
    <input id="search" type="text" placeholder="Search..." /> <button onclick="search()">Search</button>
    ${str}
    <script>
    function search() {
      const el = document.getElementById('search');
      const newpath = '/search?q=' + encodeURIComponent(el.value || '');
      location.href = newpath;
    }
    </script>
  </body>
</html>`,
    {
      headers: {
        "content-type": "text/html; charset=UTF-8",
      },
    },
  );
}

serve({
  "/": () =>
    scrapeHome().then((home) =>
      html(
        "Home",
        `<h3>API</h3><ul><li><a href="/api">Endpoints</a></li><li><a href="https://github.com/DjDeveloperr/Manga">GitHub</a></li></ul><h3>Popular Manga</h3><ul>${
          home.popular.map((manga) =>
            `<li><a href="/manga/${manga.id}">${manga.name}</a> (<a href="${manga.thumbnail}">Img</a>)</li>`
          ).join("")
        }</ul><h3>Recent Manga</h3><ul>${
          home.recent.map((manga) =>
            `<li><a href="/manga/${manga.id}">${manga.name}</a> by ${manga.author} (<a href="${manga.thumbnail}">Img</a>)</li>`
          ).join("")
        }`,
      )
    ),

  "/search": (req) =>
    search(new URL(req.url).searchParams.get("q") || "").then((res) =>
      html(
        "Search Results",
        res.length == 0
          ? "No results"
          : `<ul>${
            res.map((e) =>
              `<li><a href="/manga/${
                e.url.split("/").pop()
              }">${e.name}</a> by ${e.author}</li>`
            ).join("")
          }</ul>`,
      )
    ),

  "/manga/:id": (_, __, p) =>
    scrapeManga(p!.id).then((manga) =>
      html(
        `${manga.title} | Manga Reader`,
        `
<img src="${manga.thumbnail}" alt="${manga.title}" />
<h3>${manga.title}</h3>
<p>${manga.description}</p>
<ul>
  <li>Authors: ${manga.authors}</li>
  <li>Status: ${manga.status}</li>
  <li>Genres: ${manga.genres.join(", ")}</li>
  <li>Last Updated: ${manga.lastUpdated}</li>
  <li>Views: ${manga.views}</li>
  <li>Rating: ${manga.rating}</li>
</ul>
<h4>Chapters</h4>
<ul>
  ${
          manga.chapters.map((c) =>
            `<li><a href="/manga/${manga.id}/${c.id}">${c.title}</a> (${c.views} views) (${c.uploaded})</li>`
          ).join("")
        }
</ul>
`,
      )
    ) as any,

  "/manga/:id/:chapter": (_, __, p) =>
    scrapeChapter(p!.id, p!.chapter).then((pages) =>
      html(
        `Manga Reader`,
        `
${
          pages.map((p) => `<img src="${p.proxyURL}" alt="${p.title}" />`).join(
            "<br/>",
          )
        }
`,
      )
    ),

  "/api": () =>
    html(
      "API Endpoints",
      "<h3>API Endpoints</h3>" + [
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
          name: "Browse (Advanced Search)",
          path: "/api/browse",
          body: {
            page: "Page number",
            orderBy:
              "Order By (0 = Last Updated, 1 = Top Viewed, 2 = New Manga, 3 = A-Z)",
            status:
              "Status (0 = Ongoing / Completed, 1 = Ongoing, 2 = Completed)",
            keyword:
              "Keyword type for search (0 = Everything, 1 = Name Title, 2 = Alternative Name, 3 = Author)",
            query: "Query for search",
            included: "Genres to include",
            excluded: "Genres to exclude",
          },
        },
        {
          name: "Get Manga Info & Chapters",
          path: "/api/manga",
          params: {
            id: "Manga ID",
          },
        },
        {
          name: "Get Chapter Pages",
          path: "/api/chapter",
          params: {
            id: "Manga ID",
            chapter: "Chapter ID",
          },
        },
      ].map((e) =>
        `<h4>${e.name}</h4>\n<p>Path: <code>${e.path}</code></p>${
          e.params
            ? `\nQuery Params: <ul>${
              Object.entries(e.params).map(([k, v]) => `<li>${k}: ${v}</li>`)
                .join("")
            }</ul>`
            : ""
        }${
          e.body
            ? `\nBody JSON: <ul>${
              Object.entries(e.body).map(([k, v]) => `<li>${k}: ${v}</li>`)
                .join("")
            }</ul>`
            : ""
        }`
      ).join(""),
    ),

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

  "/api/browse": async (req) => {
    return json(await advancedSearch(req.body ? await req.json() : {}));
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
