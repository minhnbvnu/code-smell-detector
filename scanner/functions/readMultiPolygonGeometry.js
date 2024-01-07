function readMultiPolygonGeometry(object, arcs) {
  const coordinates = [];
  for (let i = 0, ii = object['arcs'].length; i < ii; ++i) {
    // for each polygon
    const polyArray = object['arcs'][i];
    const ringCoords = [];
    for (let j = 0, jj = polyArray.length; j < jj; ++j) {
      // for each ring
      ringCoords[j] = concatenateArcs(polyArray[j], arcs);
    }
    coordinates[i] = ringCoords;
  }
  return new MultiPolygon(coordinates);
}