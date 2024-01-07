function makeFractal(depth) {
  const geometry = triangle.clone();
  const graph = coordsToGraph(geometry.getCoordinates());
  for (let i = 0; i < depth; ++i) {
    let node = graph;
    while (node.next) {
      const next = node.next;
      injectNodes(node);
      node = next;
    }
  }
  const coordinates = graphToCoords(graph);
  document.getElementById('count').innerHTML = coordinates.length;
  geometry.setCoordinates(coordinates);
  feature.setGeometry(geometry);
}