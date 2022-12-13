import { Handlers } from "$fresh/server.ts";
import { fetchHome } from "../../src/home.ts";

export const handler: Handlers = {
  async GET(_, _ctx) {
    const resp = await fetchHome();
    return Response.json(resp);
  },
};
