function testCentroid(projection, object) {
  return geoPath()
      .projection(projection)
      .centroid(object);
}