import App from "../components/App.tsx";
import { Link } from "../components/Link.tsx";
import { MainView } from "../components/MainView.tsx";
import { MangaCardGrid } from "../components/MangaCardGrid.tsx";
import type { ExtendedData } from "../routes/browse.tsx";

export function BrowseView({ data }: { data: ExtendedData }) {
  const pathWithParam = (param: string, value: string) => {
    const url = new URL(data.url);
    url.searchParams.set(param, value);
    const str = url.toString();
    return str.slice(str.indexOf("/browse"));
  };
  const pagecap = (num: number) => Math.min(Math.max(num, 1), data.pages);
  data.page = pagecap(data.page);
  return (
    <App>
      <MainView title="Browse">
        <form class="browse-input" action="/browse" method="get">
          <input
            class="browse-search-input"
            name="q"
            placeholder="Query..."
            id="name"
            type="text"
            autoFocus
          />
          <input class="browse-submit-btn" type="submit" value="Search" />
        </form>
        <MangaCardGrid
          mangas={data.results.map((e) => ({
            id: e.id,
            name: e.title,
            thumbnail: e.thumbnail,
          }))}
        />
        {data.pages > 1
          ? (
            <div class="pagination">
              <div class="page-results">{data.total} results</div>
              <div class="page-buttons">
                {data.page !== 1
                  ? <Link href={pathWithParam("page", "1")}>First</Link>
                  : null}
                {data.page > 1
                  ? (
                    <Link
                      href={pathWithParam(
                        "page",
                        pagecap(data.page - 1).toString(),
                      )}
                    >
                      Prev
                    </Link>
                  )
                  : null}
                {data.page < data.pages
                  ? (
                    <Link
                      href={pathWithParam(
                        "page",
                        pagecap(data.page + 1).toString(),
                      )}
                    >
                      Next
                    </Link>
                  )
                  : null}
                {data.page < data.pages
                  ? (
                    <Link href={pathWithParam("page", data.pages.toString())}>
                      Last ({data.pages})
                    </Link>
                  )
                  : null}
              </div>
            </div>
          )
          : null}
      </MainView>
    </App>
  );
}
