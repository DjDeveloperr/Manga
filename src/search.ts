import { SearchResult } from "./types.ts";
import { scrapeFetch } from "./util.ts";

export async function search(query: string): Promise<SearchResult[]> {
  const data: any = await scrapeFetch("/getstorysearchjson", {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    body: new URLSearchParams({
      searchword: query,
    }).toString(),
  }).then((e) => {
    if (!e.ok) console.log(e.statusText, e.status);
    return e.text();
  }).then((text) => {
    try {
      return JSON.parse(text);
    } catch (e) {
      throw new Error(
        `Failed to parse search result: "${text}" (${text.length})`,
        { cause: e },
      );
    }
  });

  return data.searchlist.map((e: any) => ({
    id: e.url_story.split("/").pop()!,
    name: e.name.replaceAll(/(<([^>]+)>)/gi, "").trim(),
    lastChapter: e.lastchapter,
    thumbnail: e.image,
    author: e.author.replaceAll(/(<([^>]+)>)/gi, "").trim(),
    url: e.url_story,
  }));
}
