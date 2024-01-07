function graphToCoords(graph) {
  const coordinates = [graph.point];
  for (let node = graph, i = 1; node.next; node = node.next, ++i) {
    coordinates[i] = node.next.point;
  }
  return coordinates;
}