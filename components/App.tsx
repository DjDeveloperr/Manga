import { Head } from "$fresh/runtime.ts";
import { Navigation } from "./Navigation.tsx";

export default function App(
  { children, active }: { children: any; active?: string },
) {
  return (
    <div class="app">
      <Head>
        <meta name="description" content="Manga Reader" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="charset" content="utf-8" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
          rel="stylesheet"
        />
        <link href="/style.css" rel="stylesheet" />
      </Head>
      {children}
      <Navigation active={active} />
    </div>
  );
}
