function writeGetFeature(node, featureTypes, objectStack) {
  const context = /** @type {Object} */ (objectStack[objectStack.length - 1]);
  const item = /** @type {import("../xml.js").NodeStackItem} */ (
    Object.assign({}, context)
  );
  item.node = node;
  pushSerializeAndPop(
    item,
    GETFEATURE_SERIALIZERS,
    makeSimpleNodeFactory('Query'),
    featureTypes,
    objectStack,
  );
}