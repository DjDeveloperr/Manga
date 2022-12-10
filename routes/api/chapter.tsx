import { Handlers } from "$fresh/server.ts";
import { scrapeChapter } from "../../src/chapter.ts";

export const handler: Handlers = {
  async GET(req, _ctx) {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    if (!id) {
      return Response.json({ error: "Missing id" }, { status: 400 });
    }
    const chapter = url.searchParams.get("chapter");
    if (!chapter) {
      return Response.json({ error: "Missing chapter" }, { status: 400 });
    }
    const resp = await scrapeChapter(id, chapter);
    return Response.json(resp);
  },
};
