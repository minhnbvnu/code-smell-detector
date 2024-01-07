function readGxMultiTrack(node, objectStack) {
  const lineStrings = pushParseAndPop(
    [],
    GX_MULTITRACK_GEOMETRY_PARSERS,
    node,
    objectStack,
  );
  if (!lineStrings) {
    return undefined;
  }
  return new MultiLineString(lineStrings);
}