function isSVGElement(object) {
  return typeof SVGElement === 'object' ? object instanceof SVGElement : object && typeof object === 'object' && object !== null && object.nodeType === 1 && typeof object.nodeName === 'string';
}