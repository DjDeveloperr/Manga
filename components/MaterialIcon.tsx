export function MaterialIcon(
  { icon, title, extendClass }: {
    icon: string;
    title?: string;
    extendClass?: string;
  },
) {
  return (
    <span
      class={`material-symbols-outlined ${extendClass ?? ""}`}
      title={title}
    >
      {icon}
    </span>
  );
}
