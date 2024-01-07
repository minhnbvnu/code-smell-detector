function readMultiGeometry(node, objectStack) {
  const geometries = pushParseAndPop(
    [],
    MULTI_GEOMETRY_PARSERS,
    node,
    objectStack,
  );
  if (!geometries) {
    return null;
  }
  if (geometries.length === 0) {
    return new GeometryCollection(geometries);
  }
  let multiGeometry;
  let homogeneous = true;
  const type = geometries[0].getType();
  let geometry;
  for (let i = 1, ii = geometries.length; i < ii; ++i) {
    geometry = geometries[i];
    if (geometry.getType() != type) {
      homogeneous = false;
      break;
    }
  }
  if (homogeneous) {
    let layout;
    let flatCoordinates;
    if (type == 'Point') {
      const point = geometries[0];
      layout = point.getLayout();
      flatCoordinates = point.getFlatCoordinates();
      for (let i = 1, ii = geometries.length; i < ii; ++i) {
        geometry = geometries[i];
        extend(flatCoordinates, geometry.getFlatCoordinates());
      }
      multiGeometry = new MultiPoint(flatCoordinates, layout);
      setCommonGeometryProperties(multiGeometry, geometries);
    } else if (type == 'LineString') {
      multiGeometry = new MultiLineString(geometries);
      setCommonGeometryProperties(multiGeometry, geometries);
    } else if (type == 'Polygon') {
      multiGeometry = new MultiPolygon(geometries);
      setCommonGeometryProperties(multiGeometry, geometries);
    } else if (type == 'GeometryCollection') {
      multiGeometry = new GeometryCollection(geometries);
    } else {
      throw new Error('Unknown geometry type found');
    }
  } else {
    multiGeometry = new GeometryCollection(geometries);
  }
  return /** @type {import("../geom/Geometry.js").default} */ (multiGeometry);
}