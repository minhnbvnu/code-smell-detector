function readFlatLinearRing(node, objectStack) {
  return pushParseAndPop(null, FLAT_LINEAR_RING_PARSERS, node, objectStack);
}