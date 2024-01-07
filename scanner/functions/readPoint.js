function readPoint(node, objectStack) {
  const properties = pushParseAndPop(
    {},
    EXTRUDE_AND_ALTITUDE_MODE_PARSERS,
    node,
    objectStack,
  );
  const flatCoordinates = readFlatCoordinatesFromNode(node, objectStack);
  if (flatCoordinates) {
    const point = new Point(flatCoordinates, 'XYZ');
    point.setProperties(properties, true);
    return point;
  }
  return undefined;
}