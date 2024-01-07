function getCanvas(item) {
  if (_isDomSupported() && typeof item === 'string') {
    item = document.getElementById(item);
  } else if (item && item.length) {
    // Support for array based queries (such as jQuery)
    item = item[0];
  }

  if (item && item.canvas) {
    // Support for any object associated to a canvas (including a context2d)
    item = item.canvas;
  }
  return item;
}