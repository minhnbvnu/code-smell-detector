function computedStyle(elt) {
    if (elt.currentStyle) return elt.currentStyle;
    return window.getComputedStyle(elt, null);
  }