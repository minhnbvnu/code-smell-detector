function readFlatCoordinatesFromNode(node, objectStack) {
  return pushParseAndPop(
    null,
    GEOMETRY_FLAT_COORDINATES_PARSERS,
    node,
    objectStack,
  );
}