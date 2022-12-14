import { Head } from "$fresh/runtime.ts";

export function MainView(
  { children, title, hiddenTitle }: {
    children: any;
    title: string;
    hiddenTitle?: boolean;
  },
) {
  return (
    <>
      <div class="notch"></div>
      <div class="main-view">
        <Head>
          <title>{title} - Manga Reader</title>
        </Head>
        {!hiddenTitle && <h1 class="main-view-title">{title}</h1>}
        {children}
        <div class="navigation-spacer"></div>
      </div>
    </>
  );
}
