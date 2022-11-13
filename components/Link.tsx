export function Link(
  { children, href, extendClass }: { children: any, href: string, extendClass?: string }
) {
  return (
    <a href={href} class={`link ${extendClass}`}>{children}</a>
  )
}
