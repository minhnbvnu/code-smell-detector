function parseTrkSeg(node, objectStack) {
  const values = /** @type {Object} */ (objectStack[objectStack.length - 1]);
  parseNode(TRKSEG_PARSERS, node, objectStack);
  const flatCoordinates =
    /** @type {Array<number>} */
    (values['flatCoordinates']);
  const ends = /** @type {Array<number>} */ (values['ends']);
  ends.push(flatCoordinates.length);
}