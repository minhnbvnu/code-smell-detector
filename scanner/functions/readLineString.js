function readLineString(node, objectStack) {
  const properties = pushParseAndPop(
    {},
    EXTRUDE_AND_ALTITUDE_MODE_PARSERS,
    node,
    objectStack,
  );
  const flatCoordinates = readFlatCoordinatesFromNode(node, objectStack);
  if (flatCoordinates) {
    const lineString = new LineString(flatCoordinates, 'XYZ');
    lineString.setProperties(properties, true);
    return lineString;
  }
  return undefined;
}