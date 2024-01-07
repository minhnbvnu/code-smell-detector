function writeIsBetweenFilter(node, filter, objectStack) {
  const parent = /** @type {Object} */ (objectStack[objectStack.length - 1]);
  const context = parent['context'];
  const version = context['version'];
  const ns = getFilterNS(version);

  writePropertyName(version, node, filter.propertyName);

  const lowerBoundary = createElementNS(ns, 'LowerBoundary');
  node.appendChild(lowerBoundary);
  writeLiteral(version, lowerBoundary, '' + filter.lowerBoundary);

  const upperBoundary = createElementNS(ns, 'UpperBoundary');
  node.appendChild(upperBoundary);
  writeLiteral(version, upperBoundary, '' + filter.upperBoundary);
}