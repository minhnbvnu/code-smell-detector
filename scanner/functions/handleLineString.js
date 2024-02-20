function handleLineString(geometry, lines, indexMap, coordLength, properties) {
    lines.positions.set(geometry.data, indexMap.linePosition * coordLength);
    const nPositions = geometry.data.length / coordLength;
    fillNumericProperties(lines, properties, indexMap.linePosition, nPositions);
    lines.globalFeatureIds.fill(indexMap.feature, indexMap.linePosition, indexMap.linePosition + nPositions);
    lines.featureIds.fill(indexMap.lineFeature, indexMap.linePosition, indexMap.linePosition + nPositions);
    for (let i = 0, il = geometry.indices.length; i < il; ++i) {
      const start = geometry.indices[i];
      const end = i === il - 1 ? geometry.data.length : geometry.indices[i + 1];
      lines.pathIndices[indexMap.linePath++] = indexMap.linePosition;
      indexMap.linePosition += (end - start) / coordLength;
    }
  }