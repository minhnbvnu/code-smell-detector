function DocSidebarItemHtml({ item, level, index }) {
  const {
    value,
    defaultStyle,
    className,
    customProps,
  } = item;

  return (
    <li
      className={clsx(
        ThemeClassNames.docs.docSidebarItemLink,
        ThemeClassNames.docs.docSidebarItemLinkLevel(level),
        defaultStyle && [styles.menuHtmlItem, 'menu__list-item'],
        className,
      )}
      key={index}
    >
      <span
        className="menu__list-item__content"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{__html: value}}
      />
      {customProps?.new && <NewBadge />}
      {customProps?.updated && <UpdatedBadge />}
    </li>
  );
}