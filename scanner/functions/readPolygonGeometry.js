function readPolygonGeometry(object, arcs) {
  const coordinates = [];
  for (let i = 0, ii = object['arcs'].length; i < ii; ++i) {
    coordinates[i] = concatenateArcs(object['arcs'][i], arcs);
  }
  return new Polygon(coordinates);
}