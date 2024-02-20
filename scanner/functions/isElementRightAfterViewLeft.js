function isElementRightAfterViewLeft(view) {
    const element = view.div;
    const elementRight = element.offsetLeft + element.clientLeft + element.clientWidth;
    return elementRight > left;
  }