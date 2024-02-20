function setBooleanAttr(el, attrName, value) {
  // also handles undefined
  if (value == null) {
    if (el.hasAttribute(attrName)) {
      el.removeAttribute(attrName);
    }
    return;
  }

  // avoid setting a value that hasn't changed
  // NOTE: For booleans, we can rely on a loose equality check
  if (getBooleanAttr(el, attrName) == value) return;

  el.toggleAttribute(attrName, value);
}