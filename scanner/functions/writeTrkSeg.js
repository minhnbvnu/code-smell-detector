function writeTrkSeg(node, lineString, objectStack) {
  /** @type {import("../xml.js").NodeStackItem} */
  const context = {node: node};
  context['geometryLayout'] = lineString.getLayout();
  context['properties'] = {};
  pushSerializeAndPop(
    context,
    TRKSEG_SERIALIZERS,
    TRKSEG_NODE_FACTORY,
    lineString.getCoordinates(),
    objectStack,
  );
}