import { Handlers } from "$fresh/server.ts";
import { advancedSearch } from "../../src/advanced_search.ts";

export const handler: Handlers = {
  async GET(_req, _ctx) {
    return Response.json(await advancedSearch({}));
  },
  async POST(req, _ctx) {
    return Response.json(await advancedSearch(req.body ? await req.json() : {}));
  },
};
