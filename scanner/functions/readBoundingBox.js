function readBoundingBox(node, objectStack) {
  const coordinates = pushParseAndPop(
    [],
    WGS84_BBOX_READERS,
    node,
    objectStack,
  );
  if (coordinates.length != 2) {
    return undefined;
  }
  return boundingExtent(coordinates);
}