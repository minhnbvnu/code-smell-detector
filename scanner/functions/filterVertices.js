function filterVertices(vertices) {
  const THRESHOLD = getXVIZConfig().pathDistanceThreshold;

  if (THRESHOLD === 0.0) {
    return vertices;
  }
  const isFlatArray = Number.isFinite(vertices[0]);
  const vertexCount = isFlatArray ? vertices.length / 3 : vertices.length;

  const newVertices = [];
  let index = 0;
  let lastEmittedVertex = null;
  let lastEmittedIndex = -1;
  for (let i = 0; i < vertexCount; i++) {
    const v = getPointAtIndex(vertices, i, isFlatArray);
    const shouldAddVert = lastEmittedIndex === -1 || lastEmittedVertex.distance(v) > THRESHOLD;
    if (shouldAddVert) {
      newVertices[index++] = v[0];
      newVertices[index++] = v[1];
      newVertices[index++] = v[2];
      lastEmittedVertex = new Vector3(v[0], v[1], v[2]);
      lastEmittedIndex = i;
    }
  }

  // Make sure we always emit the last vertex
  if (lastEmittedIndex !== vertexCount - 1) {
    const lastVertex = getPointAtIndex(vertices, vertexCount - 1, isFlatArray);
    index -= 3;
    newVertices[index++] = lastVertex[0];
    newVertices[index++] = lastVertex[1];
    newVertices[index++] = lastVertex[2];
  }

  return newVertices;
}