function cubeCoords(i) {
  const x = cubeVertices[i * 3];
  const y = cubeVertices[i * 3 + 1];
  const z = cubeVertices[i * 3 + 2];
  return [x, y, z];
}