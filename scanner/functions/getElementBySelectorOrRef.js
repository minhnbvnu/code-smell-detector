function getElementBySelectorOrRef(q) {
  if (isString(q)) {
    // is selector
    return document.querySelector(q);
  } else if (isElement(q)) {
    // is element
    return q;
  } else if (isElement(q.$el)) {
    // is component
    return q.$el;
  } else {
    return null;
  }
}