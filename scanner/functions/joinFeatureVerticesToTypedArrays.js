function joinFeatureVerticesToTypedArrays(features) {
  let vertexCount = 0;
  for (const feature of features) {
    if (feature.vertices) {
      vertexCount += getVertexCount(feature.vertices);
    }
  }

  if (vertexCount === 0) {
    return null;
  }

  const vertices = new Float64Array(vertexCount * 3);
  let i = 0;

  for (const feature of features) {
    if (feature.vertices) {
      const count = getVertexCount(feature.vertices);
      if (Number.isFinite(feature.vertices[0])) {
        vertices.set(feature.vertices, i);
        i += count * 3;
      } else {
        for (const p of feature.vertices) {
          vertices.set(p, i);
          i += 3;
        }
      }
      feature.vertices = vertices.subarray(i - count * 3, i);
    }
  }

  return vertices;
}