function writeDataNode(node, pair, objectStack) {
  node.setAttribute('name', pair.name);
  const /** @type {import("../xml.js").NodeStackItem} */ context = {node: node};
  const value = pair.value;

  if (typeof value == 'object') {
    if (value !== null && value.displayName) {
      pushSerializeAndPop(
        context,
        EXTENDEDDATA_NODE_SERIALIZERS,
        OBJECT_PROPERTY_NODE_FACTORY,
        [value.displayName],
        objectStack,
        ['displayName'],
      );
    }

    if (value !== null && value.value) {
      pushSerializeAndPop(
        context,
        EXTENDEDDATA_NODE_SERIALIZERS,
        OBJECT_PROPERTY_NODE_FACTORY,
        [value.value],
        objectStack,
        ['value'],
      );
    }
  } else {
    pushSerializeAndPop(
      context,
      EXTENDEDDATA_NODE_SERIALIZERS,
      OBJECT_PROPERTY_NODE_FACTORY,
      [value],
      objectStack,
      ['value'],
    );
  }
}