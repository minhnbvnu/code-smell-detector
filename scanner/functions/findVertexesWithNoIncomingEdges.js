function findVertexesWithNoIncomingEdges(vertexes, edges) {
  return R.difference(vertexes, R.map(R.nth(1), edges));
}