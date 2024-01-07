function writeFilterCondition(node, filter, objectStack) {
  const context = /** @type {Object} */ (objectStack[objectStack.length - 1]);
  /** @type {import("../xml.js").NodeStackItem} */
  const item = {node};
  Object.assign(item, {context});
  pushSerializeAndPop(
    item,
    GETFEATURE_SERIALIZERS,
    makeSimpleNodeFactory(filter.getTagName()),
    [filter],
    objectStack,
  );
}