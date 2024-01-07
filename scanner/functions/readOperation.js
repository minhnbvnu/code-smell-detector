function readOperation(node, objectStack) {
  const name = node.getAttribute('name');
  const value = pushParseAndPop({}, OPERATION_PARSERS, node, objectStack);
  if (!value) {
    return undefined;
  }
  const object = /** @type {Object} */ (objectStack[objectStack.length - 1]);
  object[name] = value;
}