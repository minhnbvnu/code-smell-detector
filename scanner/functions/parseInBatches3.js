function parseInBatches3(asyncIterator, options) {
    options = { ...DEFAULT_GEOJSON_LOADER_OPTIONS, ...options };
    options.json = { ...DEFAULT_GEOJSON_LOADER_OPTIONS.geojson, ...options.geojson };
    const geojsonIterator = parseJSONInBatches(asyncIterator, options);
    switch (options.gis.format) {
      case "binary":
        return makeBinaryGeometryIterator(geojsonIterator);
      default:
        return geojsonIterator;
    }
  }