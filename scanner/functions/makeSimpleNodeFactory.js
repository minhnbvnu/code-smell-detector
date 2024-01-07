function makeSimpleNodeFactory(fixedNodeName, fixedNamespaceURI) {
  return (
    /**
     * @param {*} value Value.
     * @param {Array<*>} objectStack Object stack.
     * @param {string} [newNodeName] Node name.
     * @return {Node} Node.
     */
    function (value, objectStack, newNodeName) {
      const context = /** @type {NodeStackItem} */ (
        objectStack[objectStack.length - 1]
      );
      const node = context.node;
      let nodeName = fixedNodeName;
      if (nodeName === undefined) {
        nodeName = newNodeName;
      }

      const namespaceURI =
        fixedNamespaceURI !== undefined ? fixedNamespaceURI : node.namespaceURI;
      return createElementNS(namespaceURI, /** @type {string} */ (nodeName));
    }
  );
}