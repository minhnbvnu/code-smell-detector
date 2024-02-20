function meshClose(x0, y0, z0) {
  const count = currentGeometries.reduce((ac, v) => {
    return ac + v.attributes.position.count;
  }, 0);
  const geometry = new THREE.BufferGeometry();
  geometry.addAttribute('position', new THREE.BufferAttribute(new Float32Array(count * 3), 3));
  geometry.addAttribute('normal', new THREE.BufferAttribute(new Float32Array(count * 3), 3));

  let offset = 0;
  currentGeometries.forEach((g) => {
    geometry.merge(g, offset);
    offset += g.attributes.position.count;
  });
  m.identity().makeTranslation(x0, y0, z0);
  geometry.applyMatrix(m);
  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
}