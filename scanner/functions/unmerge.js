function unmerge(menu, item) {
  item = cloneMenuItem(item);
  const matchingItemIndex = findMatchingItemIndex(menu, item);
  if (matchingItemIndex === -1) {
    return;
  }

  const matchingItem = menu[matchingItemIndex];
  if (item.submenu != null) {
    for (let submenuItem of item.submenu) {
      unmerge(matchingItem.submenu, submenuItem);
    }
  }

  if (matchingItem.submenu == null || matchingItem.submenu.length === 0) {
    menu.splice(matchingItemIndex, 1);
  }
}