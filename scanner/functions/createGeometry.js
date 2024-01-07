function createGeometry(object, options) {
  if (!object) {
    return null;
  }
  if (Array.isArray(object)) {
    const geometries = object.map((geometry) =>
      createGeometry(geometry, options),
    );
    return new GeometryCollection(geometries);
  }
  const Geometry = GeometryConstructor[object.type];
  return transformGeometryWithOptions(
    new Geometry(object.flatCoordinates, object.layout, object.ends),
    false,
    options,
  );
}