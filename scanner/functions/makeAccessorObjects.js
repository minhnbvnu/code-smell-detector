function makeAccessorObjects(points, lines, polygons, coordLength) {
    return {
      points: {
        ...points,
        positions: { value: points.positions, size: coordLength },
        globalFeatureIds: { value: points.globalFeatureIds, size: 1 },
        featureIds: { value: points.featureIds, size: 1 },
        numericProps: wrapProps(points.numericProps, 1)
      },
      lines: {
        ...lines,
        positions: { value: lines.positions, size: coordLength },
        pathIndices: { value: lines.pathIndices, size: 1 },
        globalFeatureIds: { value: lines.globalFeatureIds, size: 1 },
        featureIds: { value: lines.featureIds, size: 1 },
        numericProps: wrapProps(lines.numericProps, 1)
      },
      polygons: {
        ...polygons,
        positions: { value: polygons.positions, size: coordLength },
        polygonIndices: { value: polygons.polygonIndices, size: 1 },
        primitivePolygonIndices: { value: polygons.primitivePolygonIndices, size: 1 },
        triangles: { value: new Uint32Array(polygons.triangles), size: 1 },
        globalFeatureIds: { value: polygons.globalFeatureIds, size: 1 },
        featureIds: { value: polygons.featureIds, size: 1 },
        numericProps: wrapProps(polygons.numericProps, 1)
      }
    };
  }