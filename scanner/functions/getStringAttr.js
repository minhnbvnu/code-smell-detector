function getStringAttr(el, attrName, defaultValue = null) {
  return el.getAttribute(attrName) ?? defaultValue;
}