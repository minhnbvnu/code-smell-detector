function writeRte(node, feature, objectStack) {
  const options = /** @type {import("./Feature.js").WriteOptions} */ (
    objectStack[0]
  );
  const properties = feature.getProperties();
  const context = {node: node};
  context['properties'] = properties;
  const geometry = feature.getGeometry();
  if (geometry.getType() == 'LineString') {
    const lineString = /** @type {LineString} */ (
      transformGeometryWithOptions(geometry, true, options)
    );
    context['geometryLayout'] = lineString.getLayout();
    properties['rtept'] = lineString.getCoordinates();
  }
  const parentNode = objectStack[objectStack.length - 1].node;
  const orderedKeys = RTE_SEQUENCE[parentNode.namespaceURI];
  const values = makeSequence(properties, orderedKeys);
  pushSerializeAndPop(
    context,
    RTE_SERIALIZERS,
    OBJECT_PROPERTY_NODE_FACTORY,
    values,
    objectStack,
    orderedKeys,
  );
}