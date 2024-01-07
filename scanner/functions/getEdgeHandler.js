function getEdgeHandler(fixedP1, fixedP2) {
  if (fixedP1[0] == fixedP2[0]) {
    return function (point) {
      return boundingExtent([fixedP1, [point[0], fixedP2[1]]]);
    };
  }
  if (fixedP1[1] == fixedP2[1]) {
    return function (point) {
      return boundingExtent([fixedP1, [fixedP2[0], point[1]]]);
    };
  }
  return null;
}