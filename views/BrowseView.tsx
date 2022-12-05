import App from "../components/App.tsx";
import { MainView } from "../components/MainView.tsx";

export function BrowseView() {
  return (
    <App>
      <MainView title="Browse">
        <form action="/api/search" method="get">
            <input name="q" placeholder="Query..." id="name" type="text" />
            <input type="submit" value="Search" />
        </form>
      </MainView>
    </App>
  )
}
