function innerBoundaryIsParser(node, objectStack) {
  const innerBoundaryFlatLinearRings = pushParseAndPop(
    /** @type {Array<Array<number>>} */ ([]),
    INNER_BOUNDARY_IS_PARSERS,
    node,
    objectStack,
  );
  if (innerBoundaryFlatLinearRings.length > 0) {
    const flatLinearRings =
      /** @type {Array<Array<number>>} */
      (objectStack[objectStack.length - 1]);
    flatLinearRings.push(...innerBoundaryFlatLinearRings);
  }
}