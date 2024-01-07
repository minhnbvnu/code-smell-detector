function readWay(node, objectStack) {
  const id = node.getAttribute('id');
  const values = pushParseAndPop(
    {
      id: id,
      ndrefs: [],
      flatCoordinates: [],
      tags: {},
    },
    WAY_PARSERS,
    node,
    objectStack,
  );
  const state = /** @type {Object} */ (objectStack[objectStack.length - 1]);
  state.ways.push(values);
}