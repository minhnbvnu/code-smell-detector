function writeGeometry(geometry, options) {
  geometry = transformGeometryWithOptions(geometry, true, options);

  const type = geometry.getType();

  /** @type {GeoJSONGeometry} */
  let geoJSON;
  switch (type) {
    case 'Point': {
      geoJSON = writePointGeometry(
        /** @type {import("../geom/Point.js").default} */ (geometry),
        options,
      );
      break;
    }
    case 'LineString': {
      geoJSON = writeLineStringGeometry(
        /** @type {import("../geom/LineString.js").default} */ (geometry),
        options,
      );
      break;
    }
    case 'Polygon': {
      geoJSON = writePolygonGeometry(
        /** @type {import("../geom/Polygon.js").default} */ (geometry),
        options,
      );
      break;
    }
    case 'MultiPoint': {
      geoJSON = writeMultiPointGeometry(
        /** @type {import("../geom/MultiPoint.js").default} */ (geometry),
        options,
      );
      break;
    }
    case 'MultiLineString': {
      geoJSON = writeMultiLineStringGeometry(
        /** @type {import("../geom/MultiLineString.js").default} */ (geometry),
        options,
      );
      break;
    }
    case 'MultiPolygon': {
      geoJSON = writeMultiPolygonGeometry(
        /** @type {import("../geom/MultiPolygon.js").default} */ (geometry),
        options,
      );
      break;
    }
    case 'GeometryCollection': {
      geoJSON = writeGeometryCollectionGeometry(
        /** @type {import("../geom/GeometryCollection.js").default} */ (
          geometry
        ),
        options,
      );
      break;
    }
    case 'Circle': {
      geoJSON = {
        type: 'GeometryCollection',
        geometries: [],
      };
      break;
    }
    default: {
      throw new Error('Unsupported geometry type: ' + type);
    }
  }
  return geoJSON;
}