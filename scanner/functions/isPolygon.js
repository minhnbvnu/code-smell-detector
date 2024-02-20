function isPolygon(obj) {
  return Object.prototype.toString.call(obj) === '[object SVGPolygonElement]';
}