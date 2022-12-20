import { MaterialIcon } from "../components/MaterialIcon.tsx";

function NavigationItem(
  { title, icon, href, active }: {
    title: string;
    icon: string;
    href: string;
    active?: string;
  },
) {
  return (
    <div
      class={`no-select navigation-item ${active === title ? "active" : ""}`}
    >
      <MaterialIcon
        icon={icon}
        title={title}
        extendClass="no-select navigation-icon"
      />
      <div class="navigation-item-cover" onClick={() => location.href = href}>
      </div>
    </div>
  );
}

export default function NavigationBar({ active }: { active?: string }) {
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
