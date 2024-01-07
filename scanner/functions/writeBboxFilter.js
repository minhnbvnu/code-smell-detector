function writeBboxFilter(node, filter, objectStack) {
  const parent = /** @type {Object} */ (objectStack[objectStack.length - 1]);
  const context = parent['context'];
  const version = context['version'];
  parent['srsName'] = filter.srsName;
  const format = GML_FORMATS[version];

  writePropertyName(version, node, filter.geometryName);
  format.prototype.writeGeometryElement(node, filter.extent, objectStack);
}