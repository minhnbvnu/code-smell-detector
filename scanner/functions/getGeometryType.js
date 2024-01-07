function getGeometryType(type, numEnds) {
  /** @type {import("../render/Feature.js").Type} */
  let geometryType;
  if (type === 1) {
    geometryType = numEnds === 1 ? 'Point' : 'MultiPoint';
  } else if (type === 2) {
    geometryType = numEnds === 1 ? 'LineString' : 'MultiLineString';
  } else if (type === 3) {
    geometryType = 'Polygon';
    // MultiPolygon not relevant for rendering - winding order determines
    // outer rings of polygons.
  }
  return geometryType;
}