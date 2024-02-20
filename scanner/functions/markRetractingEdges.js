function markRetractingEdges(edges, rejectedVertices) {
  return markEdgesByTheirDestination(edges, rejectedVertices, 'retracting')
}