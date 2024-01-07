function writeLink(node, value, objectStack) {
  node.setAttribute('href', value);
  const context = objectStack[objectStack.length - 1];
  const properties = context['properties'];
  const link = [properties['linkText'], properties['linkType']];
  pushSerializeAndPop(
    /** @type {import("../xml.js").NodeStackItem} */ ({node: node}),
    LINK_SERIALIZERS,
    OBJECT_PROPERTY_NODE_FACTORY,
    link,
    objectStack,
    LINK_SEQUENCE,
  );
}