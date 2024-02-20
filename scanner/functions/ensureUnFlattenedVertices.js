function ensureUnFlattenedVertices(vertices) {
  if (vertices.length > 0 && !Array.isArray(vertices[0])) {
    return unFlattenVertices(vertices);
  }

  return vertices;
}