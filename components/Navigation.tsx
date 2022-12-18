import { Link } from "./Link.tsx";
import { MaterialIcon } from "./MaterialIcon.tsx";

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
      extendClass={`no-select navigation-item ${
        active === title ? "active" : ""
      }`}
    >
      <MaterialIcon
        icon={icon}
        title={title}
        extendClass="no-select navigation-icon"
      />
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
