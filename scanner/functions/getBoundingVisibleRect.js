function getBoundingVisibleRect(el) {
    var bound = el.getBoundingClientRect();
    var rect = {
      top: bound.top,
      left: bound.left,
      width: bound.width,
      height: bound.height
    };
    var outsideHeight = (rect.top + rect.height) - window.innerHeight;
    var outsideWidth = (rect.left + rect.width) - window.innerWidth;

    if (outsideHeight > 0) {
      rect.height -= outsideHeight;
    }
    if (outsideWidth > 0) {
      rect.width -= outsideWidth;
    }
    return rect;
  }