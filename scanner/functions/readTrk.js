function readTrk(node, objectStack) {
  const options = /** @type {import("./Feature.js").ReadOptions} */ (
    objectStack[0]
  );
  const values = pushParseAndPop(
    {
      'flatCoordinates': [],
      'ends': [],
      'layoutOptions': {},
    },
    TRK_PARSERS,
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
  const ends = /** @type {Array<number>} */ (values['ends']);
  delete values['ends'];
  const layoutOptions = /** @type {LayoutOptions} */ (values['layoutOptions']);
  delete values['layoutOptions'];
  const layout = applyLayoutOptions(layoutOptions, flatCoordinates, ends);
  const geometry = new MultiLineString(flatCoordinates, layout, ends);
  transformGeometryWithOptions(geometry, false, options);
  const feature = new Feature(geometry);
  feature.setProperties(values, true);
  return feature;
}