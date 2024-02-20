function buildSide(dx, dz, a) {
  const sideGeometry = new THREE.PlaneBufferGeometry(1, HEIGHT, SIDES, 1);
  const sideMesh = new THREE.Mesh(sideGeometry, baseMaterial);
  const transMatrix = new THREE.Matrix4();
  transMatrix.makeTranslation(dx, 0, dz);
  const rotMatrix = new THREE.Matrix4();
  rotMatrix.makeRotationY(a);
  sideGeometry.applyMatrix(rotMatrix);
  sideGeometry.applyMatrix(transMatrix);
  group.add(sideMesh);
  return sideGeometry.attributes.position;
}