function polyfillCustomEvent(window) {
  if (typeof window.CustomEvent === "function") return false;
  window.CustomEvent = PolyfilledCustomEvent;
}