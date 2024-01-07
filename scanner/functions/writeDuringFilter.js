function writeDuringFilter(node, filter, objectStack) {
  const parent = /** @type {Object} */ (objectStack[objectStack.length - 1]);
  const context = parent['context'];
  const version = context['version'];

  writeExpression(FESNS[version], 'ValueReference', node, filter.propertyName);
  const timePeriod = createElementNS(GMLNS, 'TimePeriod');

  node.appendChild(timePeriod);

  const begin = createElementNS(GMLNS, 'begin');
  timePeriod.appendChild(begin);
  writeTimeInstant(begin, filter.begin);

  const end = createElementNS(GMLNS, 'end');
  timePeriod.appendChild(end);
  writeTimeInstant(end, filter.end);
}