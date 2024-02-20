function _getValidHTMLContainer(selector = '#checkboxland') {
  if (selector instanceof Element) {
    return selector;
  }

  if (typeof selector === 'string') {
    return document.querySelector(selector);
  }

  throw new Error(`Checkboxland selector is invalid.`);
}