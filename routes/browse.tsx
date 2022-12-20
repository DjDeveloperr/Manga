import { Handlers, PageProps } from "$fresh/server.ts";
import { BrowseView } from "../views/BrowseView.tsx";
import {
  ADULT_GENRES,
  advancedSearch,
  AdvancedSearchData,
  AdvancedSearchOptions,
  Genre,
  Keywords,
  OrderBy,
  Status,
} from "../src/advanced_search.ts";

export type ExtendedData = AdvancedSearchData & {
  url: URL;
};

export const handler: Handlers<ExtendedData> = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    const params = url.searchParams ?? new URLSearchParams();
    const options: AdvancedSearchOptions = {
      query: params.has("q")
        ? params.get("q")!.split("").map((e) => {
          if (e === " ") return "_";
          else if (e.match(/[a-z0-9A-Z]/)) return e;
          else return "";
        }).join("")
        : undefined,
      keyword: Keywords.Everything,
      page: parseInt(params.get("page") ?? "1"),
      status: params.has("status")
        ? Status[params.get("status")! as keyof typeof Status]
        : undefined,
      orderBy: params.has("order_by")
        ? OrderBy[params.get("order_by")! as keyof typeof OrderBy]
        : undefined,
      included: (params.get("included")?.split(",") ?? []).map((e) =>
        Genre[e as keyof typeof Genre]
      ).filter((e) => e !== undefined) as Genre[],
      excluded: (params.get("excluded")?.split(",") ?? []).map((e) =>
        Genre[e as keyof typeof Genre]
      ).filter((e) => e !== undefined) as Genre[],
    };
    options.excluded = [
      ...ADULT_GENRES.map((e) => Genre[e]),
      ...options.excluded!,
    ];
    options.included = options.included!.filter((e) =>
      !options.excluded!.includes(e)
    );
    const resp = await advancedSearch(options);
    return ctx.render({ url, ...resp });
  },
};

export default function Browse({ data }: PageProps<ExtendedData>) {
  return <BrowseView data={data} />;
}
