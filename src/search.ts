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

const data = [{
  "id": "1059",
  "id_encode": "kiss_x_sis",
  "name":
    '<span style="color: #FF530D;font-weight: bold;">kiss<\/span> <span style="color: #FF530D;font-weight: bold;">x<\/span> <span style="color: #FF530D;font-weight: bold;">sis<\/span>',
  "nameunsigned": "kiss_x_sis",
  "lastchapter": "Chapter 149: More conscious",
  "image": "https:\/\/avt.mkklcdnv6temp.com\/38\/n\/1-1583465211.jpg",
  "author": "Ditama Bow",
  "link_story": "https:\/\/readmanganato.com\/manga-kh952416",
}];
