function filterVerticesNotInSecondGroup(vertices, nextVertices) {
  return vertices.filter( vertex => !findMatchingVertex(vertex, nextVertices) );
}