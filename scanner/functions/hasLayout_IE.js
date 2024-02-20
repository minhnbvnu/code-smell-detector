function hasLayout_IE(element) {
    if (!element.currentStyle.hasLayout)
      element.style.zoom = 1;
    return element;
  }