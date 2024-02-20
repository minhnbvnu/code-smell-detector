function testBounds(projection, object) {
  return geoPath()
      .projection(projection)
      .bounds(object);
}