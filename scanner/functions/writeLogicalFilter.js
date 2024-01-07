function writeLogicalFilter(node, filter, objectStack) {
  const parent = /** @type {Object} */ (objectStack[objectStack.length - 1]);
  const context = parent['context'];
  /** @type {import("../xml.js").NodeStackItem} */
  const item = {node};
  Object.assign(item, {context});
  const conditions = filter.conditions;
  for (let i = 0, ii = conditions.length; i < ii; ++i) {
    const condition = conditions[i];
    pushSerializeAndPop(
      item,
      GETFEATURE_SERIALIZERS,
      makeSimpleNodeFactory(condition.getTagName()),
      [condition],
      objectStack,
    );
  }
}