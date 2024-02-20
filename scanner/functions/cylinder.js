function cylinder(x1, y1, z1, x2, y2, z2) {
  a.set(x1, y1, z1);
  b.set(x2, y2, z2);
  const d = a.distanceTo(b);
  const g = new THREE.BufferGeometry().fromGeometry(new THREE.CylinderGeometry(r, r, d, 36, 1, true));
  g.applyMatrix(rot);
  m.identity().lookAt(a, b, up);
  g.applyMatrix(m);
  c.copy(b).sub(a).multiplyScalar(.5).add(a);
  m.identity().makeTranslation(c.x, c.y, c.z);
  g.applyMatrix(m);
  currentGeometries.push(g);
}