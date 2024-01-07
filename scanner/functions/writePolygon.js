function writePolygon(node, polygon, objectStack) {
  const linearRings = polygon.getLinearRings();
  const outerRing = linearRings.shift();
  const /** @type {import("../xml.js").NodeStackItem} */ context = {node: node};
  // inner rings
  pushSerializeAndPop(
    context,
    POLYGON_SERIALIZERS,
    INNER_BOUNDARY_NODE_FACTORY,
    linearRings,
    objectStack,
  );
  // outer ring
  pushSerializeAndPop(
    context,
    POLYGON_SERIALIZERS,
    OUTER_BOUNDARY_NODE_FACTORY,
    [outerRing],
    objectStack,
  );
}