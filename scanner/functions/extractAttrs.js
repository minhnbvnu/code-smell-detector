function extractAttrs(el) {
    if (el.nodeType === 1 && el.hasAttributes()) {
      return toArray(el.attributes);
    }
  }