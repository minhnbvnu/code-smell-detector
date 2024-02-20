function markEdgesByTheirDestination(edges, vertices, prop) {
  return edges.map( edge => {
    const pointsToVertex = vertices.some( vertex => (
      vertex.get('id') === edge.get('to')
    ));

    return edge.set(prop, pointsToVertex);
  });
}