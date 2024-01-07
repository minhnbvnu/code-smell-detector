function outerBoundaryIsParser(node, objectStack) {
  /** @type {Array<number>|undefined} */
  const flatLinearRing = pushParseAndPop(
    undefined,
    OUTER_BOUNDARY_IS_PARSERS,
    node,
    objectStack,
  );
  if (flatLinearRing) {
    const flatLinearRings =
      /** @type {Array<Array<number>>} */
      (objectStack[objectStack.length - 1]);
    flatLinearRings[0] = flatLinearRing;
  }
}