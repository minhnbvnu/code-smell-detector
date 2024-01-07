function writeDWithinFilter(node, filter, objectStack) {
  const parent = /** @type {Object} */ (objectStack[objectStack.length - 1]);
  const context = parent['context'];
  const version = context['version'];
  writeSpatialFilter(node, filter, objectStack);
  const distance = createElementNS(getFilterNS(version), 'Distance');
  writeStringTextNode(distance, filter.distance.toString());
  if (version === '2.0.0') {
    distance.setAttribute('uom', filter.unit);
  } else {
    distance.setAttribute('units', filter.unit);
  }
  node.appendChild(distance);
}