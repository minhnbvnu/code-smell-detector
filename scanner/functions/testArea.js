function testArea(projection, object) {
  return geoPath()
      .projection(projection)
      .area(object);
}