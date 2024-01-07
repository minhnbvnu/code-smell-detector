function findMatchingItemIndex(menu, { type, id, submenu }) {
  if (type === 'separator') {
    return -1;
  }
  for (let index = 0; index < menu.length; index++) {
    const item = menu[index];
    if (item.id === id && (item.submenu != null) === (submenu != null)) {
      return index;
    }
  }
  return -1;
}