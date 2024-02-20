function CustomAdmonition({
  children,
  className,
  icon: propIcon,
  title: propTitle,
  type,
  ...rest
}) {
  const { icon: defaultIcon, title: defaultTitle } = (customDefaultProps[type] || {});
  const icon = (propIcon || defaultIcon);
  const title = (propTitle || defaultTitle);
  const shouldRenderHeading = !!(icon || title);

  return (
    <div
      {...rest}
      className={clsx(
        defaultClassName,
        (type && `${defaultClassName}--${type}`),
        className,
      )}
    >
      {shouldRenderHeading && (
        <div className={`${defaultClassName}__heading`}>
          {icon && (
            <span className={`${defaultClassName}__heading__icon`}>
              {icon}{' '}
            </span>
          )}
          {title}
        </div>
      )}
      {children}
    </div>
  );
}