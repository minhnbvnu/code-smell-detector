function onDoubleClickMouse(e) {
    const clickTarget = e.target;
    if (!nodeContainer.contains(clickTarget)) return;

    e.stopPropagation(); // so that we don't zoom
    onDoubleClick(e);
  }