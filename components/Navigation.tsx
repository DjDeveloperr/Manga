import { Link } from "./Link.tsx";

function NavigationItem(
  { title, icon, href, active }: {
    title: string;
    icon: string;
    href: string;
    active?: string;
  },
) {
  return (
    <Link
      href={href}
      extendClass={`navigation-item ${active === title ? "active" : ""}`}
    >
      <span class="navigation-icon material-symbols-outlined" title={title}>
        {icon}
      </span>
    </Link>
  );
}

export function Navigation({ active }: { active?: string }) {
  return (
    <div class="navigation">
      <NavigationItem
        title="Home"
        icon="home"
        href="/"
        active={active}
      />
      <NavigationItem
        title="Browse"
        icon="search"
        href="/browse"
        active={active}
      />
      <NavigationItem
        title="Library"
        icon="bookmarks"
        href="/library"
        active={active}
      />
      <NavigationItem
        title="Settings"
        icon="settings"
        href="/settings"
        active={active}
      />
    </div>
  );
}
