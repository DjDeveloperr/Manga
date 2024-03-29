import { cheerio } from "../deps.ts";
import { BASE_URL, USER_AGENT } from "./types.ts";

export async function scrapeFetch(path: string, options: RequestInit = {}) {
  const res = await fetch(
    (path.startsWith("http") ? "" : BASE_URL) + path,
    Object.assign(options, {
      headers: Object.assign(options.headers ?? {}, {
        "user-agent": USER_AGENT,
        "origin": BASE_URL,
      }),
    }),
  );
  if (!res.ok) throw new Error(`FetchError: ${res.status} (${res.statusText})`);
  return res;
}

export async function scrape(page: string) {
  const res = await scrapeFetch(page);
  const html = await res.text();
  if (html.includes("404 - PAGE NOT FOUND")) throw new Error("404");
  return cheerio.load(html);
}

export function assertTag(
  element: cheerio.Element | cheerio.Element,
): asserts element is cheerio.Element {
  if (element.type !== "tag") {
    throw new Error(`Assertion Failed: Element is not type of tag`);
  }
}
