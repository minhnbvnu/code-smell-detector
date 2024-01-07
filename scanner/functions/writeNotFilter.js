function writeNotFilter(node, filter, objectStack) {
  const parent = /** @type {Object} */ (objectStack[objectStack.length - 1]);
  const context = parent['context'];
  /** @type {import("../xml.js").NodeStackItem} */
  const item = {node};
  Object.assign(item, {context});
  const condition = filter.condition;
  pushSerializeAndPop(
    item,
    GETFEATURE_SERIALIZERS,
    makeSimpleNodeFactory(condition.getTagName()),
    [condition],
    objectStack,
  );
}