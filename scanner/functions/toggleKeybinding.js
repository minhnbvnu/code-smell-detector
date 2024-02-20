function toggleKeybinding (setting) {
  if (document.onkeydown === null || setting === 'on') {
    if (typeof presenterKeyDown === 'function') {
      document.onkeydown = presenterKeyDown;
    } else {
      document.onkeydown = keyDown;
    }
  } else {
    document.onkeydown = null;
  }
}