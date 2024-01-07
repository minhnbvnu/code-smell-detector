function readRte(node, objectStack) {
  const options = /** @type {import("./Feature.js").ReadOptions} */ (
    objectStack[0]
  );
  const values = pushParseAndPop(
    {
      'flatCoordinates': [],
      'layoutOptions': {},
    },
    RTE_PARSERS,
    node,
    objectStack,
  );
  if (!values) {
    return undefined;
  }
  const flatCoordinates =
    /** @type {Array<number>} */
    (values['flatCoordinates']);
  delete values['flatCoordinates'];
  const layoutOptions = /** @type {LayoutOptions} */ (values['layoutOptions']);
  delete values['layoutOptions'];
  const layout = applyLayoutOptions(layoutOptions, flatCoordinates);
  const geometry = new LineString(flatCoordinates, layout);
  transformGeometryWithOptions(geometry, false, options);
  const feature = new Feature(geometry);
  feature.setProperties(values, true);
  return feature;
}