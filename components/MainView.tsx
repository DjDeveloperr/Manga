export function MainView(
  { children, title }: { children: any, title: string }
) {
  return (
    <div class="main-view scrollbar">
      <h1 class="main-view-title">{title}</h1>
      {children}
      <div class="navigation-spacer"></div>
    </div>
  )
}
