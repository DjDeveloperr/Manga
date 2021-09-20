import { SearchResult } from "./types.ts";
import { scrapeFetch } from "./util.ts";

export async function search(query: string): Promise<SearchResult[]> {
  const data: any[] = await scrapeFetch("/getstorysearchjson", {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    body: new URLSearchParams({
      searchword: query,
    }).toString(),
  }).then((e) => e.json());

  return data.map((e) => ({
    id: e.link_story.split("/").pop()!,
    internalId: e.id,
    idEncoded: e.id_encode,
    name: e.name.replaceAll(/(<([^>]+)>)/ig, "").trim(),
    nameUnsigned: e.nameunsigned,
    lastChapter: e.lastchapter,
    thumbnail: e.image,
    author: e.author.replaceAll(/(<([^>]+)>)/ig, "").trim(),
    url: e.link_story,
  }));
}
