function triangulatePolygon(polygons, areas, indices, {
    startPosition,
    endPosition,
    coordLength
  }) {
    const start = startPosition * coordLength;
    const end = endPosition * coordLength;
    const polygonPositions = polygons.positions.subarray(start, end);
    const offset = indices[0];
    const holes = indices.slice(1).map((n) => (n - offset) / coordLength);
    const triangles = earcut(polygonPositions, holes, coordLength, areas);
    for (let t = 0, tl = triangles.length; t < tl; ++t) {
      polygons.triangles.push(startPosition + triangles[t]);
    }
  }