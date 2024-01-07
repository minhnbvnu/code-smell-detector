function writeTrk(node, feature, objectStack) {
  const options = /** @type {import("./Feature.js").WriteOptions} */ (
    objectStack[0]
  );
  const properties = feature.getProperties();
  /** @type {import("../xml.js").NodeStackItem} */
  const context = {node: node};
  context['properties'] = properties;
  const geometry = feature.getGeometry();
  if (geometry.getType() == 'MultiLineString') {
    const multiLineString = /** @type {MultiLineString} */ (
      transformGeometryWithOptions(geometry, true, options)
    );
    properties['trkseg'] = multiLineString.getLineStrings();
  }
  const parentNode = objectStack[objectStack.length - 1].node;
  const orderedKeys = TRK_SEQUENCE[parentNode.namespaceURI];
  const values = makeSequence(properties, orderedKeys);
  pushSerializeAndPop(
    context,
    TRK_SERIALIZERS,
    OBJECT_PROPERTY_NODE_FACTORY,
    values,
    objectStack,
    orderedKeys,
  );
}