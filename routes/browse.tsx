import { BrowseView } from "../views/BrowseView.tsx";
import { search } from "../src/search.ts";

export const handler: Handlers<any[]> = {
  async GET(req, ctx) {
    const resp = await search(new URL(req.url).searchParams?.get("?") ?? "");
    return ctx.render(resp);
  },
};

export default function Browse({ data }: PageProps<any[]>) {
  return <BrowseView results={data} />;
}
