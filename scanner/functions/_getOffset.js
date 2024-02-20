function _getOffset(element) {
    var elementPosition = {};

    var body = document.body;
    var docEl = document.documentElement;

    var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

    var x = element.getBoundingClientRect()
    elementPosition.top = x.top + scrollTop;
    elementPosition.width = x.width;
    elementPosition.height = x.height;
    elementPosition.left = x.left + scrollLeft;

    return elementPosition;
  }