function isElementVisible(element, depth = 3) {
  // Supported by Chrome and Firefox https://caniuse.com/mdn-api_element_checkvisibility
  // https://drafts.csswg.org/cssom-view-1/#dom-element-checkvisibility
  // @ts-ignore
  if (element.checkVisibility) {
    // @ts-ignore
    return element.checkVisibility({
      checkOpacity: true,
      checkVisibilityCSS: true,
    });
  }
  // Check if the element or its ancestors are hidden.
  let el = element;
  while (el && depth > 0) {
    const style = getComputedStyle(el);
    if (
      style.opacity === '0' ||
      style.visibility === 'hidden' ||
      style.display === 'none'
    ) {
      return false;
    }
    el = el.parentElement;
    depth--;
  }
  return true;
}