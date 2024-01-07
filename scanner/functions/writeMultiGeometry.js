function writeMultiGeometry(node, geometry, objectStack) {
  /** @type {import("../xml.js").NodeStackItem} */
  const context = {node: node};
  const type = geometry.getType();
  /** @type {Array<import("../geom/Geometry.js").default>} */
  let geometries = [];
  /** @type {function(*, Array<*>, string=): (Node|undefined)} */
  let factory;
  if (type === 'GeometryCollection') {
    /** @type {GeometryCollection} */ (geometry)
      .getGeometriesArrayRecursive()
      .forEach(function (geometry) {
        const type = geometry.getType();
        if (type === 'MultiPoint') {
          geometries = geometries.concat(
            /** @type {MultiPoint} */ (geometry).getPoints(),
          );
        } else if (type === 'MultiLineString') {
          geometries = geometries.concat(
            /** @type {MultiLineString} */ (geometry).getLineStrings(),
          );
        } else if (type === 'MultiPolygon') {
          geometries = geometries.concat(
            /** @type {MultiPolygon} */ (geometry).getPolygons(),
          );
        } else if (
          type === 'Point' ||
          type === 'LineString' ||
          type === 'Polygon'
        ) {
          geometries.push(geometry);
        } else {
          throw new Error('Unknown geometry type');
        }
      });
    factory = GEOMETRY_NODE_FACTORY;
  } else if (type === 'MultiPoint') {
    geometries = /** @type {MultiPoint} */ (geometry).getPoints();
    factory = POINT_NODE_FACTORY;
  } else if (type === 'MultiLineString') {
    geometries = /** @type {MultiLineString} */ (geometry).getLineStrings();
    factory = LINE_STRING_NODE_FACTORY;
  } else if (type === 'MultiPolygon') {
    geometries = /** @type {MultiPolygon} */ (geometry).getPolygons();
    factory = POLYGON_NODE_FACTORY;
  } else {
    throw new Error('Unknown geometry type');
  }
  pushSerializeAndPop(
    context,
    MULTI_GEOMETRY_SERIALIZERS,
    factory,
    geometries,
    objectStack,
  );
}