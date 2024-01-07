function writeBoundaryIs(node, linearRing, objectStack) {
  const /** @type {import("../xml.js").NodeStackItem} */ context = {node: node};
  pushSerializeAndPop(
    context,
    BOUNDARY_IS_SERIALIZERS,
    LINEAR_RING_NODE_FACTORY,
    [linearRing],
    objectStack,
  );
}