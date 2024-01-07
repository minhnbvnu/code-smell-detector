function parseTrkPt(node, objectStack) {
  const values = pushParseAndPop({}, TRKPT_PARSERS, node, objectStack);
  if (values) {
    const trkValues = /** @type {!Object} */ (
      objectStack[objectStack.length - 1]
    );
    const flatCoordinates = /** @type {Array<number>} */ (
      trkValues['flatCoordinates']
    );
    const layoutOptions = /** @type {LayoutOptions} */ (
      trkValues['layoutOptions']
    );
    appendCoordinate(flatCoordinates, layoutOptions, node, values);
  }
}