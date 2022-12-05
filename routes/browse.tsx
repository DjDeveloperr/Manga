import { BrowseView } from "../views/BrowseView.tsx";
import { search } from "../src/search.ts";

export default function Browse(result?: any[]) {
  return <BrowseView result={result} />;
}
