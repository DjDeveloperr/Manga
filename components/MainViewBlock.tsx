export function MainViewBlock(
  { children, title, id }: { children: any; title: string; id: string },
) {
  return (
    <div class="main-view-block" id={id}>
      <h2 class="main-view-block-title">{title}</h2>
      {children}
    </div>
  );
}
