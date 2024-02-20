function icosahedronCoords(i) {
  const x = icosahedronVertices[indices[i] * 3];
  const y = icosahedronVertices[indices[i] * 3 + 1];
  const z = icosahedronVertices[indices[i] * 3 + 2];
  return [x, y, z];
}