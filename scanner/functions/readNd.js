function readNd(node, objectStack) {
  const values = /** @type {Object} */ (objectStack[objectStack.length - 1]);
  values.ndrefs.push(node.getAttribute('ref'));
  if (node.hasAttribute('lon') && node.hasAttribute('lat')) {
    values.flatCoordinates.push(parseFloat(node.getAttribute('lon')));
    values.flatCoordinates.push(parseFloat(node.getAttribute('lat')));
  }
}