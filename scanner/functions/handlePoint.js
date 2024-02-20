function handlePoint(geometry, points, indexMap, coordLength, properties) {
    points.positions.set(geometry.data, indexMap.pointPosition * coordLength);
    const nPositions = geometry.data.length / coordLength;
    fillNumericProperties(points, properties, indexMap.pointPosition, nPositions);
    points.globalFeatureIds.fill(indexMap.feature, indexMap.pointPosition, indexMap.pointPosition + nPositions);
    points.featureIds.fill(indexMap.pointFeature, indexMap.pointPosition, indexMap.pointPosition + nPositions);
    indexMap.pointPosition += nPositions;
  }