function unFlattenVertices(vertices) {
  const result = [];
  for (let i = 0; i < vertices.length; i = i + 3) {
    result.push([vertices[i], vertices[i + 1], vertices[i + 2]]);
  }

  return result;
}