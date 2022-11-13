import { Link } from "./Link.tsx";

function NavigationItem(
  { title, icon, href }: {
    title: string,
    icon: string,
    href: string
  }) {
  return (
    <Link href={href} extendClass="navigation-item">
      <span class="navigation-icon material-symbols-outlined" title={title}>{icon}</span>
    </Link>
  );
}

export function Navigation() {
  return (
    <div class="navigation">
      <NavigationItem title="Home" icon="home" href="/" />
      <NavigationItem title="Browse" icon="search" href="/browse" />
      <NavigationItem title="Library" icon="bookmarks" href="/library" />
      <NavigationItem title="Settings" icon="settings" href="/settings" />
    </div>
  )
}
