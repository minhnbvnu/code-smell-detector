function DocSidebarItemLink({
  item,
  onItemClick,
  activePath,
  level,
  index,
  ...rest
}) {
  const {
    href,
    label,
    className,
    autoAddBaseUrl,
    customProps,
  } = item;
  const isActive = isActiveSidebarItem(item, activePath);
  const isInternalLink = isInternalUrl(href);

  return (
    <li
      className={clsx(
        ThemeClassNames.docs.docSidebarItemLink,
        ThemeClassNames.docs.docSidebarItemLinkLevel(level),
        'menu__list-item',
        className,
      )}
      key={label}
    >
      <Link
        className={clsx(
          'menu__link',
          !isInternalLink && styles.menuExternalLink,
          {
            'menu__link--active': isActive,
            'menu__link--with-badge': customProps?.new,
          },
        )}
        autoAddBaseUrl={autoAddBaseUrl}
        aria-current={isActive ? 'page' : undefined}
        to={href}
        {...((isInternalLink && onItemClick) && {
          onClick: () => onItemClick(item),
        })}
        {...rest}
      >
        <span className="menu__link__content">
          {label}
        </span>
        {!isInternalLink && <IconExternalLink />}
        {customProps?.new && <NewBadge />}
        {customProps?.updated && <UpdatedBadge />}
      </Link>
    </li>
  );
}