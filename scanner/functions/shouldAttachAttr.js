function shouldAttachAttr(attr, normalizedAttr, elem) {
    return $aria.config(normalizedAttr) && !elem.attr(attr);
  }