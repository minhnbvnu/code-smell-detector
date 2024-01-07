function readWpt(node, objectStack) {
  const options = /** @type {import("./Feature.js").ReadOptions} */ (
    objectStack[0]
  );
  const values = pushParseAndPop({}, WPT_PARSERS, node, objectStack);
  if (!values) {
    return undefined;
  }
  const layoutOptions = /** @type {LayoutOptions} */ ({});
  const coordinates = appendCoordinate([], layoutOptions, node, values);
  const layout = applyLayoutOptions(layoutOptions, coordinates);
  const geometry = new Point(coordinates, layout);
  transformGeometryWithOptions(geometry, false, options);
  const feature = new Feature(geometry);
  feature.setProperties(values, true);
  return feature;
}