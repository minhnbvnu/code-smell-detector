function simpleDataParser(node, objectStack) {
  const name = node.getAttribute('name');
  if (name !== null) {
    const data = readString(node);
    const featureObject = /** @type {Object} */ (
      objectStack[objectStack.length - 1]
    );
    featureObject[name] = data;
  }
}