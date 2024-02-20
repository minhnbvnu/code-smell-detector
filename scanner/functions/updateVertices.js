function updateVertices(t) {

  const pos = baseGeometry.attributes.position.array;

  for (let ptr = 0; ptr < pos.length; ptr += 3) {
    const x = pos[ptr + 0];
    const y = pos[ptr + 1];
    const z = pos[ptr + 2];
    pos[ptr + 1] = map(x, y, z, t);
  }
  baseGeometry.computeFaceNormals();
  baseGeometry.computeVertexNormals();
  baseGeometry.attributes.position.needsUpdate = true;

  for (let side of sides) {
    const positions = side.array;
    for (let j = 0; j < positions.length; j += 3) {
      const y = positions[j + 1];
      if (y > 0) {
        const x = positions[j];
        const z = positions[j + 2];
        positions[j + 1] = map(x, y, z, t);
      }
    }
    side.needsUpdate = true;
  }
}