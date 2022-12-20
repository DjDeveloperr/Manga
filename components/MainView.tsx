import { Head } from "$fresh/runtime.ts";

export function MainView(
  { children, title, hiddenTitle, noMinHeight, extendClass }: {
    children: any;
    title: string;
    hiddenTitle?: boolean;
    noMinHeight?: boolean;
    extendClass?: string;
  },
) {
  return (
    <>
      <div
        class={`main-view ${extendClass ?? ""}`}
        style={noMinHeight ? "min-height: 0" : undefined}
      >
        <Head>
          <title>{title} - Manga Reader</title>
        </Head>
        {!hiddenTitle && <h1 class="main-view-title no-select">{title}</h1>}
        {children}
      </div>
    </>
  );
}
