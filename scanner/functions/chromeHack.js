function chromeHack(optionElement) {
  // Workaround for https://code.google.com/p/chromium/issues/detail?id=381459
  // Adding an <option selected="selected"> element to a <select required="required"> should
  // automatically select the new element
  if (optionElement[0].hasAttribute('selected')) {
    optionElement[0].selected = true;
  }
}