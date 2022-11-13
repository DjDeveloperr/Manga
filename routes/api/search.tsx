import { Handlers } from "$fresh/server.ts";
import { search } from "../../src/search.ts";

export const handler: Handlers = {
  async GET(req, _ctx) {
    const url = new URL(req.url);
    const q = url.searchParams.get("q");
    if (!q) {
      return Response.json({ error: "Missing query (q)" }, { status: 400 });
    }
    const resp = await search(q);
    return Response.json(resp);
  },
};
