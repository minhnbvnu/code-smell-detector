function ActiveLink({
  href,
  as,
  exact,
  activeClassName = `text-transparent bg-clip-text ${blue}`,
  children,
  ...props
}) {
  const { asPath } = useRouter();
  const isActive = pathToRegexp(as || href, [], {
    sensitive: true,
    end: !!exact,
  }).test(asPath);

  const child = React.Children.only(<a>{children}</a>);
  const className = (
    (child.props.className || "") +
    " active-link " +
    (isActive ? activeClassName : "")
  ).trim();

  return (
    <Link href={href} as={as} {...props}>
      {React.cloneElement(child, { className })}
    </Link>
  );
}