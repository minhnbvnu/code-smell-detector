function createDominoPiece(numberTop, numberBottom) {

  const piece = new THREE.Group();
  const mesh = new THREE.Mesh(geo, material);
  mesh.castShadow = mesh.receiveShadow = true;
  piece.add(mesh);
  const lineMesh = new THREE.Mesh(lineGeo, metalMaterial);
  lineMesh.castShadow = lineMesh.receiveShadow = true;
  lineMesh.position.set(0,.09,0);
  piece.add(lineMesh);
  addPegs(numberTop, piece, true);
  addPegs(numberBottom, piece, false);

  return piece;

}