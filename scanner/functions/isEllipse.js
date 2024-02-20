function isEllipse(obj) {
  return Object.prototype.toString.call(obj) === '[object SVGEllipseElement]';
}