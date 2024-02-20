function CollapseButton({ categoryLabel, onClick }) {
  return (
    <span
      aria-label={translate(
        {
          id: 'theme.DocSidebarItem.toggleCollapsedCategoryAriaLabel',
          message: "Toggle the collapsible sidebar category '{label}'",
          description: 'The ARIA label to toggle the collapsible sidebar category',
        },
        {
          label: categoryLabel,
        },
      )}
      role="button"
      className="clean-btn menu__caret"
      onClick={onClick}
    />
  );
}