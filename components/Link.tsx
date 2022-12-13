export function Link(
  { children, href, extendClass, styled }: {
    children: any;
    href: string;
    extendClass?: string;
    styled?: boolean;
  },
) {
  return (
    <a
      href={href}
      class={`${extendClass ?? ""} link ${styled ? "styled-link" : ""}`}
    >
      {children}
    </a>
  );
}
