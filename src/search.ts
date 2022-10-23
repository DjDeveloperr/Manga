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
	}).then((e) => e.json());

	return data.searchlist.map((e: any) => ({
		id: e.link_story.split("/").pop()!,
		internalId: e.id,
		idEncoded: e.id,
		name: e.name.replaceAll(/(<([^>]+)>)/gi, "").trim(),
		nameUnsigned: e.nameunsigned,
		lastChapter: e.lastchapter,
		thumbnail: e.image,
		author: e.author.replaceAll(/(<([^>]+)>)/gi, "").trim(),
		url: e.url_story,
	}));
}
