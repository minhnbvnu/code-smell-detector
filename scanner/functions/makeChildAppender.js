function makeChildAppender(nodeWriter, thisArg) {
  return function (node, value, objectStack) {
    nodeWriter.call(
      thisArg !== undefined ? thisArg : this,
      node,
      value,
      objectStack,
    );
    const parent = /** @type {NodeStackItem} */ (
      objectStack[objectStack.length - 1]
    );
    const parentNode = parent.node;
    parentNode.appendChild(node);
  };
}