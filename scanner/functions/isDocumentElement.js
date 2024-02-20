function isDocumentElement(target) {
  return target === getWindowOf(target).document.documentElement;
}