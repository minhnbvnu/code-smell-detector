function parseRtePt(node, objectStack) {
  const values = pushParseAndPop({}, RTEPT_PARSERS, node, objectStack);
  if (values) {
    const rteValues = /** @type {!Object} */ (
      objectStack[objectStack.length - 1]
    );
    const flatCoordinates = /** @type {Array<number>} */ (
      rteValues['flatCoordinates']
    );
    const layoutOptions = /** @type {LayoutOptions} */ (
      rteValues['layoutOptions']
    );
    appendCoordinate(flatCoordinates, layoutOptions, node, values);
  }
}