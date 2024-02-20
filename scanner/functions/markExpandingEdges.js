function markExpandingEdges(edges, newVertices) {
  return markEdgesByTheirDestination(edges, newVertices, 'expanding')
}