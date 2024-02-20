function boundingRectOfRect(rect) {
  rect = element_object(rect);

  var w = rect.width;
  var h = rect.height;
  var l = rect.x || 0;
  var t = rect.y || 0;
  var r = l + w;
  var b = t + h;

  var transform = rect.transform;
  var matrix;
  if (transform) {
    matrix = helper.matrixStrToObj(transform);
    return helper.boundingUnderTransform(matrix, t, r, b, l);
  }

  return {
    left: l,
    top: t,
    right: r,
    bottom: b,
    width: w,
    height: h
  };
}