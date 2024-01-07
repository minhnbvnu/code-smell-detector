function writeIcon(node, icon, objectStack) {
  const /** @type {import("../xml.js").NodeStackItem} */ context = {node: node};
  const parentNode = objectStack[objectStack.length - 1].node;
  let orderedKeys = ICON_SEQUENCE[parentNode.namespaceURI];
  let values = makeSequence(icon, orderedKeys);
  pushSerializeAndPop(
    context,
    ICON_SERIALIZERS,
    OBJECT_PROPERTY_NODE_FACTORY,
    values,
    objectStack,
    orderedKeys,
  );
  orderedKeys = ICON_SEQUENCE[GX_NAMESPACE_URIS[0]];
  values = makeSequence(icon, orderedKeys);
  pushSerializeAndPop(
    context,
    ICON_SERIALIZERS,
    GX_NODE_FACTORY,
    values,
    objectStack,
    orderedKeys,
  );
}