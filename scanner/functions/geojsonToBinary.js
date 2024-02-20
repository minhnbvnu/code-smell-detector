function geojsonToBinary(features, options = { fixRingWinding: true }) {
    const geometryInfo = extractGeometryInfo(features);
    const coordLength = geometryInfo.coordLength;
    const { fixRingWinding } = options;
    const flatFeatures = geojsonToFlatGeojson(features, { coordLength, fixRingWinding });
    return flatGeojsonToBinary(flatFeatures, geometryInfo, {
      numericPropKeys: options.numericPropKeys,
      PositionDataType: options.PositionDataType || Float32Array
    });
  }