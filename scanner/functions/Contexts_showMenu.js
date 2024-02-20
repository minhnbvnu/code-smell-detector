function Contexts_showMenu({
  data,
  id,
  onChange,
  pageX,
  pageY
}) {
  const showFn = idToShowFnMap.get(id);

  if (typeof showFn === 'function') {
    // Prevent open menus from being left hanging.
    Contexts_hideMenu();
    currentHide = idToHideFnMap.get(id);
    showFn({
      data,
      pageX,
      pageY
    });

    if (typeof onChange === 'function') {
      currentOnChange = onChange;
      onChange(true);
    }
  }
}