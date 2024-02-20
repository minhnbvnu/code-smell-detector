function hasLocalStorage() {
  try {
    return !!window.localStorage;
  } catch (e) {
    // Will throw in sandboxed iframe
    // DOMException: Window.localStorage getter: Forbidden in a sandboxed document without the 'allow-same-origin' flag.
    return false;
  }
}