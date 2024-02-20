function tetrahedronCoords(i) {
  const x = tetraheadronVertices[i * 3];
  const y = tetraheadronVertices[i * 3 + 1];
  const z = tetraheadronVertices[i * 3 + 2];
  return [x, y, z];
}