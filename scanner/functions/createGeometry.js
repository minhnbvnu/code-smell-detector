function createGeometry (data) {
  var geometryType = data.primitive;
  var GeometryClass = geometries[geometryType] && geometries[geometryType].Geometry;
  var geometryInstance = new GeometryClass();

  if (!GeometryClass) { throw new Error('Unknown geometry `' + geometryType + '`'); }

  geometryInstance.init(data);
  return geometryInstance.geometry;
}