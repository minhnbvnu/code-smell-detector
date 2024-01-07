function writeWptType(node, coordinate, objectStack) {
  const context = objectStack[objectStack.length - 1];
  const parentNode = context.node;
  const namespaceURI = parentNode.namespaceURI;
  const properties = context['properties'];
  //FIXME Projection handling
  node.setAttributeNS(null, 'lat', String(coordinate[1]));
  node.setAttributeNS(null, 'lon', String(coordinate[0]));
  const geometryLayout = context['geometryLayout'];
  switch (geometryLayout) {
    case 'XYZM':
      if (coordinate[3] !== 0) {
        properties['time'] = coordinate[3];
      }
    // fall through
    case 'XYZ':
      if (coordinate[2] !== 0) {
        properties['ele'] = coordinate[2];
      }
      break;
    case 'XYM':
      if (coordinate[2] !== 0) {
        properties['time'] = coordinate[2];
      }
      break;
    default:
    // pass
  }
  const orderedKeys =
    node.nodeName == 'rtept'
      ? RTEPT_TYPE_SEQUENCE[namespaceURI]
      : WPT_TYPE_SEQUENCE[namespaceURI];
  const values = makeSequence(properties, orderedKeys);
  pushSerializeAndPop(
    /** @type {import("../xml.js").NodeStackItem} */
    ({node: node, 'properties': properties}),
    WPT_TYPE_SERIALIZERS,
    OBJECT_PROPERTY_NODE_FACTORY,
    values,
    objectStack,
    orderedKeys,
  );
}