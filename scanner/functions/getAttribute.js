function getAttribute(attributeName) {
  return el => {
    if (el.namespaceURI === '') {
      throw new Error('Not an HTML element.');
    }
    return el.getAttribute(attributeName);
  };
}