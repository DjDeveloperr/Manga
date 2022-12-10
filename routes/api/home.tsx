import { Handlers } from "$fresh/server.ts";
import { scrapeHome } from "../../src/home.ts";

export const handler: Handlers = {
  async GET(_, _ctx) {
    const resp = await scrapeHome();
    return Response.json(resp);
  },
};
