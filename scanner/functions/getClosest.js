function getClosest(el, selector) {
  if (!isElement(el)) {
    return null;
  }
  return el.closest(selector);
}