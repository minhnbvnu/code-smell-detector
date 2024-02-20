function parseTextSync3(text, options) {
    options = { ...DEFAULT_GEOJSON_LOADER_OPTIONS, ...options };
    options.json = { ...DEFAULT_GEOJSON_LOADER_OPTIONS.geojson, ...options.geojson };
    options.gis = options.gis || {};
    const json = parseJSONSync(text, options);
    switch (options.gis.format) {
      case "binary":
        return geojsonToBinary(json);
      default:
        return json;
    }
  }