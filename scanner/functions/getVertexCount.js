function getVertexCount(vertices) {
  return Number.isFinite(vertices[0]) ? vertices.length / 3 : vertices.length;
}