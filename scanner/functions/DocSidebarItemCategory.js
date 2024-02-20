function DocSidebarItemCategory({
  item,
  onItemClick,
  activePath,
  level,
  index,
  ...rest
}) {
  const {
    items,
    label,
    collapsible,
    className,
    href,
    customProps,
  } = item;
  const {
    docs: {
      sidebar: {
        autoCollapseCategories,
      },
    },
  } = useThemeConfig();

  const hrefWithSSRFallback = useCategoryHrefWithSSRFallback(item);
  const isActive = isActiveSidebarItem(item, activePath);
  const isCurrentPage = isSamePath(href, activePath);
  const { collapsed, setCollapsed } = useCollapsible({
    // Active categories are always initialized as expanded. The default
    // (`item.collapsed`) is only used for non-active categories.
    initialState: () => {
      if (!collapsible) {
        return false;
      }
      return isActive ? false : item.collapsed;
    },
  });
  const {expandedItem, setExpandedItem} = useDocSidebarItemsExpandedState();

  // Use this instead of `setCollapsed`, because it is also reactive
  const updateCollapsed = (toCollapsed = !collapsed) => {
    setExpandedItem(toCollapsed ? null : index);
    setCollapsed(toCollapsed);
  };

  useAutoExpandActiveCategory({ isActive, collapsed, updateCollapsed });

  useEffect(() => {
    if (
      collapsible &&
      expandedItem != null &&
      expandedItem !== index &&
      autoCollapseCategories
    ) {
      setCollapsed(true);
    }
  }, [collapsible, expandedItem, index, setCollapsed, autoCollapseCategories]);

  return (
    <li
      className={clsx(
        ThemeClassNames.docs.docSidebarItemCategory,
        ThemeClassNames.docs.docSidebarItemCategoryLevel(level),
        'menu__list-item',
        {
          'menu__list-item--collapsed': collapsed,
        },
        className,
      )}
    >
      <div
        className={clsx('menu__list-item-collapsible', {
          'menu__list-item-collapsible--active': isCurrentPage,
        })}
      >
        <Link
          className={clsx('menu__link', {
            'menu__link--sublist': collapsible,
            'menu__link--sublist-caret': !href && collapsible,
            'menu__link--active': isActive,
            'menu__link--with-badge': customProps?.new,
          })}
          onClick={
            collapsible
              ? (e) => {
                  onItemClick?.(item);
                  if (href) {
                    updateCollapsed(false);
                  } else {
                    e.preventDefault();
                    updateCollapsed();
                  }
                }
              : () => {
                  onItemClick?.(item);
                }
          }
          aria-current={isCurrentPage ? 'page' : undefined}
          aria-expanded={collapsible ? !collapsed : undefined}
          href={collapsible ? hrefWithSSRFallback ?? '#' : hrefWithSSRFallback}
          {...rest}
        >
          <span className="menu__link__content">
            {label}
          </span>
          {collapsible && (
            <CollapseButton
              categoryLabel={label}
              onClick={(e) => {
                e.preventDefault();
                updateCollapsed();
              }}
            />
          )}
          {customProps?.new && <NewBadge />}
          {customProps?.updated && <UpdatedBadge />}
        </Link>
      </div>

      <Collapsible lazy as="ul" className="menu__list" collapsed={collapsed}>
        <DocSidebarItems
          items={items}
          tabIndex={collapsed ? -1 : 0}
          onItemClick={onItemClick}
          activePath={activePath}
          level={level + 1}
        />
      </Collapsible>
    </li>
  );
}