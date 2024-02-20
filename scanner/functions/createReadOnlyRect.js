function createReadOnlyRect(_a) {
  var x = _a.x,
    y = _a.y,
    width = _a.width,
    height = _a.height;
  // If DOMRectReadOnly is available use it as a prototype for the rectangle.
  var Constr = typeof DOMRectReadOnly !== 'undefined' ? DOMRectReadOnly : Object;
  var rect = Object.create(Constr.prototype);
  // Rectangle's properties are not writable and non-enumerable.
  defineConfigurable(rect, {
    x: x,
    y: y,
    width: width,
    height: height,
    top: y,
    right: x + width,
    bottom: height + y,
    left: x
  });
  return rect;
}