function line(interpolate, transform, squaredTolerance) {
  // FIXME reduce garbage generation
  // FIXME optimize stack operations

  /** @type {Array<number>} */
  const flatCoordinates = [];

  let geoA = interpolate(0);
  let geoB = interpolate(1);

  let a = transform(geoA);
  let b = transform(geoB);

  /** @type {Array<import("../../coordinate.js").Coordinate>} */
  const geoStack = [geoB, geoA];
  /** @type {Array<import("../../coordinate.js").Coordinate>} */
  const stack = [b, a];
  /** @type {Array<number>} */
  const fractionStack = [1, 0];

  /** @type {!Object<string, boolean>} */
  const fractions = {};

  let maxIterations = 1e5;
  let geoM, m, fracA, fracB, fracM, key;

  while (--maxIterations > 0 && fractionStack.length > 0) {
    // Pop the a coordinate off the stack
    fracA = fractionStack.pop();
    geoA = geoStack.pop();
    a = stack.pop();
    // Add the a coordinate if it has not been added yet
    key = fracA.toString();
    if (!(key in fractions)) {
      flatCoordinates.push(a[0], a[1]);
      fractions[key] = true;
    }
    // Pop the b coordinate off the stack
    fracB = fractionStack.pop();
    geoB = geoStack.pop();
    b = stack.pop();
    // Find the m point between the a and b coordinates
    fracM = (fracA + fracB) / 2;
    geoM = interpolate(fracM);
    m = transform(geoM);
    if (
      squaredSegmentDistance(m[0], m[1], a[0], a[1], b[0], b[1]) <
      squaredTolerance
    ) {
      // If the m point is sufficiently close to the straight line, then we
      // discard it.  Just use the b coordinate and move on to the next line
      // segment.
      flatCoordinates.push(b[0], b[1]);
      key = fracB.toString();
      fractions[key] = true;
    } else {
      // Otherwise, we need to subdivide the current line segment.  Split it
      // into two and push the two line segments onto the stack.
      fractionStack.push(fracB, fracM, fracM, fracA);
      stack.push(b, m, m, a);
      geoStack.push(geoB, geoM, geoM, geoA);
    }
  }

  return flatCoordinates;
}