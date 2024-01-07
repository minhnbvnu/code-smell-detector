function dataParser(node, objectStack) {
  const name = node.getAttribute('name');
  parseNode(DATA_PARSERS, node, objectStack);
  const featureObject = /** @type {Object} */ (
    objectStack[objectStack.length - 1]
  );
  if (name && featureObject.displayName) {
    featureObject[name] = {
      value: featureObject.value,
      displayName: featureObject.displayName,
      toString: function () {
        return featureObject.value;
      },
    };
  } else if (name !== null) {
    featureObject[name] = featureObject.value;
  } else if (featureObject.displayName !== null) {
    featureObject[featureObject.displayName] = featureObject.value;
  }
  delete featureObject['value'];
}