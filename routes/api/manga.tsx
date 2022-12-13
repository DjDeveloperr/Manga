import { Handlers } from "$fresh/server.ts";
import { fetchManga } from "../../src/manga.ts";

export const handler: Handlers = {
  async GET(req, _ctx) {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    if (!id) {
      return Response.json({ error: "Missing id" }, { status: 400 });
    }
    const resp = await fetchManga(id);
    return Response.json(resp);
  },
};
