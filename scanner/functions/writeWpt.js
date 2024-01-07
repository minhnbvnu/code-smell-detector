function writeWpt(node, feature, objectStack) {
  const options = /** @type {import("./Feature.js").WriteOptions} */ (
    objectStack[0]
  );
  const context = objectStack[objectStack.length - 1];
  context['properties'] = feature.getProperties();
  const geometry = feature.getGeometry();
  if (geometry.getType() == 'Point') {
    const point = /** @type {Point} */ (
      transformGeometryWithOptions(geometry, true, options)
    );
    context['geometryLayout'] = point.getLayout();
    writeWptType(node, point.getCoordinates(), objectStack);
  }
}