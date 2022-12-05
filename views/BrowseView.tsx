import App from "../components/App.tsx";
import { MainView } from "../components/MainView.tsx";
import { Link } from "../components/Link.tsx";

export function BrowseView(results?: any[]) {
  return (
    <App>
      <MainView title="Browse">
        <form action="/browse" method="get" style="padding: 4px">
            <input name="q" placeholder="Query..." id="name" type="text" />
            <input type="submit" value="Search" />
        </form>
        <ul>
        {results?.length && results.map(res => (
            <li><Link href={`/manga/${res.id}`}>{res.name}</Link></li>
        )}
        </ul>
      </MainView>
    </App>
  )
}
