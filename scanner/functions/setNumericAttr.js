function setNumericAttr(el, attrName, value) {
  // Simple cast to number
  const nextNumericValue = +value;

  // Treat null, undefined, and NaN as "nothing values", so unset if value is currently set.
  if (value == null || Number.isNaN(nextNumericValue)) {
    if (el.hasAttribute(attrName)) {
      el.removeAttribute(attrName);
    }
    return;
  }

  // Avoid resetting a value that hasn't changed
  if (getNumericAttr(el, attrName, undefined) === nextNumericValue) return;

  el.setAttribute(attrName, `${nextNumericValue}`);
}