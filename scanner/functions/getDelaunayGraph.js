function getDelaunayGraph(vertices) {
  const delaunay = Delaunator.from(vertices);
  const triangles = delaunay.triangles;
  const triangulationGraph = createGraph()
  vertices.forEach(v => {
    triangulationGraph.addNode(v.id, v);
  });

  for (let i = triangles.length; i;) {
    --i
    const first = vertices[triangles[i]]
    --i
    const second = vertices[triangles[i]]
    --i
    const third = vertices[triangles[i]]

    addTriangulationLink(first.id, second.id, triangulationGraph)
    addTriangulationLink(second.id, third.id, triangulationGraph)
    addTriangulationLink(third.id, first.id, triangulationGraph)
  }

  return triangulationGraph;
}