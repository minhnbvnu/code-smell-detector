function readNode(node, objectStack) {
  const options = /** @type {import("./Feature.js").ReadOptions} */ (
    objectStack[0]
  );
  const state = /** @type {Object} */ (objectStack[objectStack.length - 1]);
  const id = node.getAttribute('id');
  /** @type {import("../coordinate.js").Coordinate} */
  const coordinates = [
    parseFloat(node.getAttribute('lon')),
    parseFloat(node.getAttribute('lat')),
  ];
  state.nodes[id] = coordinates;

  const values = pushParseAndPop(
    {
      tags: {},
    },
    NODE_PARSERS,
    node,
    objectStack,
  );
  if (!isEmpty(values.tags)) {
    const geometry = new Point(coordinates);
    transformGeometryWithOptions(geometry, false, options);
    const feature = new Feature(geometry);
    if (id !== undefined) {
      feature.setId(id);
    }
    feature.setProperties(values.tags, true);
    state.features.push(feature);
  }
}