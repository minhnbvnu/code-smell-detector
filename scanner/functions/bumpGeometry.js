function bumpGeometry(geometry, amount, seed) {
  const p = new THREE.Vector3();
  const normal = new THREE.Vector3();
  const positions = geometry.attributes.position.array;
  const normals = geometry.attributes.normal.array;
  for (let j = 0; j < positions.length; j += 3) {
    p.set(positions[j + 0], positions[j + 1], positions[j + 2]);
    normal.set(positions[j + 0], positions[j + 1], positions[j + 2]);
    const n = amount * bump(p.x, p.y, p.z, seed);
    normal.multiplyScalar(1 + .1 * n);
    p.add(normal);
    positions[j + 0] = p.x;
    positions[j + 1] = p.y;
    positions[j + 2] = p.z;
  }
  geometry.computeVertexNormals();
  return geometry;
}