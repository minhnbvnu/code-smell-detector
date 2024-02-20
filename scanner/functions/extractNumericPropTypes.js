function extractNumericPropTypes(features) {
    const propArrayTypes = {};
    for (const feature of features) {
      if (feature.properties) {
        for (const key in feature.properties) {
          const val = feature.properties[key];
          propArrayTypes[key] = deduceArrayType(val, propArrayTypes[key]);
        }
      }
    }
    return propArrayTypes;
  }