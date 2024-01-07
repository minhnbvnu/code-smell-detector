function readGeometryInternal(object, options) {
  if (!object) {
    return null;
  }

  /** @type {import("./Feature.js").GeometryObject} */
  let geometry;
  switch (object['type']) {
    case 'Point': {
      geometry = readPointGeometry(/** @type {GeoJSONPoint} */ (object));
      break;
    }
    case 'LineString': {
      geometry = readLineStringGeometry(
        /** @type {GeoJSONLineString} */ (object),
      );
      break;
    }
    case 'Polygon': {
      geometry = readPolygonGeometry(/** @type {GeoJSONPolygon} */ (object));
      break;
    }
    case 'MultiPoint': {
      geometry = readMultiPointGeometry(
        /** @type {GeoJSONMultiPoint} */ (object),
      );
      break;
    }
    case 'MultiLineString': {
      geometry = readMultiLineStringGeometry(
        /** @type {GeoJSONMultiLineString} */ (object),
      );
      break;
    }
    case 'MultiPolygon': {
      geometry = readMultiPolygonGeometry(
        /** @type {GeoJSONMultiPolygon} */ (object),
      );
      break;
    }
    case 'GeometryCollection': {
      geometry = readGeometryCollectionGeometry(
        /** @type {GeoJSONGeometryCollection} */ (object),
      );
      break;
    }
    default: {
      throw new Error('Unsupported GeoJSON type: ' + object['type']);
    }
  }
  return geometry;
}