function flatGeojsonToBinary(features, geometryInfo, options) {
    const propArrayTypes = extractNumericPropTypes(features);
    const numericPropKeys = Object.keys(propArrayTypes).filter((k) => propArrayTypes[k] !== Array);
    return fillArrays(features, {
      propArrayTypes,
      ...geometryInfo
    }, {
      numericPropKeys: options && options.numericPropKeys || numericPropKeys,
      PositionDataType: options ? options.PositionDataType : Float32Array
    });
  }