function menuContainsCommand(config, command) {
  if (config.menu == null) {
    return false;
  }
  return config.menu.some(item => {
    return menuItemContainsCommand(item, command);
  });
}