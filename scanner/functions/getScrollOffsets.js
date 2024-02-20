function getScrollOffsets() {
    var x = window.pageXOffset || document.documentElement.scrollLeft ||
     document.body.scrollLeft;
    var y = window.pageYOffset || document.documentElement.scrollTop ||
     document.body.scrollTop;

    return new Element.Offset(x, y);
  }