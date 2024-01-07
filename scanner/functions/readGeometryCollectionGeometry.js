function readGeometryCollectionGeometry(object, options) {
  const geometries = object['geometries'].map(
    /**
     * @param {GeoJSONGeometry} geometry Geometry.
     * @return {import("./Feature.js").GeometryObject} geometry Geometry.
     */
    function (geometry) {
      return readGeometryInternal(geometry, options);
    },
  );
  return geometries;
}