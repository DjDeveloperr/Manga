import { Head } from "$fresh/runtime.ts";

export function MainView(
  { children, title }: { children: any, title: string }
) {
  return (
    <div class="main-view scrollbar">
      <Head>
        <title>{title} - Manga Reader</title>
      </Head>
      <h1 class="main-view-title">{title}</h1>
      {children}
      <div class="navigation-spacer"></div>
    </div>
  )
}
