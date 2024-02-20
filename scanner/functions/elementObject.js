function elementObject(element) {
  if (element.constructor.name === 'Object') return element;

  var obj = null;
  switch (type(element).toLowerCase()) {
    case 'lineargradient':
      obj = attributesFromElement(element, ['x1', 'y1', 'x2', 'y2', 'gradientTransform']);
      break;
    case 'radialgradient':
      obj = attributesFromElement(element, ['cx', 'cy', 'r', 'fx', 'fy', 'gradientTransform']);
      break;
    case 'text':
      obj = textObject(element);
      break;
    case 'line':
      obj = attributesFromElement(element, ['x1', 'y1', 'x2', 'y2', 'stroke-width']);
      break;
    case 'rect':
      obj = attributesFromElement(element, ['x', 'y', 'width', 'height', 'transform', 'stroke-width']);
      break;
    case 'polyline':
      obj = attributesFromElement(element, ['points', 'stroke-width']);
      break;
    case 'polygon':
      obj = attributesFromElement(element, ['points', 'stroke-width']);
      break;
    case 'circle':
      obj = attributesFromElement(element, ['cx', 'cy', 'r', 'transform', 'stroke-width']);
      break;
    case 'ellipse':
      obj = attributesFromElement(element, ['cx', 'cy', 'rx', 'ry', 'transform', 'stroke-width']);
      break;
    case 'path':
      obj = attributesFromElement(element, ['d', 'stroke-width']);
      break;
    case 'image':
      obj = attributesFromElement(element, ['width', 'height', 'transform']);
      break;
  }

  return obj;
}