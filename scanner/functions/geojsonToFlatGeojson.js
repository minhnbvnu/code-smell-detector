function geojsonToFlatGeojson(features, options = { coordLength: 2, fixRingWinding: true }) {
    return features.map((feature) => flattenFeature(feature, options));
  }