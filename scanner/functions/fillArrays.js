function fillArrays(features, geometryInfo, options) {
    const {
      pointPositionsCount,
      pointFeaturesCount,
      linePositionsCount,
      linePathsCount,
      lineFeaturesCount,
      polygonPositionsCount,
      polygonObjectsCount,
      polygonRingsCount,
      polygonFeaturesCount,
      propArrayTypes,
      coordLength
    } = geometryInfo;
    const { numericPropKeys = [], PositionDataType = Float32Array } = options;
    const hasGlobalId = features[0] && "id" in features[0];
    const GlobalFeatureIdsDataType = features.length > 65535 ? Uint32Array : Uint16Array;
    const points = {
      type: "Point",
      positions: new PositionDataType(pointPositionsCount * coordLength),
      globalFeatureIds: new GlobalFeatureIdsDataType(pointPositionsCount),
      featureIds: pointFeaturesCount > 65535 ? new Uint32Array(pointPositionsCount) : new Uint16Array(pointPositionsCount),
      numericProps: {},
      properties: [],
      fields: []
    };
    const lines = {
      type: "LineString",
      pathIndices: linePositionsCount > 65535 ? new Uint32Array(linePathsCount + 1) : new Uint16Array(linePathsCount + 1),
      positions: new PositionDataType(linePositionsCount * coordLength),
      globalFeatureIds: new GlobalFeatureIdsDataType(linePositionsCount),
      featureIds: lineFeaturesCount > 65535 ? new Uint32Array(linePositionsCount) : new Uint16Array(linePositionsCount),
      numericProps: {},
      properties: [],
      fields: []
    };
    const polygons = {
      type: "Polygon",
      polygonIndices: polygonPositionsCount > 65535 ? new Uint32Array(polygonObjectsCount + 1) : new Uint16Array(polygonObjectsCount + 1),
      primitivePolygonIndices: polygonPositionsCount > 65535 ? new Uint32Array(polygonRingsCount + 1) : new Uint16Array(polygonRingsCount + 1),
      positions: new PositionDataType(polygonPositionsCount * coordLength),
      triangles: [],
      globalFeatureIds: new GlobalFeatureIdsDataType(polygonPositionsCount),
      featureIds: polygonFeaturesCount > 65535 ? new Uint32Array(polygonPositionsCount) : new Uint16Array(polygonPositionsCount),
      numericProps: {},
      properties: [],
      fields: []
    };
    for (const object of [points, lines, polygons]) {
      for (const propName of numericPropKeys) {
        const T = propArrayTypes[propName];
        object.numericProps[propName] = new T(object.positions.length / coordLength);
      }
    }
    lines.pathIndices[linePathsCount] = linePositionsCount;
    polygons.polygonIndices[polygonObjectsCount] = polygonPositionsCount;
    polygons.primitivePolygonIndices[polygonRingsCount] = polygonPositionsCount;
    const indexMap = {
      pointPosition: 0,
      pointFeature: 0,
      linePosition: 0,
      linePath: 0,
      lineFeature: 0,
      polygonPosition: 0,
      polygonObject: 0,
      polygonRing: 0,
      polygonFeature: 0,
      feature: 0
    };
    for (const feature of features) {
      const geometry = feature.geometry;
      const properties = feature.properties || {};
      switch (geometry.type) {
        case "Point":
          handlePoint(geometry, points, indexMap, coordLength, properties);
          points.properties.push(keepStringProperties(properties, numericPropKeys));
          if (hasGlobalId) {
            points.fields.push({ id: feature.id });
          }
          indexMap.pointFeature++;
          break;
        case "LineString":
          handleLineString(geometry, lines, indexMap, coordLength, properties);
          lines.properties.push(keepStringProperties(properties, numericPropKeys));
          if (hasGlobalId) {
            lines.fields.push({ id: feature.id });
          }
          indexMap.lineFeature++;
          break;
        case "Polygon":
          handlePolygon(geometry, polygons, indexMap, coordLength, properties);
          polygons.properties.push(keepStringProperties(properties, numericPropKeys));
          if (hasGlobalId) {
            polygons.fields.push({ id: feature.id });
          }
          indexMap.polygonFeature++;
          break;
        default:
          throw new Error("Invalid geometry type");
      }
      indexMap.feature++;
    }
    return makeAccessorObjects(points, lines, polygons, coordLength);
  }