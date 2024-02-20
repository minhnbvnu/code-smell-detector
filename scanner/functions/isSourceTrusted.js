function isSourceTrusted(source) {
  let win;
  for (win = window; win !== window.parent; win = window.parent) {
    if (source === window) {
      return true;
    }
  }
  return win === source;
}