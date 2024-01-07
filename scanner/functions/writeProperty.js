function writeProperty(node, pair, objectStack) {
  const context = objectStack[objectStack.length - 1];
  const version = context['version'];
  const ns = WFSNS[version];
  const tagName = version === '2.0.0' ? 'ValueReference' : 'Name';
  const name = createElementNS(ns, tagName);
  const gmlVersion = context['gmlVersion'];
  node.appendChild(name);
  writeStringTextNode(name, pair.name);
  if (pair.value !== undefined && pair.value !== null) {
    const value = createElementNS(ns, 'Value');
    node.appendChild(value);
    if (
      pair.value &&
      typeof (/** @type {?} */ (pair.value).getSimplifiedGeometry) ===
        'function'
    ) {
      if (gmlVersion === 2) {
        GML2.prototype.writeGeometryElement(value, pair.value, objectStack);
      } else if (gmlVersion === 3) {
        GML3.prototype.writeGeometryElement(value, pair.value, objectStack);
      } else {
        GML32.prototype.writeGeometryElement(value, pair.value, objectStack);
      }
    } else {
      writeStringTextNode(value, pair.value);
    }
  }
}