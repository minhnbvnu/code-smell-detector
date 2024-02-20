function includeElement(elements, node) {
    return ~elements.indexOf((node.tagName || '').toLowerCase());
  }