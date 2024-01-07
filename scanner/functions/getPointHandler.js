function getPointHandler(fixedPoint) {
  return function (point) {
    return boundingExtent([fixedPoint, point]);
  };
}