function verticesHaveChangedPositions(vertices, nextVertices) {
  return vertices.some( vertex => {
    const nextVertex = findMatchingVertex(vertex, nextVertices)
    return nextVertex && vertex.get('region') !== nextVertex.get('region');
  });
}