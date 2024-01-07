function GPX_NODE_FACTORY(value, objectStack, nodeName) {
  const geometry = /** @type {Feature} */ (value).getGeometry();
  if (geometry) {
    const nodeName = GEOMETRY_TYPE_TO_NODENAME[geometry.getType()];
    if (nodeName) {
      const parentNode = objectStack[objectStack.length - 1].node;
      return createElementNS(parentNode.namespaceURI, nodeName);
    }
  }
}