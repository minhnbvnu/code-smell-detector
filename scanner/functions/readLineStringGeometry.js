function readLineStringGeometry(object, arcs) {
  const coordinates = concatenateArcs(object['arcs'], arcs);
  return new LineString(coordinates);
}