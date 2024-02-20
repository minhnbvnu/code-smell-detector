function menuItemContainsCommand(item, command) {
  if (item.command != null) {
    return command === item.command;
  }
  if (item.submenu != null) {
    return item.submenu.some(subitem =>
      menuItemContainsCommand(subitem, command),
    );
  }
  return false;
}