function Contexts_hideMenu() {
  if (typeof currentHide === 'function') {
    currentHide();

    if (typeof currentOnChange === 'function') {
      currentOnChange(false);
    }
  }

  currentHide = null;
  currentOnChange = null;
}