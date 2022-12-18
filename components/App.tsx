import { Head } from "$fresh/runtime.ts";
import { AppleSplashScreen } from "./AppleSplashScreen.tsx";
import { Navigation } from "./Navigation.tsx";

export default function App(
  { children, active }: { children: any; active?: string },
) {
  return (
    <>
      <Head>
        <meta name="description" content="Manga Reader" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="charset" content="utf-8" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
          rel="stylesheet"
        />
        <link href="/style.css" rel="stylesheet" />
        <meta
          name="mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta
          name="viewport"
          content="width=device-width; initial-scale=1; viewport-fit=cover"
        />
        <AppleSplashScreen />
      </Head>
      <div class="notch"></div>
      <Navigation active={active} />
      <div class="app">
        {children}
      </div>
      <div class="nav-space"></div>
    </>
  );
}
