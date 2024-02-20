function octahedronCoords(i) {
  const x = octahedronVertices[i * 3];
  const y = octahedronVertices[i * 3 + 1];
  const z = octahedronVertices[i * 3 + 2];
  return [x, y, z];
}