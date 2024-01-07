function next4Edges(edge) {
  const x = edge[0];
  const y = edge[1];
  return [
    [x + 1, y],
    [x - 1, y],
    [x, y + 1],
    [x, y - 1],
  ];
}