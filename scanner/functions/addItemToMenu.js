function addItemToMenu(item, menu) {
  const lastMenuItem = _.last(menu);
  const lastMenuItemIsSpearator =
    lastMenuItem && lastMenuItem.type === 'separator';
  if (!(item.type === 'separator' && lastMenuItemIsSpearator)) {
    menu.push(item);
  }
}