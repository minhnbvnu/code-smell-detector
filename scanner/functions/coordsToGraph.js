function coordsToGraph(coordinates) {
  const graph = {
    point: coordinates[0],
  };
  const length = coordinates.length;
  for (let level = 0, node = graph; level < length - 1; ++level) {
    node.next = {
      point: coordinates[level + 1],
    };
    node = node.next;
  }
  return graph;
}