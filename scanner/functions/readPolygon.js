function readPolygon(node, objectStack) {
  const properties = pushParseAndPop(
    /** @type {Object<string,*>} */ ({}),
    EXTRUDE_AND_ALTITUDE_MODE_PARSERS,
    node,
    objectStack,
  );
  const flatLinearRings = pushParseAndPop(
    [null],
    FLAT_LINEAR_RINGS_PARSERS,
    node,
    objectStack,
  );
  if (flatLinearRings && flatLinearRings[0]) {
    const flatCoordinates = flatLinearRings[0];
    const ends = [flatCoordinates.length];
    for (let i = 1, ii = flatLinearRings.length; i < ii; ++i) {
      extend(flatCoordinates, flatLinearRings[i]);
      ends.push(flatCoordinates.length);
    }
    const polygon = new Polygon(flatCoordinates, 'XYZ', ends);
    polygon.setProperties(properties, true);
    return polygon;
  }
  return undefined;
}