function createRenderFeature(object, options) {
  const geometry = object.geometry;
  if (!geometry) {
    return [];
  }
  if (Array.isArray(geometry)) {
    return geometry
      .map((geometry) => createRenderFeature({...object, geometry}))
      .flat();
  }

  const geometryType =
    geometry.type === 'MultiPolygon' ? 'Polygon' : geometry.type;
  if (geometryType === 'GeometryCollection' || geometryType === 'Circle') {
    throw new Error('Unsupported geometry type: ' + geometryType);
  }

  const stride = geometry.layout.length;
  return transformGeometryWithOptions(
    new RenderFeature(
      geometryType,
      geometryType === 'Polygon'
        ? orientFlatCoordinates(geometry.flatCoordinates, geometry.ends, stride)
        : geometry.flatCoordinates,
      geometry.ends?.flat(),
      stride,
      object.properties || {},
      object.id,
    ).enableSimplifyTransformed(),
    false,
    options,
  );
}