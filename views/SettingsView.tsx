import App from "../components/App.tsx";
import { Link } from "../components/Link.tsx";
import { MainView } from "../components/MainView.tsx";
import { MainViewBlock } from "../components/MainViewBlock.tsx";

export function SettingsView() {
  return (
    <App active="Settings">
      <MainView title="Settings">
        <MainViewBlock id="about" title="About">
          This is a Manga Reader app made by{" "}
          <Link href="https://djdev.deno.dev" styled>DjDeveloperr</Link>. It is
          open-source and can be found on{" "}
          <Link href="https://github.com/DjDeveloperr/Manga" styled>
            GitHub
          </Link>.
        </MainViewBlock>
        <MainViewBlock id="under-construction" title="Note">
          This page is under construction.
        </MainViewBlock>
      </MainView>
    </App>
  );
}
