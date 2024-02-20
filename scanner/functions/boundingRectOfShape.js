function boundingRectOfShape(shape, needTrueBounding) {
  var elementObj = element_object(shape);
  if (!elementObj) return null;

  var bounding;
  switch (elementObj.type) {
    case 'path':
      bounding = boundingRectOfPath(elementObj, needTrueBounding);
      break;
    case 'polygon':
      bounding = boundingRectOfPolygon(elementObj);
      break;
    case 'rect':
      bounding = boundingRectOfRect(elementObj);
      break;
    case 'ellipse':
      bounding = boundingRectOfEllipse(elementObj, needTrueBounding);
      break;
    case 'circle':
      bounding = boundingRectOfCircle(elementObj);
      break;
    case 'polyline':
      bounding = boundingRectOfPolyline(elementObj);
      break;
    case 'line':
      bounding = boundingRectOfLine(elementObj);
      break;
  }

  return bounding;
}