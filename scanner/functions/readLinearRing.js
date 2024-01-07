function readLinearRing(node, objectStack) {
  const properties = pushParseAndPop(
    {},
    EXTRUDE_AND_ALTITUDE_MODE_PARSERS,
    node,
    objectStack,
  );
  const flatCoordinates = readFlatCoordinatesFromNode(node, objectStack);
  if (flatCoordinates) {
    const polygon = new Polygon(flatCoordinates, 'XYZ', [
      flatCoordinates.length,
    ]);
    polygon.setProperties(properties, true);
    return polygon;
  }
  return undefined;
}