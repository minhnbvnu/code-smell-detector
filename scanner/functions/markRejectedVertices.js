function markRejectedVertices(vertices, rejectedVertices) {
  return vertices.map( vertex => {
    const isRejected = findMatchingVertex(vertex, rejectedVertices);

    return isRejected ? vertex.set('rejected', true) : vertex;
  });
}