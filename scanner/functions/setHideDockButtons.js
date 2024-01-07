function setHideDockButtons(hideDockButtons) {
  if (hideDockButtons) {
    root.setAttribute(`theme-${themeName}-dock-buttons`, 'hidden');
  } else {
    unsetHideDockButtons();
  }
}