function isNonTabbableRadio(node) {
  return isRadio(node) && !isTabbableRadio(node);
}