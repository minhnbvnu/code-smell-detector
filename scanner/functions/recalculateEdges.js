function recalculateEdges(vertices) {
  let edges = [];

  vertices.forEach( vertex => {
    // Find the vertices in the next region
    const nextVertices = getVerticesInNextRegion(vertices, vertex.get('region'));

    // Create an edge from this vertex to each nextVertex
    nextVertices.forEach( nextVertex => {
      edges.push({
        from: vertex.get('id'),
        to:   nextVertex.get('id')
      });
    });
  });

  return fromJS(edges);
}