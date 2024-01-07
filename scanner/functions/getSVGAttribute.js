function getSVGAttribute(attributeName) {
  return el => {
    if (el.namespaceURI !== 'http://www.w3.org/2000/svg') {
      throw new Error('Not an SVG element.');
    }
    return el.getAttribute(attributeName);
  };
}