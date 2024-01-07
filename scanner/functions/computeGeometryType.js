function computeGeometryType(geometry) {
  if (!geometry) {
    return '';
  }
  const type = geometry.getType();
  switch (type) {
    case 'Point':
    case 'LineString':
    case 'Polygon':
      return type;
    case 'MultiPoint':
    case 'MultiLineString':
    case 'MultiPolygon':
      return /** @type {'Point'|'LineString'|'Polygon'} */ (type.substring(5));
    case 'Circle':
      return 'Polygon';
    case 'GeometryCollection':
      return computeGeometryType(
        /** @type {import("../geom/GeometryCollection.js").default} */ (
          geometry
        ).getGeometries()[0],
      );
    default:
      return '';
  }
}