function assertProjectionEqual(projection, location, point, delta) {
  assert(planarEqual(projection(location), point, delta || 1e-6)
      && sphericalEqual(projection.invert(point), location, delta || 1e-3), 
    `${[projection.invert(point), projection(location)]} should be projected equivalents; expected: ${[location, point]}`);
}