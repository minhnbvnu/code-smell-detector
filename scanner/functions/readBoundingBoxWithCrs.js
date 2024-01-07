function readBoundingBoxWithCrs(node, objectStack) {
  const crs = node.getAttribute('crs');
  const coordinates = pushParseAndPop(
    [],
    WGS84_BBOX_READERS,
    node,
    objectStack,
  );
  if (coordinates.length != 2) {
    return undefined;
  }
  return {extent: boundingExtent(coordinates), crs: crs};
}