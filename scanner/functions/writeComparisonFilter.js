function writeComparisonFilter(node, filter, objectStack) {
  const parent = /** @type {Object} */ (objectStack[objectStack.length - 1]);
  const context = parent['context'];
  const version = context['version'];
  if (filter.matchCase !== undefined) {
    node.setAttribute('matchCase', filter.matchCase.toString());
  }
  writePropertyName(version, node, filter.propertyName);
  writeLiteral(version, node, '' + filter.expression);
}