function handlePolygon(geometry, polygons, indexMap, coordLength, properties) {
    polygons.positions.set(geometry.data, indexMap.polygonPosition * coordLength);
    const nPositions = geometry.data.length / coordLength;
    fillNumericProperties(polygons, properties, indexMap.polygonPosition, nPositions);
    polygons.globalFeatureIds.fill(indexMap.feature, indexMap.polygonPosition, indexMap.polygonPosition + nPositions);
    polygons.featureIds.fill(indexMap.polygonFeature, indexMap.polygonPosition, indexMap.polygonPosition + nPositions);
    for (let l = 0, ll = geometry.indices.length; l < ll; ++l) {
      const startPosition = indexMap.polygonPosition;
      polygons.polygonIndices[indexMap.polygonObject++] = startPosition;
      const areas = geometry.areas[l];
      const indices = geometry.indices[l];
      const nextIndices = geometry.indices[l + 1];
      for (let i = 0, il = indices.length; i < il; ++i) {
        const start = indices[i];
        const end = i === il - 1 ? nextIndices === void 0 ? geometry.data.length : nextIndices[0] : indices[i + 1];
        polygons.primitivePolygonIndices[indexMap.polygonRing++] = indexMap.polygonPosition;
        indexMap.polygonPosition += (end - start) / coordLength;
      }
      const endPosition = indexMap.polygonPosition;
      triangulatePolygon(polygons, areas, indices, { startPosition, endPosition, coordLength });
    }
  }