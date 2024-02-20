function isPathClosed(vertices) {
  const firstVertex = vertices[0];
  const lastVertex = vertices[vertices.length - 1];

  return (
    firstVertex[0] === lastVertex[0] &&
    firstVertex[1] === lastVertex[1] &&
    firstVertex[2] === lastVertex[2]
  );
}