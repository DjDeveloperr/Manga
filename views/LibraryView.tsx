import App from "../components/App.tsx";
import { MainView } from "../components/MainView.tsx";
import { MainViewBlock } from "../components/MainViewBlock.tsx";

export function LibraryView() {
  return (
    <App active="Library">
      <MainView title="Library">
        <MainViewBlock id="under-construction" title="To Do">
          This page is under construction.
        </MainViewBlock>
      </MainView>
    </App>
  );
}
